import { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import * as process from "process";
dotenv.config();

export const setting = {
    host: process.env.HOST,
    port: process.env.PORT || '3434',
    connectionString: process.env.CONNECTION_STRING,
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