import { CustomError } from "./custom-error";

export class InvalidEnvironmentVariablesError extends CustomError{
    statusCode: number = 500;
    constructor(message: string) {
        super(message);
    }
}