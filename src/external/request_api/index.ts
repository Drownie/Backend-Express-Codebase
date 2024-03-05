import axios from "axios";

export class RequestApiService {
    private static _RequestApiService: _RequestApiService;

    static getService() {
        if (this._RequestApiService == null) {
            this._RequestApiService = new _RequestApiService();
        }

        return this._RequestApiService;
    }
}

class _RequestApiService {
    async get(url: string, headers: any = {}, params: any = {}) {
        try {
            return await axios.get(url, {
                headers: headers,
                params: params
            });
        } catch (err) {
            throw err;
        }
    }

    async post(url: string, headers: any = {}, body: any = {}) {
        try {
            return await axios.post(url, body, {
                headers: headers
            });
        } catch (err) {
            throw err;
        }
    }

    async patch(url: string, headers: any = {}, body: any = {}) {
        try {
            return await axios.patch(url, body, {
                headers: headers
            });
        } catch (err) {
            throw err;
        }
    }

    async delete(url: string, headers: any = {}, body: any = {}) {
        try {
            return await axios.delete(url, {
                headers: headers,
                data: body
            });
        } catch (err) {
            throw err;
        }
    }

    async put(url: string, headers: any = {}, body: any = {}) {
        try {
            return await axios.put(url, body, {
                headers: headers
            });
        } catch (err) {
            throw err;
        }
    }
}