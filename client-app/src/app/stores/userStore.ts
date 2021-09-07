import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

// This class will store the login info from client. 
export default class UserStore {
    user: User | null = null;

    // We observe all changes.
    constructor(){
        makeAutoObservable(this)
    }

    // Check if we are loged in
    get isLoggedIn() {
        return !!this.user;
    }

    // Login the user
    login = async (creds: UserFormValues) => {
        try{
            const user = await agent.Account.login(creds);
            console.log(user)
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        }catch(error){
            throw error;
        }
    }

    // Logout the user
    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        history.push('/');
    }

    // Check if token is the same as a stored user.
    getUser = async () => {
        try{
            const user= await agent.Account.current();
            runInAction(() => this.user = user);
        }catch(error){
            console.log(error);
        }
    }

    // Register new users from modal login.
    register = async (creds: UserFormValues) =>{
        try{
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        }catch(error){
            throw error;
        }
    }
}