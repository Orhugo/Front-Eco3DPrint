import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true'
  );
  const location = useLocation();
  const { user } = location.state || {};
  const navigate = useNavigate();
  const handleClick = () => navigate();

  useEffect(() => {
    setIsLoggedIn(false);
    setUserInfo(null);

    if (user && user.email) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.get('http://localhost:8080/users/getUserByEmail', {
            params: { email: user.email },
          });

          setUserInfo(response.data);
          setIsLoggedIn(true);
          sessionStorage.setItem('isLoggedIn', 'true');
        } catch (error) {
          console.error('Error fetching user details:', error);
          setIsLoggedIn(false);
          sessionStorage.removeItem('isLoggedIn');
        }
      };

      fetchUserInfo();
    }
  }, [user?.email]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <>
      <h1>Página de inicio</h1>
      {isLoggedIn && (
          <div>
            <p>{userInfo.name}</p>
            <p>{userInfo.lastname}</p>
            <button onClick={() => {navigate('/Front-Eco3DPrint/subirArchivo')}}>Subir Archivo</button>
            <button onClick={() => {navigate('/Front-Eco3DPrint/visualizarSTL')}}>Visualizar STL</button>
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
            <button onClick={() => {navigate('/Front-Eco3DPrint/ProfileConfig')}}>ModifyProfile</button>
          </div>
      )}
    </>
  );
}

export default Home;
