import React, { useState } from 'react';
import './navbar.scss'
import { useAuthClient } from '../../../services/auth-client.context';

function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const { login } = useAuthClient();

    const toggleMenu = () => {
        setIsActive(!isActive);
    };



    return (
        <nav className="navbar">
            <div className="logo">Atlantiga</div>
            <ul className={isActive ? 'nav-links active' : 'nav-links'}>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Contact</a></li>
                <li>
                    <button className="btn-login" onClick={login}>
                        <img src="/favicon.ico" alt="DFINITY logo" />Log In
                    </button>
                </li>
            </ul>
            <div className="burger" onClick={toggleMenu}>
                <div className={isActive ? 'line1 active' : 'line1'}></div>
                <div className={isActive ? 'line2 active' : 'line2'}></div>
                <div className={isActive ? 'line3 active' : 'line3'}></div>
            </div>
        </nav>
    );
}

export default Navbar

