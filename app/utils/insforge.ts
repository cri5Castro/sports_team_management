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
 * If running in development or demo mode, prefixes the table name with 'dev_'.
 */
export const getTableName = (baseName: string) => {
    try {
        const config = useRuntimeConfig();
        const isDemo = config.public.demoMode === 'true';
        const isDev = process.dev || import.meta.dev || isDemo;
        return isDev ? `dev_${baseName}` : baseName;
    } catch (e) {
        // Fallback if useRuntimeConfig is not available
        return (process.dev || import.meta.dev) ? `dev_${baseName}` : baseName;
    }
};
