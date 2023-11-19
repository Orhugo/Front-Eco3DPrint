import React, { useState, useEffect } from "react";
import Dropzone from "../components/Dropzone";
import { useNavigate } from "react-router-dom";
import PrintSettings from "../components/PrintSettings";

function UploadFile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is null and navigate accordingly
    if (user === null) {
      navigate("/Volume/UserRegistration");
    }
  }, [user, navigate]);

  return (
    <>
      <div>
        {user !== null ? (
          <div className="mt-[600px]">
            <div>
              <PrintSettings />
            </div>            
          </div>
        ) : null}
      </div>
    </>
  );
}

export default UploadFile;
