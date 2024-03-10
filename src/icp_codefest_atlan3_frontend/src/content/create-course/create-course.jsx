import { useState } from "react";
import useAuth from "../../services/auth-client.context";
import './create-course.scss'

function CreateCourse() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const { whoamiActor } = useAuth();


    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const createCourseSertification  = async () => {
        // Do something with the input value
        console.log('Input value:', inputValue);
        if (loading) return; // Cancel if waiting for a new count
        try {
            setLoading(true);
            let data = await whoamiActor.createCourse(inputValue); // Increment the count by 1
            console.log('data ', data);

            let dataListCourse = await whoamiActor.getCourse();
            console.log('data ', dataListCourse);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* <h2 className="text-white">Create Course</h2>
            <input id="certificateName" type="text" onChange={handleChange} />
            <button className="bg-white text-black" type="button" onClick={createCourseSertification}>Submit</button> */}
        
            <div className="course-form-container">
      <h2>Create New Course</h2>
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
        </div>
    );
}

export default CreateCourse;