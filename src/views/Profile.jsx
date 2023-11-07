import React from "react";
import "../styles/Profile.css";
import { green } from "@mui/material/colors";

function Profile() {
  return (
    <>
      <div className="general" style={{display:'inline-block'}}>
        <div
          className="user-container"
          style={{ position: "absolute", top: 125, left: 50, display: 'inline-block', verticalAlign: 'top' }}
        >
          <div className="user-panel" style={{ backgroundColor: "gray" }}>
            <div className="user-info">
              <img src="user-profile-image.jpg" alt="User Profile" />
              <h2>Nombre de Usuario</h2>
              <p>@nombredeusuario</p>
              <button>Seguir</button>
              <button>Dar propina</button>
              <button>Enviar mensaje</button>
            </div>
            <div className="user-stats">
              <div>
                <p>Seguidores</p>
                <span>1000</span>
              </div>
              <div>
                <p>Siguiendo</p>
                <span>500</span>
              </div>
              <div>
                <p>Diseños</p>
                <span>50</span>
              </div>
            </div>
          </div>
          <div
            className="user-about"
            style={{ backgroundColor: "gray", marginTop: "10px" }}
          >
            <h3>Acerca de mí</h3>
            <p>Descripción del usuario y sus intereses.</p>
          </div>
        </div>

        <div
          className="user-actions"
          style={{ backgroundColor: "green", width: 1000 }}
        >
          <button>Likes</button>
          <button>Diseños</button>
          <button>Likes del usuario</button>
        </div>

        <div className="user-designs">
          {/* Aquí se mostrarían los diseños del usuario */}
        </div>
      </div>
    </>
  );
}

export default Profile;
