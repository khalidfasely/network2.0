import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Comment, Image, Post } from '../types/post';
import { getPost } from '../actions/getPost';
import EditModal from '../components/EditModal';
import DeleteModal from '../components/DeleteModal';
import { useSelector } from 'react-redux';

const defaultState: Post = {
    id: 0,
    images: [],
    comments: [],
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

    const [ editModalOpen, setEditModalOpen ] = useState<boolean>(false);
    const [ deleteModalOpen, setDeleteModalOpen ] = useState<boolean>(false);

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
        }
    }, [id])

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
            <div>
                {
                    post.comments.length === 0 ?
                    <p className='border text-center font-bold text-gray-400 py-1'>No comments</p> :
                    <>
                        {
                            post.comments.map((comment: Comment) => (
                                <div key={comment.id}>
                                    <h5>{comment.user.email}</h5>
                                    <p>{comment.content}</p>
                                    <span className='text-gray-400 text-sm'>{new Date(comment.date).toLocaleString('en-US')}</span>
                                </div>
                            ))
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default PostPage