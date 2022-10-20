import settings from "../../data/settings";

export default class AccessTokenStorageManager {
    static set(data: string) {
        localStorage.setItem(settings.access_token_name, data);
    }

    static get(): string | null {
        return localStorage.getItem(settings.access_token_name);
    }

    static clean() {
        localStorage.removeItem(settings.access_token_name);
    }
}
