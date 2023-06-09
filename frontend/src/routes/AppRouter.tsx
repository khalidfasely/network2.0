import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import NavBar from '../components/NavBar';
import Register from '../pages/Register';
import { AuthRoute } from './AuthRoute';
import { PrivateRoute } from './PrivateRoute';
import PostPage from '../pages/PostPage';

const AppRouter: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <div className={`relative`}>
          <NavBar />
          <Routes>
            <Route path="/" element={
                <Home />
            } />

            <Route path="/post/:id" element={
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>
            } />
            
            {/* Auth */}
            <Route path="/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } />

            <Route path="/register" element={
                <AuthRoute>
                  <Register />
                </AuthRoute>
            } />

            {/* 404 page not found */}
            <Route path='*' element={
                <NotFound />
            }/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default AppRouter;