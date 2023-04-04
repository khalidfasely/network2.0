import axios from 'axios';

interface Parameters {
    email: String,
    password: String
}

export const loginApi: (parameter: Parameters) => Promise<object> = async ({email, password}) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        
        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/login/',
            {'username': email, 'password': password},
            config
        )

        localStorage.setItem('token', data.token);

        return data;

    } catch (er: any) {
        return er;
    }
}