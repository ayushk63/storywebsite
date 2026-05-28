import React from "react";
import { Routes, Route } from 'react-router';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import StoryWrite from "./StoryWrite";
import StoryView from "./StoryView";

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Home />} />
      <Route path = '/register' element = {<Register />} />
      <Route path = '/login' element = {<Login />} />
      <Route path = '/profile' element = {<Profile />} />
      <Route path = '/writestory' element = {<StoryWrite />} />
      <Route path = '/viewstory' element = {<StoryView />} />
    </Routes>
  );
}

export default App;