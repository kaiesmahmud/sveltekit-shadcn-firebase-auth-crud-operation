import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Writable, writable } from "svelte/store";
import { auth } from "../firebase/firebase";


export const authStore = writable({
    user: null ,
    loading: null ,
    data:{},
})

export const authHandler = {
    signup: async (email,pass) =>{
        await createUserWithEmailAndPassword(auth, email, pass)
    },
    login : async (email,pass) => {
        await signInWithEmailAndPassword(auth, email,pass)
    },
    logout: async ()=> {
        await signOut(auth) 
    }
}