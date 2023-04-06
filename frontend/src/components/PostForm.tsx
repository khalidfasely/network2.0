import React, { useState } from 'react'
import { createPost } from '../actions/createPost';
import { Post } from '../types/post';
import { editPost } from '../actions/editPost';

interface Props {
    setPosts?: (value: Post[] | ((prevVar: Post[]) => Post[])) => void,

    isEdit?: boolean,
    oldText?: string,
    id?: number,
    setPost?: (value: Post | ((prevVar: Post) => Post)) => void,
    setEditModalOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void,
}

const PostForm: React.FC<Props> = ({ setPosts, isEdit, oldText, id, setPost, setEditModalOpen }) => {
    const [ text, setText ] = useState<string>(oldText ? oldText : '');
    const [ images, setImages ] = useState<any>();

    const [ formError, setFormError ] = useState<string>('');

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

        if (isEdit && id && setEditModalOpen) {
            editPost(formData, id)
            .then((res: any) => {
                if (res[1]) {
                    setFormError(res[1].response ? res[1].response?.data?.message : res[1].message);
                    return
                }

                if (setPost) {
                    setPost(res[0]);
                }

                setEditModalOpen(false);
            })
            return
        }

        createPost(formData)
        .then((res: any) => {
            if (res[1]) {
                setFormError(res[1].response ? res[1].response?.data?.message : res[1].message);
                return
            }

            if (setPosts) {
                setPosts((prev: Post[]) => [res[0], ...prev])
            }

            setText('');
            setImages(null);

            setFormError('');
        })
    }

    return (
        <form onSubmit={handleNewPost} className='flex flex-col m-1'>
            {formError ? <p className='text-center italic text-red-700 font-bold'>{formError}</p> : null}
            <textarea
                className='border resize-none h-16 px-3 py-1 focus:outline-slate-500'
                placeholder='Share your thoughts!'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className='flex flex-col my-1'>
                <label htmlFor='images' className='block text-sm font-medium text-gray-900 dark:text-white'>Add {isEdit ? 'New ' : ''}Images: </label>
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
            >{isEdit ? 'Edit Post' : 'Add Post'}</button>
        </form>
    )
}

export default PostForm