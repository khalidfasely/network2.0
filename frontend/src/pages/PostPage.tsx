import React from 'react';
import { useParams } from 'react-router-dom';

const PostPage: React.FC = () => {

    const { id } = useParams();

    return (
        <div>PostPage {id}</div>
    )
}

export default PostPage