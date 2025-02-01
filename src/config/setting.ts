import { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true, encoding: 'utf8' });

export const setting = {
    // Database Config
    databaseUsername: process.env.DB_USERNAME,
    databasePassword: process.env.DB_PASSWORD,
    databaseName: process.env.DB_NAME,
    databaseHost: process.env.DB_HOST,
    databasePort: process.env.DB_PORT || '3434',

    // App
    app_port: process.env.APP_PORT,
    app_env: process.env.NODE_ENV,

    firebaseType: process.env.FIREBASE_TYPE,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebasePrivateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
    firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    firebaseClientId: process.env.FIREBASE_CLIENT_ID,
    firebaseAuthUri: process.env.FIREBASE_AUTH_URI,
    firebaseTokenUri: process.env.FIREBASE_TOKEN_URI,
    firebaseAuthProviderCert: process.env.FIREBASE_CLIENT_CERT_URL,
    firebaseClientCertUrl: process.env.FIREBASE_CLIENT_CERT_URL,
    firebaseUniverseDomain: process.env.FIREBASE_DOMAIN,
    brevoAPIKey: process.env.BREVO_API_KEY
}

export const corsOptions: CorsOptions = {
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "origin" : ["*"], // TODO : add web url later
    "allowedHeaders": ['Content-Type', 'Authorization']
}