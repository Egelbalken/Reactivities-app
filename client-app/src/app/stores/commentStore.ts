import { ChatComment } from "../models/comment";
import { HubConnection, HubConnectionBuilder, LogLevel } from "../../../node_modules/@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore {
    commnets: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor(){
        makeAutoObservable(this)
    }

    createHubConnection = (activityId: string) => {
        if(store.activityStore.selectedActivity){
            // Connection with url to chat activiyId event
            this.hubConnection = new HubConnectionBuilder()
                .withUrl(process.env.REACT_APP_CHAT_URL + '?activityId=' + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            
            this.hubConnection.start().catch(error => console.log("Error establishing the chat connection: ", error));
            
            // Load the comments in activity
            this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                runInAction(() => {
                    comments.forEach(comments =>{
                        comments.createdAt = new Date(comments.createdAt + 'Z');
                    })
                    this.commnets = comments;
                });
            })

            // Receive comments in signalR
            this.hubConnection.on('ReceiveComment', (comment : ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    // push to the place in the start of the array
                    this.commnets.unshift(comment);
                });
            })
        }
    }

    // Method to stop signalR hub connection
    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    // Method to clear all message and stop signalR hub connection
    clearComments = () => {
        this.commnets = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        try{
            await this.hubConnection?.invoke("SendComment", values);
        }catch(error){
            console.log(error)
        }
    }
}