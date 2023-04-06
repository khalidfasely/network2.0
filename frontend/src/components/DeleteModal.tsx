import React from 'react';
import Modal from 'react-modal';
import { deletePost } from '../actions/deletePost';
import { useNavigate } from 'react-router-dom';

interface Props {
    deleteModalOpen: boolean,
    setDeleteModalOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    id: number
}

const DeleteModal: React.FC<Props> = ({ deleteModalOpen, setDeleteModalOpen, id }) => {

    const navigate = useNavigate();

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

    const handleDeletePost = () => {
        deletePost(id)
        .then((res: any) => {
            if (res[1]) {
                return
            }

            console.log(res[0])
            setDeleteModalOpen(false);
            navigate('/');
        })
    }

    return (
        <Modal
            isOpen={deleteModalOpen}
            style={customStyles}
            ariaHideApp={false}
        >
            <div className='w-full flex justify-end'>
                <button
                    onClick={() => setDeleteModalOpen(false)}
                    style={{ color: "rgb(153, 171, 180)", borderRadius: "50%" }}
                    className="max-h-44 text-xl p-1 m-1 hover:drop-shadow-xl hover:bg-light-gray"
                >
                    X
                </button>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-lg'>If you delete this post, there is no way to return if!</p>
                <button onClick={handleDeletePost} className='bg-red-600 ease duration-200 hover:bg-red-700 mb-5 mt-3 rounded text-[#eee] py-2 px-4'>Delete</button>
            </div>
        </Modal>
    )
}

export default DeleteModal