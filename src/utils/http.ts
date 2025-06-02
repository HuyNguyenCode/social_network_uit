import axios, {AxiosInstance} from 'axios';

class Http {
    post(arg0: string, body: FormData) {
        throw new Error("Method not implemented.");
    }
    instance: AxiosInstance;
    constructor() {
        this.instance = axios.create({
            baseURL: "https://api.cloudinary.com/",
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

const http = new Http();

export default http;
