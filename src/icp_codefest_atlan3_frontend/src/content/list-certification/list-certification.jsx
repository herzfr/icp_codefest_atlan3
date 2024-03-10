import { useEffect, useState } from 'react';
import useAuth from '../../services/auth-client.context';

function ListCertification() {
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState(null);

    const { whoamiActor } = useAuth();
    console.log('whoamiActor ', whoamiActor);

    // Get the current counter value
    const fetchCourse = async () => {
        try {
            setLoading(true);
            const course = await whoamiActor.getAllCourse();
            console.log('course ', course);
            setCourse(course); // Convert BigInt to number
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


    return <h2 className="text-white">List Certification</h2>;
}

export default ListCertification;