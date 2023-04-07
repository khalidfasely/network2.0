import axios from "axios";

export const editPost: (dataSent: object, id: number) => Promise<object> = async (dataSent, id) => {
    const token = localStorage.getItem('token');

    try {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(
            `http://127.0.0.1:8000/api/post/${id}`,
            dataSent,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}