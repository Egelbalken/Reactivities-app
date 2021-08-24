// We exports a interface for the Error hanlding.

export interface serverError {
    statusCode: number;
    message: string;
    details: string;
}