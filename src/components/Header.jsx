import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between py-4 px-35 bg-white shadow-md">
        <div onClick={() => navigate('/')} className="flex items-center space-x-2 hover:cursor-pointer">
            <img
            src={"/imgs/logo.jpeg"}
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover "
            />
            <span className="text-2xl font-bold text-judo-blue">DojoLog</span>
        </div>
        </header>
    );
};

export default Header;
