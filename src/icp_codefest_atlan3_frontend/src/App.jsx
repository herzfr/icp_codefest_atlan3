import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateLicence from './content/create-licences/create-licences';
import NotFound from './content/not-found/not-found';
import CreateCertification from './content/create-certification/create-certification';
import Navigation from './content/navigation/navigation';

function App() {
  return (
    <main>
      <Router>
        <div>
          <Navigation />
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

export default App;
