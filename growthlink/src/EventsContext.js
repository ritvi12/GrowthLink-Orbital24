import {createContext, useContext, useEffect, useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthValue } from './AuthContext';
import { arrayRemove, arrayUnion, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from "./firebase";

export const EventContext = createContext();

export function useEventsContext() {
    const value = useContext(EventContext)
    return value;
}


export function EventsContext({children}) {
    
    const {isLoggedIn, user, setUser, setLoggedIn} = useAuthValue();
    const[dashboard, setMyDashboard] = useState([]);
    const[bookmarkedEvents, setBookmarkedEvents] = useState([]);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            const index = window.localStorage.getItem("index");
            const user = JSON.parse(index);
            setLoggedIn(token)
            setUser(user)
        }
    },[])

    useEffect(() => {
        if (isLoggedIn) {
            const unsub = onSnapshot(doc(db, "GrowthLinkUsers", user.id), (doc) => {
                setMyDashboard(doc.data().dashboard);
                setBookmarkedEvents(doc.data().bookmarks);
            });

        }
    }, [user])

    async function addToDashBoard(event) {
        if (!isLoggedIn) {
            toast.error("Please Log In to add to dashboard!")
            return;
        }

        const index = dashboard.findIndex((item) => item.name === event.name);
        if (index !== -1) {
            toast.success("Event already added in the dashboard!")
            return;
        }
        const userRef = doc(db, "GrowthLinkUsers", user.id);
        await updateDoc(userRef,  {
            dashboard :  arrayUnion({...event})
        });
        toast.success("Added to Dashboard");
    }

    async function removeFromDashBoard(event) {
        const userRef = doc(db, "GrowthLinkUsers", user.id);
        await updateDoc(userRef,  {
            dashboard :  arrayRemove({...event})
        });
    }

    function getDate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date. getFullYear();
        return (`${year}-${month}-${day}`)
    }

    async function bookmarkEvent(event) {
        if (!isLoggedIn) {
            toast.error("Please log in to bookmark events!");
            return;
        }
        const index = bookmarkedEvents.findIndex((item) => item.name === event.name);
        if (index !== -1) {
            const updatedBookmarks = bookmarkedEvents.filter((item) => item.name !== event.name);
            setBookmarkedEvents(updatedBookmarks);
            updateBookmarkedEvents(updatedBookmarks);
            toast.success("Event removed from bookmarks!");
            return;
        }
        const updatedBookmarks = [...bookmarkedEvents, { ...event }];
        setBookmarkedEvents(updatedBookmarks);
        updateBookmarkedEvents(updatedBookmarks);
        toast.success("Event bookmarked!");

    }

    async function updateBookmarkedEvents(bookmark) {
        const userRef = doc(db, 'GrowthLinkUsers', user.id);
        await updateDoc(userRef, {
            bookmarks: bookmark
        });
    }

    return (
        <EventContext.Provider value={{ addToDashBoard, dashboard, removeFromDashBoard, bookmarkedEvents, bookmarkEvent}}>
            {children}
        </EventContext.Provider>
    )
}

