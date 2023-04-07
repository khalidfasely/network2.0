import React from 'react';
import Modal from 'react-modal';
import { Comment } from '../types/post';
import CommentForm from './CommentForm';

interface Props {
    editCommentModalOpen: boolean,
    setEditCommentModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    id: number,
    setComments: (value: Comment[] | ((prevVar: Comment[]) => Comment[])) => void,
    text: string
}

const EditCommentModal: React.FC<Props> = ({ editCommentModalOpen, id, setComments, setEditCommentModalOpen, text }) => {
      
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginTop: '2rem',
          padding: '1rem',
          width: '60%',
          transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal
            isOpen={editCommentModalOpen}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className='w-full flex justify-end'>
                <button
                    onClick={() => setEditCommentModalOpen(false)}
                    style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
                    className="max-h-44 text-xl p-1 m-1 hover:drop-shadow-xl hover:bg-light-gray"
                >
                    X
                </button>
            </div>
            <CommentForm isEdit={true} id={id} setComments={setComments} setEditCommentModalOpen={setEditCommentModalOpen} text={text} />
        </Modal>
    )
}

export default EditCommentModal;