import React, { useEffect, useState, useContext } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const authContext = React.createContext();

export function useAuthValue() {
    
    const value = useContext(authContext);
    return value;
}

export function AuthContext({children}) {
    const [isLoggedIn, setLoggedIn] = useState(false)
    
    const [user, setUser] = useState(null) // [userLoggedIn, setUserLoggedIn]

    const [userList, setUserList] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "GrowthLinkUsers"),
            (snapshot) => {
                const users = snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                });
                setUserList(users);
        });
        return () => unsub;

    }, [isLoggedIn])

    async function createUser(data) {
        const index = userList.findIndex((user) => user.email === data.email);

        if (index !== -1) {
            toast.error("User already exists! Sign In!")
            return;
        } 
       const docRef = await addDoc(collection(db, "GrowthLinkUsers"),{
            name: data.name,
            email: data.email,
            password: data.password,
            dashboard: [],
            bookmarks: []
       });
       toast.success("Signed Up Successfully! Log In Now!");
    }

    async function signIn(data) {
        const index  = userList.findIndex((user) => user.email === data.email);

        if (index === -1) {
            toast.error("User does not exist! Sign Up!")
            return
        }
        if(userList[index].password === data.password) {
            toast.success("Signed In Successfully!");
            setLoggedIn(true);
            setUser(userList[index]);

            window.localStorage.setItem("token", true) 
            window.localStorage.setItem("index", JSON.stringify(userList[index]))
            
            return true;

        } else {
            toast.error("Incorrecct Password!")
            return false;
        }
    }

    async function signOut() {

        window.localStorage.removeItem("token") 
        window.localStorage.removeItem("index")

        setLoggedIn(false)
        setUser(null)
        toast.success("Logged Out!")
    }

    return (
        <>
        <authContext.Provider value={{createUser, signIn, signOut, isLoggedIn, setLoggedIn, setUser, user}}>
            <ToastContainer/>
            {children}
        </authContext.Provider>
        </>
    )
}