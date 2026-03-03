import { createClient } from '@insforge/sdk';

let clientInstance: any = null;

export const useInsforge = () => {
    const config = useRuntimeConfig();

    if (import.meta.server) {
        return createClient({
            baseUrl: config.public.insforgeUrl,
            anonKey: config.public.insforgeAnonKey
        });
    }

    if (!clientInstance) {
        clientInstance = createClient({
            baseUrl: config.public.insforgeUrl,
            anonKey: config.public.insforgeAnonKey
        });
    }

    return clientInstance;
};

/**
 * Returns the environment-appropriate table name.
 * If running in development mode, prefixes the table name with 'dev_'.
 */
export const getTableName = (baseName: string) => {
    // process.dev is a Nuxt-specific boolean for development mode
    return process.dev ? `dev_${baseName}` : baseName;
};
