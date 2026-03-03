import { createClient } from '@insforge/sdk';

const getClient = () => {
    const config = useRuntimeConfig();
    return createClient({
        baseUrl: config.public.insforgeUrl,
        anonKey: config.public.insforgeAnonKey
    });
};

const getTableName = (baseName: string) => {
    const isDev = process.env.NODE_ENV === 'development' || process.dev;
    return isDev ? `dev_${baseName}` : baseName;
};

export const getAbsences = async () => {
    const client = getClient();
    const { data, error } = await client.database
        .from(getTableName('absences'))
        .select('*')
        .order('date', { ascending: true });

    if (error) {
        console.error('Error fetching absences:', error);
        return [];
    }

    return data.map((a: any) => ({
        id: a.id,
        name: a.name,
        date: a.date,
        timeSlot: a.time_slot,
        location: a.location,
        reason: a.reason,
        sport: a.sport,
        createdAt: a.created_at
    }));
};

export const addAbsence = async (body: any) => {
    const client = getClient();
    const { data, error } = await client.database
        .from(getTableName('absences'))
        .insert({
            name: body.name,
            date: body.date,
            time_slot: body.timeSlot,
            location: body.location,
            reason: body.reason,
            sport: body.sport
        })
        .select()
        .single();

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error saving absence to database: ' + error.message,
        });
    }

    return {
        id: data.id,
        name: data.name,
        date: data.date,
        timeSlot: data.time_slot,
        location: data.location,
        reason: data.reason,
        sport: data.sport,
        createdAt: data.created_at
    };
};

export const deleteAbsence = async (id: string) => {
    const client = getClient();
    const { error } = await client.database
        .from(getTableName('absences'))
        .delete()
        .eq('id', id);

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error deleting absence: ' + error.message,
        });
    }

    return { success: true };
};

export const overwriteAbsences = async (items: any[]) => {
    const client = getClient();

    // Deleting all requires a filter. Since ids are UUIDs, we can filter for anything not null.
    const { error: deleteError } = await client.database
        .from(getTableName('absences'))
        .delete()
        .neq('name', '___NON_EXISTENT_NAME___');

    if (deleteError) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error clearing absences for overwrite: ' + deleteError.message,
        });
    }

    if (items.length === 0) return { success: true, count: 0 };

    const formattedItems = items.map(a => ({
        name: a.name,
        date: a.date,
        time_slot: a.timeSlot,
        location: a.location,
        reason: a.reason,
        sport: a.sport
    }));

    const { data, error: insertError } = await client.database
        .from(getTableName('absences'))
        .insert(formattedItems)
        .select();

    if (insertError) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error inserting bulk absences: ' + insertError.message,
        });
    }

    return { success: true, count: data.length };
};

export const getNames = async () => {
    const client = getClient();
    const { data, error } = await client.database
        .from(getTableName('members'))
        .select('name')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching names:', error);
        return ['Castro Maya Cristopher', 'Hernandez Pilar Yasmine'];
    }

    return data.map((m: any) => m.name);
};

export const isAdmin = async (email: string) => {
    if (!email) return false;
    const client = getClient();
    const { data, error } = await client.database
        .from(getTableName('members'))
        .select('is_admin')
        .eq('email', email.toLowerCase())
        .maybeSingle();

    if (error) {
        console.error('Error checking admin status:', error);
        return false;
    }

    return data?.is_admin === true;
};

export const getDiscounts = async () => {
    const client = getClient();
    const { data, error } = await client.database
        .from(getTableName('discounts'))
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching discounts:', error);
        return [];
    }

    return data.map((d: any) => ({
        id: d.id,
        title: d.title,
        businessName: d.business_name,
        location: d.location,
        description: d.description,
        image: d.image_url,
        startDate: d.start_date,
        endDate: d.end_date,
        isIndefinite: d.is_indefinite
    }));
};
