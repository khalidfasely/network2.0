import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import { getPosts } from '../actions/getPosts';
import { Post } from '../types/post';
import { createPost } from '../actions/createPost';
import { Link } from 'react-router-dom';
import PostForm from '../components/PostForm';

const Home: React.FC = () => {

    const [ posts, setPosts ] = useState<Post[]>([]);
    const [ next, setNext ] = useState<string | null>(null);

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

    return (
        <div className='w-[80%] sm:w-[75%] md:w-[65%] m-auto mt-4'>
            {
                email ?
                <div className='border'>
                    <PostForm setPosts={setPosts} />
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
                                        <img src={'http://127.0.0.1:8000' + post.images[0].image} height='200px' width='200px' alt='picture with post' /> :
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