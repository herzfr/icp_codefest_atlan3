import { useState } from "react";
import './create-licences.scss'
import useAuth from "../../services/auth-client.context";

function CreateLicence() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { whoamiActor } = useAuth();
    console.log('whoamiActor ', whoamiActor);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const submitCourse = async () => {
        setLoading(true);
        try {
            setLoading(true);
            const response = await whoamiActor.createCourse(inputValue);
            console.log('course ', response);
            inputValue('');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Lakukan validasi di sini
        if (inputValue.trim() === '') {
            setError('Field cannot be empty');
        } else {
            await submitCourse()
        }
    };

    return (
        <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z" clipRule="evenodd" />
                    <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                    <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                </svg>

                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Create the course you want to deliver</h5>
                </a>
            </div>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">This field will display your certification category. Fill it with a name that you deem appropriate, as it will be used as a label in the certification being created.</p>
            <form className="grid grid-cols-1 gap-2 justify-start m-0 w-full" onSubmit={handleSubmit}>
                <div className="grid m-0">
                    <label className="font-bold" htmlFor="">Course Name</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        className="input-course"
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <button type="submit" className="btn-submit">
                    Submit
                </button>
            </form>
        </div>

    );
}

export default CreateLicence;