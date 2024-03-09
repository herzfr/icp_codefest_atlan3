import React from "react";
import { useAuthClient } from "../../services/auth-client.context";
import Navbar from "../navigation/navbar/navbar";

function MainWeb() {
    const { login } = useAuthClient();

    return (
        <main>
            <Navbar />
            <div className="container">
                <div className="bg-gray-200 p-4">
                    <h1 className="text-2xl font-bold text-gray-800">Hello, Tailwind CSS with SCSS!</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                        Button
                    </button>
                </div>
            </div>
        </main>
    );
}

export default MainWeb;