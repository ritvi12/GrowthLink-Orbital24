import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuthValue } from './AuthContext';
import { arrayRemove, arrayUnion, onSnapshot, updateDoc, doc, collection, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from "../firebase";

export const EventContext = createContext();

export function useEventsContext() {
    const value = useContext(EventContext);
    return value;
}

export function EventsProvider({ children }) {
    const { isLoggedIn, user, setUser, setLoggedIn } = useAuthValue();
    const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);

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
                setBookmarkedEvents(events);
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

    // Add addEvent function
    function addEvent(event) {
        setEvents(prevEvents => [...prevEvents, event]);
    }

    return (
        <EventContext.Provider value={{
            bookmarkEvent,
            bookmarkedEvents,
            addPost,
            deletePost,
            posts,
            addEvent, // Add addEvent to the context value
            events
        }}>
            {children}
        </EventContext.Provider>
    );
}
