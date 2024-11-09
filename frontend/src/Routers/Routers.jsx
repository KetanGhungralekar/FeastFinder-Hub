import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./tabs/home";
import Profile from "./tabs/profile";
import Characters from "./tabs/characters";
import Lessons from "./tabs/lessons";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/" element={<Home />} /> {/* Default route */}
        </Routes>
    );
};

export default AppRoutes;
