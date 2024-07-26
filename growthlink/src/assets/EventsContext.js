import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuthValue } from './AuthContext'; 
import { arrayRemove, arrayUnion, onSnapshot, updateDoc, doc, addDoc, collection, deleteDoc } from 'firebase/firestore';
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
    const [posts, setPosts] = useState([]);

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

    return (
        <EventContext.Provider value={{
            addToDashBoard,
            dashboard,
            removeFromDashBoard,
            bookmarkEvent,
            bookmarkedEvents,
            addPost,
            deletePost,
            posts
        }}>
            {children}
        </EventContext.Provider>
    );
}
