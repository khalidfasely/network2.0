import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../reducers/auth';
import { registerApi } from '../actions/register';
import Loading from '../components/Loading';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmation, setConfirmation] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch();

    const history = useNavigate();

    const handleRegister: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !username || !password || !confirmation) {
            setError("Fill out all fields!")
            return
        }

        if (password !== confirmation) {
            setError("Passwords should match!")
            return
        }

        setLoading(true);

        registerApi({username, email, password, confirmation})
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
            <div className='flex flex-col justify-center items-center border drop-shadow-lg h-5/6 w-5/6 sm:w-96'>{/**w-5/6 sm:w-2/3 md:w-2/3 lg:w-1/3 */}
                <div className='flex gap-3 items-center mt-1 mb-8'>
                    <p>Register</p>
                </div>
                <form onSubmit={handleRegister} className="flex flex-col">
                    {error ? <p className='flex justify-center items-center bg-red-100 my-2 h-8 italic text-red-400 text-sm'>{error}</p> : null}
                    <label htmlFor='username' className="text-xs ml-1">Username <span className='text-red-400 text-lg'>*</span></label>
                    <input
                        className='border my-2 py-1 px-3 sm:w-80 w-44 outline outline-0 focus:outline-1 outline-green-500'
                        type="text"
                        placeholder='Username'
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor='email' className="text-xs ml-1">Email <span className='text-red-400 text-lg'>*</span></label>
                    <input
                        className='border my-2 py-1 px-3 sm:w-80 w-44 outline outline-0 focus:outline-1 outline-green-500'
                        type="email"
                        placeholder='Email'
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor='password' className="text-xs ml-1">Password <span className='text-red-400 text-lg'>*</span></label>
                    <div className='flex items-center'>
                        <input
                            className='border border-r-0 my-2 py-1 px-3 sm:w-80 w-44 outline outline-0 focus:outline-1 outline-green-500'
                            type="password"
                            placeholder='Password'
                            name="password"
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <label htmlFor='confirmation' className="text-xs ml-1">Confirmation <span className='text-red-400 text-lg'>*</span></label>
                    <div className='flex items-center'>
                        <input
                            className='border border-r-0 my-2 py-1 px-3 sm:w-80 w-44 outline outline-0 focus:outline-1 outline-green-500'
                            type="password"
                            placeholder='Password(Again)'
                            name="confirmation"
                            id='confirmation'
                            value={confirmation}
                            onChange={(e) => setConfirmation(e.target.value)}
                        />
                    </div>
                    <button
                        type='submit'
                        className="my-2 ml-auto py-1 px-2 w-20 bg-green-400 hover:bg-green-500 text-[#eee]"
                    >Register</button>
                </form>
                <div className='text-sm mt-6'>
                    You already have an account? <Link to='/login' className='underline text-green-400'>Sign In here</Link>.
                </div>
            </div>
        </div>
    )
}

export default Register;