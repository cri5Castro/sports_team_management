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
