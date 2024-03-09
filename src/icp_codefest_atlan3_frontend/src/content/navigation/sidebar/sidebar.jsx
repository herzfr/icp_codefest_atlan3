import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss'

const SideBar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">TEST</Link>
                </li>
                <li>
                    <Link to="/create-certificate">TEST2</Link>
                </li>
            </ul>
        </nav>
    );
}

export default SideBar;