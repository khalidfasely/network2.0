import axios from "axios";

export const getPosts: (next?: string | null) => Promise<object> = async (next) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.get(
            `${next ? next : 'http://127.0.0.1:8000/api/posts/'}`,
            config
        )

        return [data, null]
    } catch(er) {
        return [null, er]
    }
}