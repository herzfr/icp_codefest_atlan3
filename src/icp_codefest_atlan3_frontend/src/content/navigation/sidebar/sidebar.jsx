import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.scss'
import useAuth from '../../../services/auth-client.context';

const SideBar = () => {
    const { logout } = useAuth()
    return (
        <div className="flex flex-col w-64 text-gray-700 bg-white flex-shrink-0">
            <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
                <img className="h-16 w-full" src="/logo-digicert-black.svg" alt="digicert" />
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