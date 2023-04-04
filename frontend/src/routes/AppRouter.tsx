import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import NavBar from '../components/NavBar';

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
            
            {/* Auth */}
            <Route path="/login" element={
                <Login />
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