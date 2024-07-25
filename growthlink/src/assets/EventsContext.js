import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthValue } from './AuthContext'; 
import { arrayRemove, arrayUnion, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { db } from "../firebase";

export const EventContext = createContext();

export function useEventsContext() {
    const value = useContext(EventContext);
    return value;
}

export function EventsProvider({ children }) {
    const { isLoggedIn, user, setUser, setLoggedIn } = useAuthValue();
    const [dashboard, setMyDashboard] = useState([]);
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);

    useEffect(() => {
        const token = window.localStorage.getItem("token");
        if (token) {
            const index = window.localStorage.getItem("index");
            const user = JSON.parse(index);
            setLoggedIn(token);
            setUser(user);
        }
    }, [setLoggedIn, setUser]);

    useEffect(() => {
        if (isLoggedIn) {
            const unsub = onSnapshot(doc(db, "GrowthLinkUsers", user.id), (doc) => {
                setMyDashboard(doc.data().dashboard);
                setBookmarkedEvents(doc.data().bookmarkedEvents || []);
            });

            return () => unsub();
        }
    }, [user, isLoggedIn]);

    async function addToDashBoard(event) {
        if (!isLoggedIn) {
            toast.error("Please Log In to add to dashboard!");
            return;
        }

        const index = dashboard.findIndex((item) => item.name === event.name);
        if (index !== -1) {
            return;
        }

        const userRef = doc(db, "GrowthLinkUsers", user.id);
        await updateDoc(userRef, {
            dashboard: arrayUnion({ ...event })
        });
        toast.success("Added to Dashboard");
    }

    async function removeFromDashBoard(event) {
        const userRef = doc(db, "GrowthLinkUsers", user.id);
        await updateDoc(userRef, {
            dashboard: arrayRemove({ ...event })
        });
    }

    async function bookmarkEvent(event) {
        if (!isLoggedIn) {
            toast.error("Please Log In to bookmark event!");
            return;
        }

        const isInDashboard = dashboard.findIndex((item) => item.name === event.name) !== -1;
        if (isInDashboard) {
            toast.error("Event is already in your dashboard!");
            return;
        }

        const index = bookmarkedEvents.findIndex((item) => item.name === event.name);
        if (index !== -1) {
            await removeBookmark(event);
            return;
        }

        const userRef = doc(db, "GrowthLinkUsers", user.id);
        await updateDoc(userRef, {
            bookmarkedEvents: arrayUnion({ ...event })
        });
        toast.success("Event bookmarked");
    }

    async function removeBookmark(event) {
        const userRef = doc(db, "GrowthLinkUsers", user.id);
        await updateDoc(userRef, {
            bookmarkedEvents: arrayRemove({ ...event })
        });
        toast.success("Bookmark removed");
    }

    return (
        <EventContext.Provider value={{ addToDashBoard, dashboard, removeFromDashBoard, bookmarkEvent, bookmarkedEvents }}>
            {children}
        </EventContext.Provider>
    );
}
