import React, { useEffect } from "react";
import "../styles/Profile.css";
import UserCatalog from "./UserCatalog";
import { useParams } from "react-router-dom";

function Profile() {
  const {username} = useParams();

  useEffect(() => {console.log(username)}, []);

  return (
    <>
      <div className="flex h-screen w-[90%] pt-[7%]">
        {/*general*/}

        <div className="flex-col mr-10">
          {/*izq*/}
          <div className="h-[375px] w-[300px] bg-green-500 mb-[10px] rounded-lg flex flex-col">
            <div className="flex flex-col items-center justify-center mt-7">
              <div className="rounded-full bg-white h-[150px] w-[150px] flex items-center justify-center">
                <img
                  className="w-[150px] h-[150px] rounded-full"
                  src="/vite.svg"
                ></img>
              </div>
              <div className="mt-5">{username}</div>
              <div className="flex items-center justify-center mt-5">
                <button className="bg-blue-400 border mr-1">Seguir</button>
                <button className="bg-blue-400 border mr-1">Tip</button>
                <button className="bg-blue-400 border">Mensaje</button>
              </div>
            </div>
            <div className="flex">
              <div className="flex items-center justify-center bg-blue-400 w-[300px] h-[80px] rounded-lg mt-[27px]">
                <p className="w-1/3 text-center">1000</p>
                <p className="w-1/3 text-center">22</p>
                <p className="w-1/3 text-center">67</p>
              </div>
            </div>
          </div>
          <div className="h-[350px] bg-green-700 rounded-lg">Buenas</div>
        </div>

        <div className="flex w-[90%] h-[735px] bg-gray-400 flex-col">
          {/*der*/}
          <div className="flex bg-red-500 w-[100%] h-[75px]">
            <button className="w-[120px] h-[75px] mr-10 bg-white border-solid border-2 border-sky-500">
              Favoritos
            </button>
            <button className="w-[120px] h-[75px] mr-10 bg-white border-solid border-2 border-sky-500">
              Diseños
            </button>
            <button className="w-[120px] h-[75px] mr-10 bg-white border-solid border-2 border-sky-500">
              Colecciones
            </button>
          </div>
          <div>
            <UserCatalog username={username}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
