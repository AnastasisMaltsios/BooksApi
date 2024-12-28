import React from "react";
import "../styles/Dashboard.css"
import Footer from "./Footer";
import { Link } from "react-router-dom";
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

function Dashboard() {
    return(
        <div>
            <div className="navbar">
            <h1><ImportContactsIcon fontSize="large"/>  Book Store</h1>
            <ul className="nav-list">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </div>
        <div className="dash-container">
        <h1 className="dash-title">Welcome to Book Store - <span>Your Gateway to the World of Books!</span></h1>
        <hr />
        <p>Immerse yourself in a treasure trove of stories, knowledge, and adventure.</p>
        <p>Whether you're here to explore new titles, rediscover timeless classics, or keep track of your reading journey, Book Store is designed with book lovers like you in mind.</p>
        <p>Login, and let's turn the page to your next great read!</p>
        </div>
            <Footer />
        </div>        
    );
}

export default Dashboard;