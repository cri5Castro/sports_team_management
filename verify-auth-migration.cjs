const { createClient } = require('@insforge/sdk');
require('dotenv').config();

async function verifyAuthMigration() {
    const url = process.env.NUXT_PUBLIC_INSFORGE_URL || 'https://t3tzpuc3.us-west.insforge.app';
    const anonKey = process.env.NUXT_PUBLIC_INSFORGE_ANON_KEY;

    if (!anonKey) {
        console.error('Missing NUXT_PUBLIC_INSFORGE_ANON_KEY');
        return;
    }

    const insforge = createClient({ baseUrl: url, anonKey });

    console.log('--- Verifying Members Table ---');
    const { data: members, error: membersError } = await insforge.database
        .from('dev_members')
        .select('*');

    if (membersError) {
        console.error('Error fetching dev_members:', membersError);
    } else {
        console.log(`Found ${members.length} members:`);
        members.forEach(m => {
            console.log(`- ${m.name} (${m.email}) [Admin: ${m.is_admin}]`);
        });
    }

    console.log('\n--- Verifying Admin Checks ---');
    const testEmails = [
        'admin1@example.com', // Admin (mapped to Cris)
        'admin2@example.com', // Admin (mapped to Yash)
        'non-admin@example.com'     // Not in DB
    ];

    for (const email of testEmails) {
        const { data, error } = await insforge.database
            .from('dev_members')
            .select('is_admin')
            .eq('email', email)
            .maybeSingle();

        if (error) {
            console.error(`Error checking ${email}:`, error);
        } else {
            const isAdmin = data?.is_admin === true;
            console.log(`${email}: ${isAdmin ? 'AUTHORIZED' : 'DENIED'}`);
        }
    }
}

verifyAuthMigration();
