export default interface IError<T> {
    message: string;
    errors: {
        [K in keyof T]: string[];
    };
}
