import React from "react";
import { Link } from "react-router";
import './App.css';
import storywriting from './Images/storywriting.jpg';

function Home() {
    return (
        <div className="Home">
            <section id = 'hero'>
                <div id = 'left'>
                    <img src = {storywriting} id = 'storyWritingImage' />
                </div>
                <div id = 'right'>
                    <div id = 'para'>
                        A Platform where you can showcase your creativity by writing 
                        interesting short stories of various genres and also 
                        pass your time reading other writers' stories
                    </div>
                </div>
            </section>
            <div id = 'buttonDiv'>
                <Link to = '/register'>
                    <button id = 'registerButton'>REGISTER</button>
                </Link>
                <Link to = '/login'>
                    <button id = 'loginButton'>LOGIN</button>
                </Link>
            </div>
        </div>
    )
}

export default Home;