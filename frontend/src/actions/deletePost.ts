import axios from "axios";

export const deletePost: (id: number) => Promise<object> = async (id) => {
    const token = localStorage.getItem('token');

    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(
            `http://127.0.0.1:8000/api/post/${id}`,
            config
        )

        return [data, null]
    } catch (er) {
        return [null, er]
    }
}