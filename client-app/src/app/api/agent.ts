// Here we are centrelize the api connections via axios.
import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

// We want to have a realistic feel to the app and slow it down.
const sleep = (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

// Hardcoded way to the api backend
axios.defaults.baseURL = "http://localhost:5000/api";

// Axios interseptors, delay on api respond.
axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error.message);
        return await Promise.reject(error);
    }
})

// We create a responsebody to take in the data from api response
// Sign the typ. Specify the type of response by addin a <T> and the allso add it
// to the AxiosResponse.
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

// we sepecify all the CRUD operations we are going to use.
// We add some type safty.
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

// store our activitys
// This is going to be the base url + this place..
const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
}

// Create and export the object whit the list of activitys.

const agent = {
    Activities
}

export default agent;