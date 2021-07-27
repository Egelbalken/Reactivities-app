import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

// Mobx helps us store alla our ac
export default class ActivityStore {
   
    //Propertys in class
    activityRegistry = new Map<String, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    // Sort the activitys by date, compute date.
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
        .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    // Method but in MobX we call it a action.
    // in runInAction 
    loadActivities = async () => {
        this.setLoadingInitial(true)
        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach(activity => {
                   this.setActivity(activity)
                  })
                  
            })
            this.setLoadingInitial(false)
        }catch(error){
            console.log(error)
            runInAction(() =>{
                this.setLoadingInitial(false)
            })
        }
    }

    // When we load a activity
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity){
            this.selectedActivity = activity;
            return activity;
        } else {
            this.loadingInitial = true;
            this.loadingInitial = false;
            try{
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
                this.setLoadingInitial(false)
                return activity;
            }catch(error){
                console.log(error)
                this.setLoadingInitial(false)
            }
        }
    }

    // Helper to set and update the activity stored in memory.
    private setActivity = (activity: Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }

    // Helper to us to get a registrated activity from memory..
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
    

    createActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.create(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        }catch (error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try{
            await agent.Activities.update(activity)
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id:string) => {
        this.loading = true;
        try{
            await agent.Activities.delete(id);
            runInAction(() =>{
                this.activityRegistry.delete(id);
                this.loading = false;
            })

        }catch(error){
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
}
