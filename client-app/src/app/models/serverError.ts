// We exports a interface for the Error hanlding.

export interface ServerError {
    statusCode: number;
    message: string;
    details: string;
}