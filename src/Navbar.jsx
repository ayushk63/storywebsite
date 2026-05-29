import React from 'react';
import { Link } from 'react-router';

function Navbar() {
    return (
        <div className = 'Navbar'>
            <div id = 'navHeading'>STORYFLIX</div>
            <ul>
                <Link to = '/writestory' className='navLink'>
                    <li>WRITE</li>
                </Link>
                <Link to = '/viewstory' className='navLink'>
                    <li>READ</li>
                </Link>
                <Link to = '/profile' className='navLink'>
                    <li>PROFILE</li>
                </Link>
            </ul>
        </div>
    );
}

export default Navbar;