import React from 'react';
import Modal from 'react-modal';
import { deleteComment } from '../actions/deleteComment';
import { Comment } from '../types/post';

interface Props {
    deleteCommentModalOpen: boolean,
    setDeleteCommentModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    id: number,
    setComments: (value: Comment[] | ((prevVar: Comment[]) => Comment[])) => void,
}

const DeleteCommentModal: React.FC<Props> = ({ deleteCommentModalOpen, setDeleteCommentModalOpen, id, setComments }) => {
    
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          padding: '0',
          marginTop: '2rem',
          width: '60%',
          transform: 'translate(-50%, -50%)',
        },
    };

    const handleDeleteComment = () => {
        deleteComment(id)
        .then((res: any) => {
            if (res[1]) {
                return
            }

            setComments((prev: Comment[]) => [...prev.filter((comment: Comment) => comment.id !== id)])
            setDeleteCommentModalOpen(false);
        })
    }

    return (
        <Modal
            isOpen={deleteCommentModalOpen}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className='w-full flex justify-end'>
                <button
                    onClick={() => setDeleteCommentModalOpen(false)}
                    style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
                    className="max-h-44 text-xl p-1 m-1 hover:drop-shadow-xl hover:bg-light-gray"
                >
                    X
                </button>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-lg'>If you delete this comment, there is no way to return if!</p>
                <button onClick={handleDeleteComment} className='bg-red-600 ease duration-200 hover:bg-red-700 mb-5 mt-3 rounded text-[#eee] py-2 px-4'>Delete</button>
            </div>
        </Modal>
    )
}

export default DeleteCommentModal