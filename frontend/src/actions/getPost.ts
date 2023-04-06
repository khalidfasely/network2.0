import axios from 'axios';

export const getPost: (id: number) => Promise<object> = async (id) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:8000/api/post/${id}`,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}