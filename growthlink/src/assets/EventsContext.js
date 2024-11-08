import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuthValue } from './AuthContext';
import { arrayRemove, arrayUnion, onSnapshot, updateDoc, doc, collection, deleteDoc, addDoc, getDoc } from 'firebase/firestore';
import { db } from "../firebase";

export const EventContext = createContext();

export function useEventsContext() {
    return useContext(EventContext);
}

export function EventsProvider({ children }) {
    const { isLoggedIn, user, setUser, setLoggedIn } = useAuthValue();
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const [posts, setPosts] = useState([]);
    const [calendarEvents, setCalendarEvents] = useState([]);

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
                const events = doc.data().bookmarkedEvents || [];
                const calendar = doc.data().calendar || [];
                setBookmarkedEvents(events);
                setCalendarEvents(calendar);

            });

            const postsQuery = collection(db, 'Events');
            const unsubPosts = onSnapshot(postsQuery, (snapshot) => {
                const postsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setPosts(postsList);
            });

            return () => {
                unsub();
                unsubPosts();
            };
        }
    }, [user, isLoggedIn]);

    async function bookmarkEvent(event) {
        if (!isLoggedIn) {
            toast.error("Please Log In to bookmark event!");
            return;
        }

        const index = bookmarkedEvents.findIndex((item) => item.name === event.name);
        const userRef = doc(db, "GrowthLinkUsers", user.id);

        if (index !== -1) {
            await updateDoc(userRef, {
                bookmarkedEvents: arrayRemove(event)
            });
            setBookmarkedEvents(prevEvents => prevEvents.filter(item => item.name !== event.name));
            toast.success("Bookmark removed");
        } else {
            await updateDoc(userRef, {
                bookmarkedEvents: arrayUnion(event)
            });
  setBookmarkedEvents(prevEvents => {
                
                const newEvents = [...prevEvents];
                const duplicateIndex = newEvents.findIndex(item => item.name === event.name);
                if (duplicateIndex === -1) {
                    newEvents.push(event);
                }
                return newEvents;
            });
            toast.success("Event bookmarked");
        }
    }

    async function addPost(newPost) {
        try {
            const docRef = await addDoc(collection(db, 'Events'), newPost);
            setPosts([...posts, { id: docRef.id, ...newPost }]);
            toast.success('Post added successfully!');
        } catch (error) {
            console.error('Error adding post: ', error);
            toast.error('Error adding post. Please try again.');
        }
    }

    async function deletePost(postId) {
        try {
            await deleteDoc(doc(db, 'Events', postId));
            setPosts(posts.filter(post => post.id !== postId));
            toast.success('Post deleted successfully!');
        } catch (error) {
            console.error('Error deleting post: ', error);
            toast.error('Error deleting post. Please try again.');
        }
    }

    async function addEventsToCalendar(event) {
        if (!isLoggedIn) {
            toast.error("Please Log In to add events to calendar!");
            return;
        }

        const userRef = doc(db, "GrowthLinkUsers", user.id);
        try {
            await updateDoc(userRef, {
                calendar: arrayUnion(event)
            });
            const docSnapshot = await getDoc(userRef);
            const updatedCalendarEvents = docSnapshot.data().calendar || [];
            setCalendarEvents(updatedCalendarEvents);
            toast.success("Event added to calendar successfully!");
        } catch (error) {
            console.error('Error adding event to calendar: ', error);
            toast.error('Error adding event to calendar. Please try again.');
        }
    }

    async function removeEventsFromCalendar(event) {
        if (!isLoggedIn) {
            toast.error("Please Log In to remove events from calendar!");
            return;
        }

        const userRef = doc(db, "GrowthLinkUsers", user.id);
        try {
            await updateDoc(userRef, {
                calendar: arrayRemove(event)
            });
            const docSnapshot = await getDoc(userRef);
            const updatedCalendarEvents = docSnapshot.data().calendar || [];
            setCalendarEvents(updatedCalendarEvents);
            toast.success("Event removed from calendar successfully!");
        } catch (error) {
            console.error('Error removing event from calendar: ', error);
            toast.error('Error removing event from calendar. Please try again.');
        }
    }

    return (
        <EventContext.Provider value={{
            bookmarkEvent,
            bookmarkedEvents,
            addPost,
            deletePost,
            posts,
            addEventsToCalendar,
            removeEventsFromCalendar,
            calendarEvents
        }}>
            {children}
        </EventContext.Provider>
    );
}
