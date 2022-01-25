declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SECRET_JWT: string;
            EXPIRES_IN_JWT: string;
            EMAIL_HOST: string;
            EMAIL_PORT: number;
            EMAIL_AUTH_USER: string;
            EMAIL_AUTH_PASS: string;
            CHANGE_PASSWORD_VALIDATION_KEY: string;
        }
    }
}
export {};