import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const authContext = React.createContext();

export function useAuthValue() {
    return useContext(authContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        console.log("Checking stored user and token");
        const storedUser = JSON.parse(window.localStorage.getItem("index"));
        const storedToken = window.localStorage.getItem("token");

        console.log("Stored User:", storedUser);
        console.log("Stored Token:", storedToken);

        if (storedUser && storedToken) {
            setLoggedIn(true);
            setUser(storedUser);
        } else {
            setLoggedIn(false);
            setUser(null);
        }

        // Listen for changes in the Firestore user collection
        const unsub = onSnapshot(
            collection(db, "GrowthLinkUsers"),
            (snapshot) => {
                const users = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUserList(users);
                console.log("Updated User List:", users);
            }
        );

        return () => unsub();
    }, []);

    async function createUser(data) {
        const index = userList.findIndex((user) => user.email === data.email);
        if (index !== -1) {
            toast.error("User already exists! Sign In!");
            return;
        }
        await addDoc(collection(db, "GrowthLinkUsers"), {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role || 'user', // Default to 'user' if no role is specified
            dashboard: [],
            bookmarks: []
        });
        toast.success("Signed Up Successfully! Log In Now!");
    }

    async function signIn(data) {
        console.log("Sign In Attempt:", data);
        const index = userList.findIndex((user) => user.email === data.email);
        if (index === -1) {
            toast.error("User does not exist! Sign Up!");
            return false;
        }
        const foundUser = userList[index];
        console.log("Found User:", foundUser);
        if (foundUser.password === data.password) {
            if (foundUser.role && foundUser.role !== data.role) {
                toast.error(`Please log in as ${foundUser.role}!`);
                return false;
            }
            toast.success("Signed In Successfully!");
            setLoggedIn(true);
            setUser(foundUser);
            window.localStorage.setItem("token", true);
            window.localStorage.setItem("index", JSON.stringify(foundUser));
            return true;
        } else {
            toast.error("Incorrect Password!");
            return false;
        }
    }

    async function signOut() {
        console.log("Signing out...");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");
        setLoggedIn(false);
        setUser(null);
        toast.success("Logged Out!");
    }

    return (
        <authContext.Provider value={{ createUser, signIn, signOut, isLoggedIn, setLoggedIn, setUser, user }}>
            <ToastContainer />
            {children}
        </authContext.Provider>
    );
}
