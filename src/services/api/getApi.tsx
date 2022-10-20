import axios from "axios";
import settings from "../../data/settings";
import getAccessToken from "../localstorage/getAccessToken";

const getApi = () => {
    const state = axios.create({
        baseURL: settings.api_url,
        timeout: settings.api_timeout,
        headers: {
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
            return value;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    return state;
};

export default getApi;
