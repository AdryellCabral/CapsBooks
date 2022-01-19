declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET_JWT: string;
            EXPIRESIN_JWT: string;
        }
    }
}
export {};