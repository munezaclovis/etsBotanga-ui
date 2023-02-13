import axios, { AxiosError } from "axios";
import settings from "../../data/settings";
import getAccessToken from "../localstorage/getAccessToken";
import { IProductUpdate } from "../../models/products/IProduct";
import { useMutation, useQuery } from "react-query";
import { useErrorHandler } from "react-error-boundary";
import IError from "../../models/IError";

const getApi = () => {
    const state = axios.create({
        baseURL: settings.api_url,
        timeout: settings.api_timeout,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        },
    });
    state.interceptors.request.use(
        (value) => {
            const { token } = getAccessToken();
            value.headers = {
                ...value.headers,
                Authorization: `Bearer ${token}`,
            };
            if (value.baseURL?.substring(-1) !== "/") {
                value.baseURL = `${value.baseURL}/`;
            }
            return value;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return state;
};

const useApi = () => {
    const api = getApi();
    return api;
};

export function useProductQuery<T>(id: string, url: string = id) {
    const api = useApi();
    const key = id === `` ? ["products"] : ["products", ...id.split("/")];
    return useQuery<T>(key, async () => {
        try {
            const { data } = await api.get(`products/${url}`);
            return data;
        } catch (error) {
            useErrorHandler(error);
        }
    });
}

export function useProductMutation<T = IProductUpdate, E = T>(id: string) {
    const api = useApi();
    const key = id === `` ? ["products"] : ["products", ...id.split("/")];
    const mutation = useMutation<T, IError<E>, T>(key, async (input) => {
        try {
            const { data } = await api.put(`products/${id}`, input);
            return data;
        } catch (error) {
            const e = error as AxiosError;
            throw e.response?.data;
        }
    });
    return mutation;
}

export default useApi;
