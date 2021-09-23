import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity,ActivityFormValues } from "../models/activity";
import { Profile } from "../models/Profile";
import { store } from "./store";

// Mobx helps us store alla our ac
export default class ActivityStore {
   
    //Propertys in class
    activityRegistry = new Map<String, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    // Sort the activitys by date, compute date.
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
        .sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy');
                activities[date] = activities[date] ? [...activities[date], activity] 
                : [activity]
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
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
    // Can only be executed if we have a user.
    private setActivity = (activity: Activity) => {
        //We populate the interface props whit host and attendee at activity
        const user = store.userStore.user;
        // we have a user and we list them if going list.
        if(user){
            activity.isGoing = activity.attendees!.some(
                a => a.username === user.username
                )
            // we set the users if host.
            activity.isHost = activity.hostUsername === user.username;
            activity.host = activity.attendees?.find(x => x.username === activity.hostUsername);
        }
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }

    // Helper to us to get a registrated activity from memory..
    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }
    

    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try{
            await agent.Activities.create(activity)
            const newActivity =  new Activity(activity);
            newActivity.hostUsername = user?.username;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            })

        }catch (error){
            console.log(error)
        }
    }

    updateActivity = async (activity: ActivityFormValues) => {
        try{
            await agent.Activities.update(activity)
            runInAction(() => {
                if(activity.id){
                    let updatedActivity = {...this.getActivity(activity.id), ...activity}
                    this.activityRegistry.set(activity.id, updatedActivity as Activity)
                    this.selectedActivity = updatedActivity as Activity;
                }
            })

        }catch(error){
            console.log(error)
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

    // User updating there attendece
    UpdateAttendeence = async () => {
        const user = store.userStore.user;

        this.loading = true;
        try{
            await agent.Activities.attend(this.selectedActivity!.id);

            runInAction(() => {
                if(this.selectedActivity?.isGoing) {
                        this.selectedActivity.attendees = this.selectedActivity.attendees
                            ?.filter(a => a.username !== user?.username)
                        this.selectedActivity.isGoing = false;
                }else {
                    const attendee = new Profile(user!);
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
            })
        }catch(error){
            console.log(error);
        }finally{
            runInAction(() => this.loading = false)
        }
    }

    // Cancel attendence in a activity.
    cancelActivityToggle = async () => {
        this.loading = true;
        try{
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity?.isCancelled;
                this.activityRegistry.set(this.selectedActivity!.id, this.selectedActivity!)
            })
        }catch(error){
            console.log(error)
        }finally{
            runInAction(() => this.loading = false)
        }
    }

    // Clear the selected activity to kill a error for open Hub error
    clearSelectedActivity = () => {
        this.selectedActivity = undefined;
    }
}
