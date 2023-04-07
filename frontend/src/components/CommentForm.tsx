import React, { useState } from 'react'
import { addComment } from '../actions/addComment';
import { Comment } from '../types/post';
import { updateComment } from '../actions/updateComment';

interface Props {
    setComments: (value: Comment[] | ((prevVar: Comment[]) => Comment[])) => void,
    id: number, //if create the id is the post id, when edit the id is the comment id

    isEdit?: boolean,
    setEditCommentModalOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    text?: string
}

const CommentForm: React.FC<Props> = ({ setComments, id , isEdit, setEditCommentModalOpen, text}) => {
    const [ newComment, setNewComment ] = useState<string>(text ? text : '');
    const [commentError, setCommentError] = useState<string>('');

    const handleAddComment = (e: any) => {
        e.preventDefault();

        if (newComment === '') {
            setCommentError('Fill out the input!');
            return
        }

        if (isEdit) {
            updateComment({text: newComment}, id)
            .then((res: any) => {
                if (res[1]) {
                    setCommentError(res[1].response ? res[1].response?.data?.message : res[1].message);
                    return
                }
    
                setComments((prev: Comment[]) => [...prev.map((comment: Comment) => comment.id === id ? res[0] : comment)]);
                if (setEditCommentModalOpen) {
                    setEditCommentModalOpen(false);
                }
            })
            return
        }

        addComment({text: newComment}, id)
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
        <form onSubmit={handleAddComment}>
            {commentError ? <p className='text-center text-red-600 font-bold'>{commentError}</p> : null}
            <textarea
                placeholder='Comment on this post'
                className='w-full border rounded h-12 resize-none focus:outline-slate-300 py-0.5 px-1'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button className='bg-blue-500 easse duration-200 hover:bg-blue-700 w-full rounded text-[#eee] py-1'>{isEdit ? 'Edit' : 'Add'} Comment</button>
        </form>
    )
}

export default CommentForm