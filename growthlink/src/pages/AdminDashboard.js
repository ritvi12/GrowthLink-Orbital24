import React, { useState } from 'react';
import { useAuthValue } from '../assets/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { user } = useAuthValue();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddPost = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'posts'), {
                title,
                content,
                author: user.name,
                createdAt: new Date()
            });
            setTitle('');
            setContent('');
            alert('Post added successfully!');
        } catch (error) {
            console.error('Error adding post: ', error);
            alert('Error adding post. Please try again.');
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <form className="post-form" onSubmit={handleAddPost}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Add Post</button>
            </form>
        </div>
    );
};

export default AdminDashboard;
