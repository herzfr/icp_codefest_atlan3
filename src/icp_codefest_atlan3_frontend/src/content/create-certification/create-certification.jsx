import { useState } from "react";
import useAuth from "../../services/auth-client.context";



function CreateCertification() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const { whoamiActor } = useAuth();


    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const createCertificate = async () => {
        // Do something with the input value
        console.log('Input value:', inputValue);
        if (loading) return; // Cancel if waiting for a new count
        try {
            setLoading(true);
            let data = await whoamiActor.createCourse(inputValue); // Increment the count by 1
            console.log('data ', data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-white">Create Certification</h2>
            <input id="certificateName" type="text" onChange={handleChange} />
            <button className="bg-white text-black" type="button" onClick={createCertificate}>Submit</button>
        </div>
    );
}

export default CreateCertification;