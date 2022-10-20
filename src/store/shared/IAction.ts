export default interface IAction<T = any, P = any> {
    type: T;
    payload: P;
}
