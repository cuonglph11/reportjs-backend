import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://demo-api.ilotusland.asia',
    headers: {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDE5MGI3ZWZjMzgzMDAwMWJmMTAxNWUiLCJmaXJzdE5hbWUiOiJNaW5oIiwibGFzdE5hbWUiOiLEkOG7lyIsImlzQWRtaW4iOnRydWUsImlzQWN0aXZlIjpmYWxzZSwiaXNPd25lciI6dHJ1ZSwib3JnYW5pemF0aW9uIjp7Il9pZCI6IjVlZWY4MDExOWQ0ZjQ1MDAxMWMzMGQ1OSIsIm5hbWUiOiJpTG90dXNMYW5kIFZpZXQgTmFtIEpTQy4ifSwiaWF0IjoxNjkzMzAwMDA0fQ.mfTmrw4Cro1RxPxt2APciLVQdJxwYViMQfTlFaN4Y28'
    }
});

export async function getFetch<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axiosInstance.get(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function postFetch<T, U>(url: string, data: T, config?: AxiosRequestConfig): Promise<U> {
    try {
        // console.log({ url, data })
        const response: AxiosResponse<U> = await axiosInstance.post(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function putFetch<T, U>(url: string, data: T, config?: AxiosRequestConfig): Promise<U> {
    try {
        const response: AxiosResponse<U> = await axiosInstance.put(url, data, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function delFetch<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
        const response: AxiosResponse<T> = await axiosInstance.delete(url, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}