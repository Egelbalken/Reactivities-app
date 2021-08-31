import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

// Interface to store all activitys
interface Store {
    activityStore: ActivityStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

// Interface to store all user info
export const store: Store = {
    activityStore: new ActivityStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
}


// Function to setup a db context to connext for
// centrulizing the data so we can implement it to our component
// insted of passing in throw the component structure.
export const StoreContext = createContext(store);


export const useStore =() => {
    return useContext(StoreContext);
}