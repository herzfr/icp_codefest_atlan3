import React, { useState } from 'react';
import useAuth from '../../services/auth-client.context';
import AlertComponent from '../components/alert/alert';
import './verification-certificate.scss';


const VerificationPage = () => {
  const [serialNumber, setSerialNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showAlert, setShowAlert] = useState('');

  const { whoamiActor } = useAuth();

//   const handleAlertClose = () => {
//     setShowAlert(false);
//   };

  const verifyCertificate = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const result = await whoamiActor.checkCertificate(serialNumber);
      setVerificationResult(result);
      if(result == 'Verified') {
        setShowAlert('Verified');
      } else {
        setShowAlert('NotVerified');
      }
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <div className="relative isolate px-6 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="verification-page">
      <h2>Certificate Verification</h2>
      <div className="form-group">
        <label htmlFor="serialNumber">Serial Number:</label>
        <input
          type="text"
          id="serialNumber"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />
      </div>
      <button className="verify-button" onClick={verifyCertificate}>
        Verify Certificate
      </button>
      </div>
      {/* Render custom alert component */}
      {showAlert && (
            showAlert === 'Verified' ? (
              <h1 className='font-bold text-green-500 text-xl text-center'>Certificate is valid</h1>
            ) : (
              <h1 className='font-bold text-red-500 text-xl text-center'>Certificate is not valid</h1>
            )
          )}
    </div>
    </div>
    </div>
  );
};

export default VerificationPage;