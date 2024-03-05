export class ResponseBuilder {
    static okResponse(message: any, data: any = {}, detail: any = {}) {
        return {
            is_success: true,
            message: message,
            detail: detail,
            data: data
        };
    }

    static errorBuilder(message: any) {
        return {
            is_success: false,
            message: message,
            detail: null,
            data: null
        };
    }
}