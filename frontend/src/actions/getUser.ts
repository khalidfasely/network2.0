import axios from 'axios';

export const getUser: () => Promise<object> = async () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.get(
                'http://127.0.0.1:8000/api/get_user/',
                config
            )

            //store.dispatch(login({...data, token}));
            return {...data, token};

        } catch (er) {
            return er;
        }
    }
}