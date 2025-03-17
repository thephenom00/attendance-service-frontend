import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPages = ({currentPage, setUser}) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(currentPage === 'login');


};

export default AuthPages;
