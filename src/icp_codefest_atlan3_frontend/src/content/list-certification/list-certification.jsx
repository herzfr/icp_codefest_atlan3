import { useEffect, useState } from 'react';
import useAuth from '../../services/auth-client.context';
import './list-certification.scss';

function ListCertification() {
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState([]);

    const { whoamiActor } = useAuth();
    console.log('whoamiActor ', whoamiActor);

    // Get the current counter value
    const fetchCourse = async () => {
        try {
            setLoading(true);
            
            let dataListCourse = await whoamiActor.getCourse();
            setCourse(dataListCourse);
            console.log('data ', dataListCourse);
            console.log('cocococ ', course);    
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch the count on page load
    useEffect(() => {
        fetchCourse();
    }, []);

    // Return the JSX wrapped in parentheses
    return (
        <div className="list-course-container">
      <h1>Data List Courses</h1>
      {loading && <p>Loading...</p>}
      {!loading && course.length === 0 && <p>No courses available.</p>}
      {!loading && course.length > 0 && (
        <ul className="course-list">
          {course.map((courses) => (
            <li key={courses.courseId} className="course-item">
              {/* <img
                src={course.image || defaultCourseImage}
                alt={`Course: ${courses.name}`}
                className="course-image"
              /> */}
              <div className="course-details">
                <h3>{courses.name}</h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
      );
}

export default ListCertification;
