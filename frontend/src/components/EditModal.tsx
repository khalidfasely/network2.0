import React from 'react';
import Modal from 'react-modal';
import PostForm from './PostForm';
import { Post } from '../types/post';

interface Props {
    editModalOpen: boolean,
    setEditModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    text: string,
    id: number,
    setPost: (value: Post | ((prevVar: Post) => Post)) => void,
}

const EditModal: React.FC<Props> = ({ editModalOpen, setEditModalOpen, text, id, setPost }) => {
    
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

    return (
        <Modal
            isOpen={editModalOpen}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className='w-full flex justify-end'>
                <button
                    onClick={() => setEditModalOpen(false)}
                    style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
                    className="max-h-44 text-xl p-1 m-1 hover:drop-shadow-xl hover:bg-light-gray"
                >
                    X
                </button>
            </div>
            <PostForm isEdit={true} oldText={text} id={id} setPost={setPost} setEditModalOpen={setEditModalOpen} />
    </Modal>
    )
}

export default EditModal