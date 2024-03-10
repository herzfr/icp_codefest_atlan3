import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "../navigation/sidebar/sidebar";
import CreateLicence from '../create-licences/create-licences';
import CreateCertification from '../create-certification/create-certification';
import NotFound from '../not-found/not-found';
import ListCertification from '../list-certification/list-certification';
import CreateCourse from '../create-course/create-course';

function MainApp() {
    return (
        <main className='w-full'>
            <Router>
                <div className="flex flex-row min-h-screen w-full">
                    <SideBar />
                    <main className='flex w-full m-4'>
                        <Routes>
                            <Route path="/" element={<CreateLicence />} />
                            <Route path="/create-certificate" element={<CreateCertification />} />
                            <Route path="/create-course" element={<CreateCourse />} />
                            <Route path="/list-certificate" element={<ListCertification />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </main>
    )
}

export default MainApp;