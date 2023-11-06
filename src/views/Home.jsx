import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();
  const modelId = 3; // It should be taken from the DB

  useEffect(() => {
    if (user && user.email) {
      const fetchUserInfo = async () => {
        try {
          const userJSON = localStorage.getItem('user');
          if (userJSON) {
            const user = JSON.parse(userJSON);
            if (user && user.name) {
              setUserInfo(user);
              setIsLoggedIn(true);
            }
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          setIsLoggedIn(false);
          sessionStorage.removeItem('isLoggedIn');
        }
      };

      fetchUserInfo();
    } else {
      const userInLocalStorage = JSON.parse(localStorage.getItem('user'));
      if (userInLocalStorage) {
        setUserInfo(userInLocalStorage);
        setIsLoggedIn(true);
      }
    }
  }, [user?.email]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', false)
  };

  const handleComment = () => {
    navigate(`/Front-Eco3DPrint/comment?id=${modelId}`, {state: {userInfo: userInfo}});
  };  


  return (
    <div className="w-3/5 h-[60vh] p-[20px] rounded-2xl bg-cyan-200 drop-shadow-darker justify-items-center">
      <h1 className="flex justify-center text-[50px] font-ubuntu font-[1000]">INICIO</h1>
      {isLoggedIn && (
          <div className="flex flex-wrap justify-center font-ubuntu text-white">
            <button className="px-14 py-8 w-[40%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={() => {navigate('/Front-Eco3DPrint/subirArchivo')}}>Subir Archivo</button>
            <button className="px-14 py-8 w-[40%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={() => {navigate('/Front-Eco3DPrint/visualizarSTL')}}>Visualizar STL</button>
            <button className="px-14 py-8 w-[40%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={handleComment}>Comentar</button>
            <button className="px-14 py-8 w-[40%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={() => {navigate('/Front-Eco3DPrint/ProfileConfig')}}>ModifyProfile</button>
            <button className="px-14 py-8 w-[85%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={handleLogout}>Sign out</button>
          </div>
      )}
      {!isLoggedIn && (
          <div className="flex flex-wrap justify-center font-ubuntu text-white">
            <button className="px-14 py-8 w-[40%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={() => {navigate('/Front-Eco3DPrint/subirArchivo')}}>Subir Archivo</button>
            <button className="px-14 py-8 w-[40%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={() => {navigate('/Front-Eco3DPrint/visualizarSTL')}}>Visualizar STL</button>
            <button className="px-14 py-8 w-[40%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={() => {navigate('/Front-Eco3DPrint/UserRegistration')}}>Registrate</button>
            <button className="px-14 py-8 w-[40%] m-[2%] text-[20px] rounded-2xl transition hover:scale-105 hover:shadow-dark-spread bg-gradient-to-br from-sky-400 to-blue-800" onClick={() => {navigate('/Front-Eco3DPrint/UserLogin')}}>Sign in</button>
          </div>
      )}
    </div>
  );
}

export default Home;
