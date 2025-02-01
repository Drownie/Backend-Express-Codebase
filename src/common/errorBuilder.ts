export class ErrorBuilder extends Error {
    public statusCode: number;
    public message: string;
    public detail?: string;

    constructor(message: string, statusCode: number = 400, detail?: string) {
        super()

        this.message = message;
        this.statusCode = statusCode;
        this.detail = detail;
    }
}