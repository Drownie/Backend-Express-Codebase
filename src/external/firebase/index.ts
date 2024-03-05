import admin from 'firebase-admin';

import { setting } from '../../config';

export class FirebaseService {
    private static _FirebaseService: _FirebaseService;

    static getService() {
        if (this._FirebaseService == null) {
            this._FirebaseService = new _FirebaseService();
        }

        return this._FirebaseService;
    }
}

class _FirebaseService {
    private client: admin.app.App;

    constructor() {
        this.client = this.initializeFirebaseAdmin();
    }

    initializeFirebaseAdmin() {
        try {
            let client = this.client;
            if (client == null) {
                const firebaseAdmin = admin.initializeApp({
                    credential: admin.credential.cert({
                        clientEmail: setting.firebaseClientEmail,
                        privateKey: setting.firebasePrivateKey,
                        projectId: setting.firebaseProjectId
                    })
                })

                client = firebaseAdmin;
            }

            return client;
        } catch(err) {
            throw err;
        }
    }

    async signUpWithEmail(email: string, password: string) {
        try {
            let client = await this.initializeFirebaseAdmin();

            let payload = {
                email,
                password,
                disabled: false
            }

            return client.auth().createUser(payload);
        } catch(err) {
            throw err;
        }
    }

    async requestCustomToken(externalId: string) {
        try {
            let client = await this.initializeFirebaseAdmin();
            return await client.auth().createCustomToken(externalId);
        } catch(err) {
            throw err;
        }
    }

    async validateIdToken(idToken: string) {
        try {
            let client = await this.initializeFirebaseAdmin();
            return await client.auth().verifyIdToken(idToken);
        } catch(err) {
            throw err;
        }
    }
}