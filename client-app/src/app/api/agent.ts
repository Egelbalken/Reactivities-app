// Here we are centrelize the api connections via axios.
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity, ActivityFormValues } from "../models/activity";
import { PaginatedResult } from "../models/pagination";
import { Photo, Profile, UserActivity } from "../models/Profile";
import { User, UserFormValues } from "../models/user";
import { store } from "../stores/store";

/*

            NOTE!! THIS TS.script is for the API requests and responses
            from the API BACKEND. Axios is used to manage the connection.

*/

// We want to have a realistic feel to the app and slow it down.
const sleep = (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

// Hardcoded way to the api backend
axios.defaults.baseURL = process.env.REACT_APP_API_URL

// We sending upp a allredy loaded token from localstroage.
// If we update the site the user will otherwise get lost.
// To prevent this we fetch the stored token and then reuse it if we have that user.
// This code ensure that we send a token whit every single requst to the store.
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

// Axios interseptors, delay on api respond.
axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination));
        return response as AxiosResponse<PaginatedResult<any>>
    }
    return response;
}, (error: AxiosError) => {
    const { data, status, config, headers } = error.response!;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error(data);
            }
            break;
        case 401:
            if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
                store.userStore.logout();
                toast.error('Session expired - please login again');
            }
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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
    list: (params: URLSearchParams) => axios.get<PaginatedResult<Activity[]>>('/activities', { params })
    .then(responseBody),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
}

// Object whit current user and login and register.
const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

// Object to get the users profile
const Profiles = {
    get: (username:string) => requests.get<Profile>(`/profiles/${username}`),
    // method for upploading the file profile image photo
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos',formData, {
            headers: {'Content-type': 'multipart/form-data'}
        })
    },
    // Object that sets the main photo of choise
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    // Deletes the photo
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    // Update the profile bio and username
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profiles`, profile),
    // Update the following
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    // List the followings in to profile Followings
    listFollowings: (username:string, predicate: string) => 
        requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    // List all activities inside the events in profiles
    listActivities: (username: string, predicate: string) =>
        requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)


}

// Create and export the object whit the list of activitys.
const agent = {
    Activities,
    Account,
    Profiles,
}


export default agent;
