import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/Profile";
import { store } from "./store";

export default class ProfileStor{
    profile: Profile | null = null;
    loadingProfile = false;
    uploadingPhoto = false;
    loadingSetMainOrDel = false;
    updatingDisplayName = false;
    loadingFollow = false;
    loadingFollowings = false;
    followings: Profile[] = [];
    activeTab = 0;

    constructor(){
        makeAutoObservable(this);

        // helps to decide whitch tab was click on.. following or follower
        reaction(() => this.activeTab,
        activeTab => {
            if(activeTab === 3 || activeTab === 4){
                const predicate = activeTab === 3 ? 'followers' : 'following';
                this.loadFollowings(predicate);
            }else{
                this.followings = [];
            }
        })
    }

    // Metod to set the tab we choose in profile
    setActiveTab = async (activeTab: any) => {
        this.activeTab= activeTab;
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

    // Method for changeing/updating the users DisplayName.
    updateProfile = async (profile: Partial<Profile>) => {
        this.updatingDisplayName = true;
        try{
            await agent.Profiles.updateProfile(profile)
            runInAction(() => {
                if(profile.displayName && profile.displayName 
                    !== store.userStore.user?.displayName){
                        store.userStore.setDisplayName(profile.displayName);
                }
                //Bio
                
                this.profile = {...this.profile, ...profile as Profile};
                this.updatingDisplayName = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() => this.updatingDisplayName = false);
        }
    }

    // Method to update the followers, true or false for button.
    // Setting the wollowing status, increment or decrement the follower and wollowing attribute.
    updateFollowing = async (username: string, following: boolean) => { 
        this.loadingFollow = true;
        try{
            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if(this.profile && this.profile.username !== store.userStore.user?.username && this.profile.username === username){
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;

                }
                if(this.profile && this.profile.username === store.userStore.user?.username){
                   following ? this.profile.followingCount++ : this.profile.followingCount--;
                }
                this.followings.forEach(profile => {
                    if(profile.username === username){
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.loadingFollow = false;
            })
        }catch(error){
            runInAction(() => this.loadingFollow = false);
            console.log(error)
        }
    }

    // Method to load the list of followings..
    loadFollowings = async (predicate: string) => {
        this.loadingFollowings = true;
        try{
        const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowings = false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>this.loadingFollowings = false);
        }
    }
}