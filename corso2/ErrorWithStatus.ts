class ErrorWithStatus extends Error {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ErrorWithStatus;