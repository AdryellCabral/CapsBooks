declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET_JWT: string;
            EXPIRES_IN_JWT: string;
        }
    }
}
export {};