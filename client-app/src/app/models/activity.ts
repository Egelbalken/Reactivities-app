// In the Interface we normaly say IActivity in c#
// but not in React for our interface.

export interface Activity {
    id: string;
    title: string;
    date: string;
    description: string;
    category: string;
    city: string;
    venue: string;
}