import React from 'react';
import { Link } from 'react-router';

function Navbar() {
    return (
        <div className = 'Navbar'>
            <div id = 'navHeading'>STORYFLIX</div>
            <ul>
                <li>Home</li>
                <li>Profile</li>
                <li>About</li>
                <li>Stories</li>
            </ul>
        </div>
    );
}

export default Navbar;