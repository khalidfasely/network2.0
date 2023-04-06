import axios from "axios";

export const addComment: (dataSent: object, postId: number) => Promise<object> = async (dataSent, postId) => {
    const token = localStorage.getItem('token');

    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/comment/${postId}`,
            dataSent,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}