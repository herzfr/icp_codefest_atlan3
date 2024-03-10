import React, { useState, useEffect } from "react";
import useAuth from "../../services/auth-client.context";
import './create-certification.scss';
import AlertComponent from "../components/alert/alert";

function CreateCertification() {
    const [inputNameValue, setInputNameValue] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(0);

    const [loading, setLoading] = useState(false);
    const [courses, setCourse] = useState([]);
    const [showAlert, setShowAlert] = useState(false);    

    const { whoamiActor } = useAuth();

    useEffect(() => {
        fetchCourse();
        // Show the alert when showAlert state is updated
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
            }, 2000); // Set a timeout to close the alert after 2 seconds
        }
    }, [showAlert]);

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const fetchCourse = async () => {
        try {
            setLoading(true);
            let dataListCourse = await whoamiActor.getCourse();
            setCourse(dataListCourse);
            console.log('data ', dataListCourse);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeInputName = (event) => {
        setInputNameValue(event.target.value);
    };

    const handleSelectChange = (e) => {
        const courseId = e.target.value;
        setSelectedCourse(parseInt(courseId, 10));
    };

    const createCertification = async () => {
        if (loading) return;

        try {
            setLoading(true);
            let data = await whoamiActor.createCertificate({
                name: inputNameValue,
                courseId: selectedCourse
            });
            // let data = await whoamiActor.createCourse(inputNameValue);
            console.log('response  createCertificate', data);

            if (data === "Success") {
                // Display alert on successful creation
                setShowAlert(true);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>        
            <div className="course-form-container">
                <h2 className="border-b-1 border-white pb-2">Create New Certificate</h2>
                <div className="form-group">
                    <label htmlFor="courseName">Name:</label>
                    <input
                        type="text"
                        id="courseName"
                        onChange={handleChangeInputName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="courseDropdown">Select Course:</label>
                    <select
                        id="courseDropdown"
                        value={selectedCourse}
                        onChange={handleSelectChange}
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.courseId} value={course.courseId}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="save-button" onClick={createCertification}>
                    Save
                </button>
            </div>

            {/* Render custom alert component */}
            {showAlert && (
                <AlertComponent
                    message="Certificate created successfully!"
                    onClose={handleAlertClose}
                />
            )}
        </div>
    );
}

export default CreateCertification;
