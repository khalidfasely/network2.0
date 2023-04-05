import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { getPosts } from '../actions/getPosts';
import { Post } from '../types/post';
import { createPost } from '../actions/createPost';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {

    const [ posts, setPosts ] = useState<Post[]>([]);
    const [ next, setNext ] = useState<string | null>(null);

    //form state
    const [ text, setText ] = useState<string>('');
    const [ images, setImages ] = useState<any>();

    const [ formError, setFormError ] = useState<string>('');
    const [ error, setError ] = useState<string>('');

    const { email } = useSelector((state: any) => state.auth);

    useEffect(() => {
        getPosts()
        .then((res: any) => {
            if (res[1]) {
                setError(res[1].response ? res[1].response?.data?.message : res[1].message);
                return
            }

            setPosts(res[0].results);
            setNext(res[0].next);
        })
    }, [])

    const handleLoadMore = () => {
        getPosts(next)
        .then((res: any) => {
            if (res[1]) {
                setError(res[1].response ? res[1].response?.data?.message : res[1].message);
                return
            }

            setPosts((prev: Post[]) => [...prev, ...res[0].results]);
            setNext(res[0].next);
        })
    }

    const handleNewPost = (e: any) => {
        e.preventDefault();

        if (text === "") {
            setFormError('Make sure to fill text input!')
            return
        }

        const formData = new FormData();

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
        formData.append('text', text);

        createPost(formData)
        .then((res: any) => {
            if (res[1]) {
                setFormError(res[1].response ? res[1].response?.data?.message : res[1].message);
                return
            }

            setPosts((prev: Post[]) => [res[0], ...prev])

            setText('');
            setImages(null);

            setFormError('');
        })
    }

    return (
        <div className='w-[80%] sm:w-[75%] md:w-[65%] m-auto mt-4'>
            {
                email ?
                <div className='border'>
                    <form onSubmit={handleNewPost} className='flex flex-col m-1'>
                        {formError ? <p className='text-center italic text-red-700 font-bold'>{formError}</p> : null}
                        <textarea
                            className='border resize-none h-16 px-3 py-1 focus:outline-slate-500'
                            placeholder='Share your thoughts!'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <div className='flex flex-col my-1'>
                            <label htmlFor='images' className='block text-sm font-medium text-gray-900 dark:text-white'>Add Images: </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                type='file'
                                id='images'
                                name='images'
                                onChange={(e: any) => setImages(e.target.files)}
                                multiple accept="image/png, image/jpeg"
                            />
                            <p className="text-sm text-gray-500 dark:text-gray-300">PNG or JPG</p>
                        </div>
                        <button
                            className='my-1 mx-1 md:mx-2 bg-slate-500 ease duration-200 hover:bg-slate-600 text-[#eee] rounded py-2'
                        >Add Post</button>
                    </form>
                </div> :
                null
            }
            
            {/*Posts*/}
            <div className='mt-5'>
                {error ? <p className='text-center italic text-red-700 font-bold'>{error}</p> : null}
                {
                    posts.map((post: Post) => (
                        <div key={post.id} className='border my-1 rounded py-1 px-1.5'>
                            <Link to={`/post/${post.id}`}>
                                <h3 className='font-bold text-gray-700'>{post.user.username}</h3>
                                <div className='flex flex-col sm:flex-row justify-center items-center gap-3'>
                                    {
                                        post.images.length > 0 ?
                                        <img src={'http://127.0.0.1:8000' + post.images[0].image} height='200px' width='200px' /> :
                                        null
                                    }
                                    {
                                        post.images.length <= 1 ?
                                        null :
                                        <div className='bg-gray-100 w-[200px] h-[200px] flex justify-center items-center'>+{post.images.length - 1} others</div>
                                    }
                                </div>
                                <p className='my-3'>{post.content}</p>
                                <div className='flex gap-3 mt-2'>
                                    <span className='text-gray-400'>{new Date(post.date).toLocaleString('en-US')}</span>
                                    <p>{post.comments.length} {post.comments.length <= 1 ? 'comment' : 'comments'}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            
            {/*Pagination */}
            <div className='mb-5 flex justify-center mt-4'>
                {
                    next ?
                    <button
                        onClick={handleLoadMore}
                        className='rounded text-[#eee] bg-blue-500 ease duration-150 hover:bg-blue-600 py-1 px-2'
                    >Load more</button> :
                    null
                }
            </div>
        </div>
    )
}

export default Home;