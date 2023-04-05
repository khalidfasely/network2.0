import axios from "axios";

export const createPost: (formData: object) => Promise<object> = async (formData) => {
    const token = localStorage.getItem('token');

    try {
        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/post/',
            formData,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}