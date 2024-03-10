import { useEffect, useState } from 'react';
import useAuth from '../../services/auth-client.context';
import './list-certification.scss';
import { Link } from 'react-router-dom';

function ListCertification() {
    const [loading, setLoading] = useState(false);
    const [certificate, setCertificate] = useState([]);
    const [course, setDetailCourse] = useState(null);

    const { whoamiActor } = useAuth();
    console.log('whoamiActor ', whoamiActor);

    // Get the current counter value
    const fetchCertificate = async () => {
        try {
            setLoading(true);
            
            let dataListCertificate = await whoamiActor.getCertificates();
            setCertificate(dataListCertificate);
            
            // let detailCourse = await whoamiActor.getCourseById(dataListCertificate[0].courseId);
            // setDetailCourse(detailCourse);
            console.log('data ', dataListCertificate);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch the count on page load
    useEffect(() => {
        fetchCertificate();
    }, []);

    // Return the JSX wrapped in parentheses
    return (
        <div className="list-course-container">
            <div className='flex justify-between'>
                <h1>Data List Certificate</h1>
                <Link to='/create-certificate'>
                    <button className='text-white py-1 px-4 rounded-md bg-green-600'>Create Certificate</button>
                </Link>
            </div>
      {loading && <p className='text-white text-center'>Loading...</p>}
      {!loading && certificate.length === 0 && <p className='text-white text-center'>No courses available.</p>}
      {!loading && certificate.length > 0 && (
        <ul className="course-list">
          {certificate.map((certificates) => (
            <li key={certificates.courseId} className="course-item">
              <div className="course-details flex flex-col space-y-2">
                <h3>{certificates.name}</h3>
                <div className='flex flex-col'>
                    <p className='font-bold'>Serial Number:</p>
                    <p>{certificates.serialNumber}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
      );
}

export default ListCertification;
