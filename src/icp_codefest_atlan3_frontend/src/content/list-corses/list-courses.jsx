import { useEffect, useState } from 'react';
import useAuth from '../../services/auth-client.context';
import './list-courses.scss';
import { Link } from 'react-router-dom';

function ListCourses() {
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

    // Function to generate a random gradient color
    const getRandomGradientColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Return the JSX wrapped in parentheses
    return (
        <div className="list-course-container">
            <div className='flex justify-between'>
                <h1>Data List Courses</h1>
                <Link to='/create-course'>
                    <button className='text-white py-1 px-4 rounded-md bg-green-600'>Create Course</button>
                </Link>
            </div>
      {loading && <p className='text-white text-center'>Loading...</p>}
      {!loading && course.length === 0 && <p className='text-white text-center'>No courses available.</p>}
      {!loading && course.length > 0 && (
        <ul className="course-list">
          {course.map((courses) => (
                        <li key={courses.courseId} className="course-item" style={{ background: `linear-gradient(45deg, ${getRandomGradientColor()}, ${getRandomGradientColor()})` }}>
                        <Link to='/list-certificate'>
              <div className="course-details flex-col">
                <h3 className='font-bold pb-1'>{courses.name}</h3>
                <p className='font-nomal text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
      );
}

export default ListCourses;
