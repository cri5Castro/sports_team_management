import { createClient } from '@insforge/sdk';

export const useInsforge = () => {
    const config = useRuntimeConfig();
    return createClient({
        baseUrl: config.public.insforgeUrl,
        anonKey: config.public.insforgeAnonKey
    });
};
