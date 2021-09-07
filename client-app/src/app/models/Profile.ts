import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
}

// Class and Inteface can use same name.
// We create a attendee object here.
export class Profile implements Profile {
    constructor(user: User){
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}