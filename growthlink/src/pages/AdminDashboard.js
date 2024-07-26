import React, { useState } from 'react';
import { useAuthValue } from '../assets/AuthContext';
import { useEventsContext } from '../assets/EventsContext';
import { FaPlus, FaTrash } from 'react-icons/fa';
import './AdminDashboard.css'; 

const AdminDashboard = () => {
    const { user } = useAuthValue();
    const { addPost, deletePost, posts } = useEventsContext();
    const [eventName, setEventName] = useState('');
    const [applicationPeriod, setApplicationPeriod] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [contact, setContact] = useState('');
    const [description, setDescription] = useState('');
    const [signUpLink, setSignUpLink] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const handleAddPost = async (e) => {
        e.preventDefault();

        const newPost = {
            ApplicationPeriod: applicationPeriod,
            Contact: contact,
            Description: description,
            Name: eventName,
            Organisation: organisation,
            signUpLink: signUpLink,
            author: user.name,
            createdAt: new Date()
        };

        await addPost(newPost);
        setEventName('');
        setApplicationPeriod('');
        setOrganisation('');
        setContact('');
        setDescription('');
        setSignUpLink('');
        setModalVisible(false);
    };

    const handleDeletePost = async () => {
        if (postToDelete) {
            await deletePost(postToDelete.id);
            setConfirmModalVisible(false);
            setPostToDelete(null);
        }
    };

    const userPosts = posts.filter(post => post.author === user.name);

    return (
        <div className="admin-dashboard">
            <div className="dashboard-stats">
                <div className="stat-box">
                    <h2>{userPosts.length}</h2>
                    <p>Total Posts</p>

                </div>
            </div>
            <div className="my-posts">
                <h2>My Posts</h2>
                {userPosts.length > 0 ? (
                    <div className="posts-list">
                        {userPosts.map((post) => (
                            <div key={post.id} className="post-item">
                                <h3>{post.Name}</h3>
                                <p><strong>Application Deadline:</strong> {post.ApplicationPeriod}</p>
                                <p><strong>Organisation:</strong> {post.Organisation}</p>
                                <p><strong>Contact:</strong> {post.Contact}</p>
                                <p><strong>Description:</strong> {post.Description}</p>
                                {post.signUpLink && (
                                    <a href={post.signUpLink} target="_blank" rel="noopener noreferrer">Sign Up Here</a>
                                )}
                                <button className="delete-post-btn" onClick={() => { setPostToDelete(post); setConfirmModalVisible(true); }}>
                                    <FaTrash/> Delete Post
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
            <button className="add-post-btn" onClick={() => setModalVisible(true)}>
                <FaPlus />
            </button>
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
                        <h2>Add New Post</h2>
                        <form className="modal-form" onSubmit={handleAddPost}>
                            <div className="form-group">
                                <label htmlFor="eventName">Event Name</label>
                                <input
                                    type="text"
                                    id="eventName"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="applicationPeriod">Application Period</label>
                                <input
                                    type="date"
                                    id="applicationPeriod"
                                    value={applicationPeriod}
                                    onChange={(e) => setApplicationPeriod(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="organisation">Organisation</label>
                                <input
                                    type="text"
                                    id="organisation"
                                    value={organisation}
                                    onChange={(e) => setOrganisation(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact">Contact</label>
                                <input
                                    type="text"
                                    id="contact"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="signUpLink">Sign Up Link</label>
                                <input
                                    type="url"
                                    id="signUpLink"
                                    value={signUpLink}
                                    onChange={(e) => setSignUpLink(e.target.value)}
                                />
                            </div>
                            <button type="submit">Add Post</button>
                        </form>
                    </div>
                </div>
            )}
            {confirmModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setConfirmModalVisible(false)}>&times;</span>
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this post?</p>
                        <div className="modal-buttons">
                            <button className="delete-confirm-btn" onClick={handleDeletePost}>Yes, Delete</button>
                            <button onClick={() => setConfirmModalVisible(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
