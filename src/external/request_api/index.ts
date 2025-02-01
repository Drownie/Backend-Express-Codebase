import axios from "axios";

class RequestApiService {
    static async get(url: string, headers: any = {}, params: any = {}) {
        try {
            return await axios.get(url, {
                headers: headers,
                params: params
            });
        } catch (err) {
            throw err;
        }
    }

    static async post(url: string, headers: any = {}, body: any = {}) {
        try {
            return await axios.post(url, body, {
                headers: headers
            });
        } catch (err) {
            throw err;
        }
    }

    static async patch(url: string, headers: any = {}, body: any = {}) {
        try {
            return await axios.patch(url, body, {
                headers: headers
            });
        } catch (err) {
            throw err;
        }
    }

    static async delete(url: string, headers: any = {}, body: any = {}) {
        try {
            return await axios.delete(url, {
                headers: headers,
                data: body
            });
        } catch (err) {
            throw err;
        }
    }

    static async put(url: string, headers: any = {}, body: any = {}) {
        try {
            return await axios.put(url, body, {
                headers: headers
            });
        } catch (err) {
            throw err;
        }
    }
}