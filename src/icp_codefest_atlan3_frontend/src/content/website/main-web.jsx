import React from "react";
import Navbar from "../navigation/navbar/navbar";
import Home from "./section/home";
import VerificationPage from "../verification-certificate/verification-certificate";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function MainWeb() {
    return (
        <main >
            <Router>
                <Navbar />
                <section id="home">
                        <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/verification" element={<VerificationPage />} />
                        </Routes>
                </section>
            </Router>
        </main>
    );
}

export default MainWeb;