import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/Profile";
import { store } from "./store";

export default class ProfileStor{
    profile: Profile | null = null;
    loadingProfile = false;
    uploadingPhoto = false;
    loadingSetMainOrDel = false;

    constructor(){
        makeAutoObservable(this);
    }

    // Return a profile if we have the right one.
    get isCurrentUser(){
        if(store.userStore.user && this.profile){
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try{
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    // Uploade the photo URL to the stores and
    uploadPhoto = async (file:Blob) => {
        this.uploadingPhoto = true;
        try{
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if(this.profile){
                    this.profile.photos?.push(photo);
                    if(photo.isMain && store.userStore.user){
                        store.userStore.setImage(photo.url)
                        this.profile.image = photo.url;
                    }
                }
                this.uploadingPhoto = false;
            })
        }catch(error){
            console.log(error)
            runInAction(() => this.uploadingPhoto = false)
        }
    }

    // Method sets the Main photo..
    setMainPhoto = async (photo: Photo) => {
        this.loadingSetMainOrDel = true;
        try{
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if(this.profile && this.profile.photos){
                    // Sets the current main photo to false.
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    // Sets the new photo to Main
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loadingSetMainOrDel = false;
                }
            })
        }catch(error){
            runInAction(() => this.loadingSetMainOrDel = false)
            console.log(error);
        }
    }

    // Method to delete photo.
    deletePhoto = async (photo: Photo) =>{
        this.loadingSetMainOrDel = true;
        try{
            await agent.Profiles.deletePhoto(photo.id)
            runInAction(() => {
                if(this.profile){
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                    this.loadingSetMainOrDel = false;
                }
            })
        }catch(error){
            runInAction(() => this.loadingSetMainOrDel = false);
            console.log(error);
        }
    }
}