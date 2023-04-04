import axios from 'axios';

interface Parameters {
    username: String,
    email: String,
    password: String,
    confirmation: String
}

export const registerApi: (parameter: Parameters) => Promise<object> = async ({username, email, password, confirmation}) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        
        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/register/',
            {'name': username, 'email': email, 'password': password, 'confirmation': confirmation},
            config
        )

        localStorage.setItem('token', data.token);

        return data;

    } catch (er: any) {
        return er;
    }
}