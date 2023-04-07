import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Comment, Image, Post } from '../types/post';
import { getPost } from '../actions/getPost';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import { useSelector } from 'react-redux';
import { getComments } from '../actions/getComments';
import { addComment } from '../actions/addComment';
import DeleteCommentModal from '../components/DeleteCommentModal';

const defaultState: Post = {
    id: 0,
    images: [],
    comments: 2,
    content: 'w-[80%] sm:w-[75%] md:w-[65%] m-auto mt-4',
    date: '2023',
    likes: 0,
    user: {
        id: 0,
        email: 'Anonymous',
        is_superuser: false,
        username: 'Anonymous'
    }
}

const PostPage: React.FC = () => {
    const [ post, setPost ] = useState<Post>(defaultState);
    const [ error, setError ] = useState<string>('');

    const [ comments, setComments ] = useState<Comment[]>([]);
    const [ next, setNext ] = useState<string | null>(null);

    const [ newComment, setNewComment ] = useState<string>('');
    const [commentError, setCommentError] = useState<string>('');

    const [ editModalOpen, setEditModalOpen ] = useState<boolean>(false);
    const [ deleteModalOpen, setDeleteModalOpen ] = useState<boolean>(false);

    const [ editCommentModalOpen, setEditCommentModalOpen ] = useState<boolean>(false);
    const [ deleteCommentModalOpen, setDeleteCommentModalOpen ] = useState<boolean>(false);

    const [choosenImage, setChoosenImage] = useState<Image | undefined>();

    const { id } = useParams();

    const { email } = useSelector((state: any) =>  state.auth)

    useEffect(() => {
        if (id) {
            getPost(Number(id))
            .then((res: any) => {
                if (res[1]) {
                    setError(res[1].response ? res[1].response?.data?.message : res[1].message);
                    return
                }

                setPost(res[0]);
                setChoosenImage(res[0].images[0]);
            })
            .then(() => {
                getComments(Number(id))
                .then((res: any) => {
                    if (res[1]) {
                        console.log(res[1])
                        return
                    }

                    setComments(res[0].results);
                    setNext(res[0].next);
                })
            })
        }
    }, [id])

    const handleLoadMoreComments = () => {
        getComments(Number(id), next)
        .then((res: any) => {
            if (res[1]) {
                setError(res[1].response ? res[1].response?.data?.message : res[1].message);
                return
            }

            setComments((prev: Comment[]) => [...prev, ...res[0].results]);
            setNext(res[0].next);
        })
    }

    const handleAddComment = (e: any) => {
        e.preventDefault();

        if (newComment === '') {
            setCommentError('Fill out the input!');
            return
        }

        addComment({text: newComment}, Number(id))
        .then((res: any) => {
            if (res[1]) {
                setCommentError(res[1].response ? res[1].response?.data?.message : res[1].message);
                return
            }

            setComments((prev: Comment[]) => [res[0], ...prev]);
            setNewComment('');
            setCommentError('');
        })
    }

    return (
        <div className='w-[80%] sm:w-[75%] md:w-[65%] m-auto mt-4'>
            {error ? <p className='text-center italic text-red-700 font-bold'>{error}</p> : null}
            <div className='bg-gray-50 p-1'>
                <div className='flex justify-between'>
                    <h3 className='font-bold text-gray-700'>{post.user.email}</h3>
                    {
                        email === post.user.email ?
                        <div className='flex gap-1 mx-0.5'>
                            <button onClick={() => setDeleteModalOpen(true)} className='text-red-500 ease duration-100 hover:text-red-600'>Delete</button>
                            <button onClick={() => setEditModalOpen(true)} className='text-blue-500 ease duration-100 hover:text-blue-600'>Edit</button>
                        </div> :
                        null
                    }
                </div>
                {
                    post.images.length !== 0 ?
                    <div className='flex md:flex-row flex-col justify-center items-start'>
                        <img className='drop-shadow-2xl' src={'http://127.0.0.1:8000' + choosenImage?.image} height='400px' width='400px' alt='picture with post' />
                        {
                            post.images.length > 1 ?
                            <div className='flex md:flex-col flex-row ml-3'>
                                {
                                    post.images.map((image: Image, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setChoosenImage(image)}
                                            className={`m-1 cursor-pointer ${image.id === choosenImage?.id ? '' : 'contrast-50'}`}
                                        >
                                            <img src={'http://127.0.0.1:8000' + image.image} width='100px' />
                                        </div>
                                    ))
                                }
                            </div> :
                            null
                        }
                    </div> :
                    null
                }
                <p className='my-3'>{post.content}</p>
                <span className='text-gray-400 text-sm'>{new Date(post.date).toLocaleString('en-US')}</span>
            </div>

            <EditModal editModalOpen={editModalOpen} setEditModalOpen={setEditModalOpen} text={post.content} id={post.id} setPost={setPost} />
            <DeleteModal deleteModalOpen={deleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} id={post.id} />

            {/*Comments */}
            <h3 className='text-lg font-bold mt-3 mb-2'>Comments:</h3>
            <div className='my-5'>
                <p>Add a comment:</p>
                {commentError ? <p className='text-center text-red-600 font-bold'>{commentError}</p> : null}
                <form onSubmit={handleAddComment}>
                    <textarea
                        placeholder='Comment on this post'
                        className='w-full border rounded h-12 resize-none focus:outline-slate-300 py-0.5 px-1'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button className='bg-blue-500 easse duration-200 hover:bg-blue-700 w-full rounded text-[#eee] py-1'>Add Comment</button>
                </form>
            </div>
            <div>
                {
                    comments.length === 0 ?
                    <p className='border text-center font-bold text-gray-400 py-1'>No comments</p> :
                    <>
                        {
                            comments.map((comment: Comment) => (
                                <div key={comment.id} className='my-1 border-b'>
                                    <div className='flex justify-between'>
                                        <h5 className='text-sm font-bold'>{comment.user.email}</h5>
                                        <div className='flex'>
                                            {
                                                email === comment.user.email ?
                                                <div className='flex gap-1 mx-0.5'>
                                                    <button onClick={() => setDeleteCommentModalOpen(true)} className='text-red-500 ease duration-100 hover:text-red-600'>Delete</button>
                                                    <button onClick={() => setEditCommentModalOpen(true)} className='text-blue-500 ease duration-100 hover:text-blue-600'>Edit</button>
                                                </div> :
                                                null
                                            }
                                        </div>
                                    </div>
                                    <p>{comment.content}</p>
                                    <span className='text-gray-400 text-sm'>{new Date(comment.date).toLocaleString('en-US')}</span>
                                    <DeleteCommentModal
                                        deleteCommentModalOpen={deleteCommentModalOpen}
                                        setDeleteCommentModalOpen={setDeleteCommentModalOpen}
                                        id={comment.id}
                                        setComments={setComments}
                                    />
                                </div>
                            ))
                        }
                    </>
                }
                <div>
                    {
                        next ?
                        <div className='flex justify-center my-5'>
                            <button
                                className='rounded text-[#eee] bg-blue-500 ease duration-150 hover:bg-blue-600 py-1 px-2'
                                onClick={handleLoadMoreComments}
                            >Load more</button>
                        </div> :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default PostPage