export default class ApiService {
    _apiBase = 'http://127.0.0.1:8000'

    getResource = async (url, params) => {
        let path_url = new URL(`${this._apiBase}${url}`)
        path_url.search = params;

        const res = await fetch(path_url);

        if (!res.ok) {
            throw new Error("Could not fetch");
        }

        const body = await res.json();
        return body;
    };
}