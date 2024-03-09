import React from "react";
import Navbar from "../navigation/navbar/navbar";
import Home from "./section/home";

function MainWeb() {
    return (
        <main >
            <Navbar />
            <section id="home"><Home /></section>
        </main>
    );
}

export default MainWeb;