import axios from "axios";

export const updateComment: (dataSend: object, id: number) => Promise<object> = async (dataSend, id) => {
    const token = localStorage.getItem('token');

    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/comment/${id}`,
            dataSend,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}