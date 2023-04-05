import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/auth';

const NavBar: React.FC = () => {

    const { email } = useSelector((state: any) => state.auth);

    const dispatch = useDispatch();

    return (
        <nav className='bg-slate-100'>
            <div className='mx-4 sm:mx-10 lg:mx-24 flex justify-between md:py-6 py-4'>
                <div>
                    <Link to='/' className='font-bold text-lg text-gray-700'>Network</Link>
                </div>
                <div>
                    <ul className='flex items-center'>
                        {
                            email ?
                            <>
                                <li className='mx-1 sm:mx-2 md:mx-3 ease duration-100 hover:text-gray-500'>
                                    <Link to='/'>Hi, <span className='font-bold text-gray-500 hover:text-gray-400'>{email}</span></Link>
                                </li>
                                <li className='mx-1 sm:mx-2 md:mx-3'>
                                    <button
                                        className='bg-red-500 ease duration-100 hover:bg-red-600 text-[#eee] font-bold rounded py-1 px-2'
                                        onClick={() => dispatch(logout())}
                                    >Logout</button>
                                </li>
                            </> :
                            <>
                                <li className='mx-1 sm:mx-2 md:mx-3 ease duration-100 hover:text-gray-500'>
                                    <Link to='/login'>Login</Link>
                                </li>
                                <li className='mx-1 sm:mx-2 md:mx-3 ease duration-100 hover:text-gray-500'>
                                    <Link to='/register'>Register</Link>
                                </li>
                            </>
                        }
                    </ul>
                    {/**<div className='mx-1'>
                        <Link to='/'>Home</Link>
                    </div>
                    <div className='mx-1'>
                        <Link to='/login'>Login</Link>
                    </div>
                    <div className='mx-1'>
                        <Link to='/something'>Notfound</Link>
                    </div> */}
                </div>
            </div>
        </nav>
    )
}

export default NavBar