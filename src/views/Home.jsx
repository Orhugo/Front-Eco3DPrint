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
    <>
      <h1>Página de inicio</h1>
      {isLoggedIn && (
          <div>
            <button onClick={() => {navigate('/Front-Eco3DPrint/subirArchivo')}}>Subir Archivo</button>
            <button onClick={() => {navigate('/Front-Eco3DPrint/visualizarSTL')}}>Visualizar STL</button>
            <button onClick={handleComment}>Comentar</button>
            <button onClick={handleLogout}>Sign out</button>
            <button onClick={() => {navigate('/Front-Eco3DPrint/ProfileConfig')}}>ModifyProfile</button>
          </div>
      )}
      {!isLoggedIn && (
          <div>
            <button onClick={() => {navigate('/Front-Eco3DPrint/subirArchivo')}}>Subir Archivo</button>
            <button onClick={() => {navigate('/Front-Eco3DPrint/visualizarSTL')}}>Visualizar STL</button>
            <button onClick={() => {navigate('/Front-Eco3DPrint/UserRegistration')}}>Registrate</button>
            <button onClick={() => {navigate('/Front-Eco3DPrint/UserLogin')}}>Sign in</button>
          </div>
      )}
    </>
  );
}

export default Home;
