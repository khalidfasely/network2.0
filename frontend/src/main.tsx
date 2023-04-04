import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import { store } from './store/configureStore';
import { login } from './reducers/auth';
import { getUser } from './actions/getUser';


// get user if already login
getUser()
.then((res: any) => {
  if (res.name === "AxiosError") {
    console.log(res)
    return
  }

  store.dispatch(login(res));
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
)
