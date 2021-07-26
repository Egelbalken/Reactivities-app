import { createContext, useContext } from "react"
import ActivityStore from "./activityStore"

// Interface to store all activitys
interface Store {
    activityStore: ActivityStore
}

export const store: Store = {
    activityStore: new ActivityStore()
}


// Function to setup a db context to connext for
// centrulizing the data so we can implement it to our component
// insted of passing in throw the component structure.
export const StoreContext = createContext(store);


export const useStore =() => {
    return useContext(StoreContext);
}