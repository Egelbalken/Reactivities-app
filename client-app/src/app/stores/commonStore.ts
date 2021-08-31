import { makeAutoObservable, reaction } from 'mobx';
import { ServerError } from '../models/serverError';

// Collects some common info. 
export default class CommonStore {
    error: ServerError | null = null;
    // Get the Token from the localStoreage, prevent to losing the user
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;

    constructor(){

        // Observs changes to the stor
        makeAutoObservable(this);

        // MobX reaction checks if we have a token in our webstorage.
        // if not we remove it.
        reaction(
            ()=> this.token,
            token => {
                if(token) {
                    window.localStorage.setItem('jwt', token)
                }else{
                    window.localStorage.removeItem('jwt')
                }
            }
        )
    }

    // We sets the error.
    setServerError = (error: ServerError) => {
        this.error = error;
    }

    // We sats the token
    setToken = (token: string | null) => {
            this.token = token;
        
    }

    // Is the app loaded, true.
    setAppLoaded = () => {
        this.appLoaded = true;
    }
}