import { create } from "zustand";


// in most cases we wll be using get but for now we will use set as in (set, get)
// we can do object, array, number and even function
// export const useAuthStore = create((set) => ({
//     authUser: {name: "john", _id: 123, age: 25},
//     isLoading: false,

//     // you can also use the set to set the value to something else if needed like
//     login: () => {
//         console.log("we just logged in");

//         set({isLoading: true})
//     },
// }));

// now to use , you will say - const { authUser, isLoading, login } = useAuthStore() above the component where you want to use it. like
// console.log("auth user:", authUser) console.log("loading:", isLoading) but ensure you import the file when needed. to use the set we can say onClick{set({isLoading: true})}

export const useAuthStore = create((set) => ({
    authUser: {name: "john", _id: 123, age: 25},
    isLoading: false,

    // you can also use the set to set the value to something else if needed like
    login: () => {
        console.log("we just logged in");

        set({isLoading: true})
    },
}));