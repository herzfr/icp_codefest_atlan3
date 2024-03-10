import { useState, useEffect } from "react";
import useAuth from "../../services/auth-client.context";
import './create-course.scss'
import AlertComponent from "../components/alert/alert";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const { whoamiActor } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Show the alert when showAlert state is updated
        if (showAlert) {
            setTimeout(() => {
                setShowAlert(false);
                navigate("/");
            }, 2000); // Set a timeout to close the alert after 2 seconds
        }
    }, [showAlert]);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const createCourseSertification  = async () => {
        if (loading) return; // Cancel if waiting for a new count
        try {
            setLoading(true);
            let data = await whoamiActor.createCourse(inputValue);

            console.log('data ', data);

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
                <h2 className="border-b-2 border-white pb-2">Create New Course</h2>
                <div className="form-group">
                    <label htmlFor="courseName">Course Name:</label>
                    <input
                        type="text"
                        id="courseName"
                        onChange={handleChange}
                    />
                </div>
                <button className="save-button" onClick={createCourseSertification}>
                    Save
                </button>
            </div>

            {/* Render custom alert component */}
            {showAlert && (
                <AlertComponent
                    message="Course created successfully!"
                    onClose={handleAlertClose}
                />
            )}
        </div>
    );
}

export default CreateCourse;
