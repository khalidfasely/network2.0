import React from 'react'

import image1 from '../images/71GE+Um5+WL._UX569_.jpg';
import image2 from '../images/calendardark.png';
import image3 from '../images/calendardarksm.png';
import image4 from '../images/calendarlight.png';

interface Comment {
    id: number,
    user: string,
    content: string,
    date: string
}

interface Post {
    id: number,
    user: string,
    content: string,
    images: string[],
    likes: number,
    comments: Comment[],
    date: string
}

const posts: Post[] = [
    {
        id: 1,
        user: 'admin',
        content: 'To generate random text using the current language in a Word document and customize the number of paragraphs and sentences: Position the cursor in the document where you want to generate random text.Type =RAND(number of paragraphs, number of sentences) such as = RAND(3,2). Press Enter.',
        images: [image1],
        likes: 2,
        date: '2022-11',
        comments: [
            {
                id: 1,
                user: 'admin',
                content: 'To generate random text using the current language',
                date: '2022-11',
            }
        ]
    },
    {
        id: 2,
        user: 'khalid',
        content: 'To generate random text using the current language in a Word document and customize the number of paragraphs and sentences: Position the cursor in the document where you want to generate random text.Type =RAND(number of paragraphs, number of sentences) such as = RAND(3,2). Press Enter.',
        images: [image1, image2, image3],
        likes: 0,
        date: '2022-12',
        comments: [
            {
                id: 1,
                user: 'admin',
                content: 'To generate random text using the current language',
                date: '2023-2',
            },
            {
                id: 5,
                user: 'khalid',
                content: 'To generate random text using the current language',
                date: '2023-2',
            }
        ]
    }
]

const Home: React.FC = () => {
    return (
        <div className='w-[80%] sm:w-[75%] md:w-[65%] m-auto mt-4'>
            <div className='border'>
                <form className='flex flex-col m-1'>
                    <textarea
                        className='border resize-none h-16 px-3 py-1 focus:outline-slate-500'
                        placeholder='Share your thoughts!'
                    />
                    <div className='flex flex-col my-1'>
                        <label htmlFor='images' className='block text-sm font-medium text-gray-900 dark:text-white'>Add Images: </label>
                        <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            type='file'
                            id='images'
                            name='images'
                            multiple accept="image/png, image/jpeg"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-300">PNG or JPG</p>
                    </div>
                    <button
                        className='my-1 mx-1 md:mx-2 bg-slate-500 ease duration-200 hover:bg-slate-600 text-[#eee] rounded py-2'
                    >Add Post</button>
                </form>
            </div>
            
            {/*Posts*/}
            <div className='mt-5'>
                {
                    posts.map((item: Post) => (
                        <div key={item.id} className='border my-1 rounded py-1 px-1.5'>
                            <h3>{item.user}</h3>
                            <div className='flex flex-col sm:flex-row'>
                                <img src={item.images[0]} height='200px' width='200px' />
                                <div className='bg-gray-100 w-[200px] h-[200px] flex justify-center items-center'>+{item.images.length - 1} others</div>
                            </div>
                            <p>{item.content}</p>
                            <p>{item.comments.length}</p>
                            <span>{item.date}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Home