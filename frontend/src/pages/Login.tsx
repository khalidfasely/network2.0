import React, { useState } from 'react';
import { login } from '../reducers/auth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../actions/login';
import Loading from '../components/Loading';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch();

    const history = useNavigate();

    const handleLogIn: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();

        
        setError("");
        
        if (!email || !password) {
            setError("Fill out all fields!")
            return
        }
        
        setLoading(true);
        
        loginApi({email, password})
        .then((res: any) => {
            setLoading(false);
            if (res.name === "AxiosError") {
                setError(res.response && res.response.data.detail ? res.response.data.detail : res.message);
                return
            }

            dispatch(login(res));

            history('/');
        });
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className='flex flex-col justify-center items-center border h-2/3 w-5/6 sm:w-96'>
                    <Loading />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className='flex flex-col justify-center items-center border drop-shadow-lg h-2/3 w-5/6 sm:w-96'>{/**w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/3 */}
                <div className='flex gap-3 items-center mt-1 mb-8'>
                    <p>Log In</p>
                </div>
                <form onSubmit={handleLogIn} className="flex flex-col">
                    {error ? <p className='flex justify-center items-center bg-red-100 my-2 h-8 italic text-red-400 text-sm'>{error}</p> : null}
                    <label htmlFor='email' className="text-xs ml-1">Email <span className='text-red-400 text-lg'>*</span></label>
                    <input
                        className='border my-2 py-1 px-3 sm:w-80 w-44 outline outline-0 focus:outline-1 outline-blue-500'
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='password' className="text-xs ml-1">Password <span className='text-red-400 text-lg'>*</span></label>
                    <div className='flex items-center'>
                        <input
                            className='border border-r-0 my-2 py-1 px-3 sm:w-80 w-44 outline outline-0 focus:outline-1 outline-blue-500'
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="my-2 ml-auto py-1 px-2 w-20 bg-blue-400 hover:bg-blue-500 text-[#eee]"
                    >Log In</button>
                </form>
                <div className='text-sm mt-6'>
                    You don't have an account? <Link to='/register' className='underline text-blue-400'>Register here</Link>.
                </div>
            </div>
        </div>
    )
}

export default Login;