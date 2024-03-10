import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss'
import useAuth from '../../../services/auth-client.context';

const SideBar = () => {
    const [result, setResult] = React.useState("");
    const { whoamiActor, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [loadingCopy, setLoadingCopy] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log('click run ', whoamiActor);
                const whoami = await whoamiActor.whoami();
                // console.log('whoami =>', whoami);
                setResult(whoami);
                setLoading(false); // Set loading menjadi false setelah selesai memuat data
            } catch (error) {
                // console.error('Error fetching data:', error);
                setLoading(false); // Jika terjadi error, atur loading menjadi false juga
            }
        };

        fetchData();
    }, [whoamiActor]);


    function truncateText(text) {
        let str = text.toString()
        return `${str.substring(0, 16)}....`;
    }

    const copyToClipboard = async () => {
        setLoadingCopy(true)
        try {
            const textToCopy = result;
            await navigator.clipboard.writeText(textToCopy);
            triggerLoadingCopy()
        } catch (error) {
            triggerLoadingCopy()
        }
    }

    function triggerLoadingCopy() {
        setTimeout(() => {
            setLoadingCopy(false)
        }, 3000)
    }

    return (
        <div className="flex flex-col w-64 text-gray-700 bg-white flex-shrink-0">
            <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
                <img className="h-16 w-full" src="/logo-digicert-black.svg" alt="digicert" />
            </div>
            <div>
                <div className="flex justify-between items-center p-2 bg-gray-200">
                    {
                        loading ? (
                            <p className="text-sm font-bold">Loading...</p>
                        ) : (
                            <p className="text-sm font-bold">
                                {loadingCopy ? 'Copied' : truncateText(result)}
                            </p>
                        )
                    }
                    <button disabled={loadingCopy} type='button' onClick={copyToClipboard}>
                        {
                            !loadingCopy ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
                                </svg>

                            )
                        }
                    </button>

                </div>
            </div>
            <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
                <NavLink className='block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lghover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                    to="/" activeclassname="bg-gray-200">
                    Create Licence
                </NavLink>
                <NavLink className='block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lghover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                    to="/create-certificate" activeclassname="bg-gray-200">
                    Create Certificate
                </NavLink>
                <NavLink className='block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lghover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
                    to="/create-certificate" activeclassname="bg-gray-200">
                    Create Course
                </NavLink>
                <NavLink className="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg   hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                    to="/list-certificate" activeclassname="bg-gray-200">
                    List Certificate
                </NavLink>
                <a onClick={logout} className="flex justify-center items-center bottom-0 w-56 mb-4 absolute cursor-pointer px-4 py-2 mt-2 text-sm font-semibold text-white bg-black rounded-lg hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
                    <img className="login" src="/favicon.ico" alt="DFINITY logo" />Logout
                </a>
            </nav>
        </div>
    )
}

export default SideBar;