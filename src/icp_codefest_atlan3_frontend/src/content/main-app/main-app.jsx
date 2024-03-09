import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "../navigation/sidebar/sidebar";
import CreateLicence from '../create-licences/create-licences';
import CreateCertification from '../create-certification/create-certification';
import NotFound from '../not-found/not-found';
import useAuth from '../../services/auth-client.context';

function MainApp() {
    const [result, setResult] = React.useState("");
    const { whoamiActor, logout } = useAuth();

    return (
        <main>
            <Router>
                <div>
                    <SideBar />
                </div>
                <Routes>
                    <Route path="/" element={<CreateLicence />} />
                    <Route path="/create-certificate" element={<CreateCertification />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </main>
    )
}

export default MainApp;