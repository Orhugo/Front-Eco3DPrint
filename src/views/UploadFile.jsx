import React, { useState, useEffect } from "react";
import Dropzone from "../components/Dropzone";
import TextField from "@mui/material/TextField";
import { Print } from "@mui/icons-material";
import PrintSettings from "../components/PrintSettings";
import { useNavigate } from 'react-router-dom';

function UploadFile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOnBlurTitle = (event) => {
    if (title !== event.target.value) {
      setTitle(event.target.value);
      //console.log(title);
    }
  };

  const handleOnBlurDescription = (event) => {
    if (description !== event.target.value) {
      setDescription(event.target.value);
    }
  };

  useEffect(() => {
    // Check if user is null and navigate accordingly
    if (user === null) {
      navigate('/Volume/UserRegistration');
    }
  }, [user, navigate]);

  return (
    <>
      <div>
        {user !== null ? (
          <div className="mt-[600px]">
            <div>
              <Dropzone title={title} description={description} />
            </div>
            <div className="centerDetails">
              <h1>File details</h1>
              <div className="fileDetails">
                Title (required){" "}
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  onBlur={handleOnBlurTitle}
                />
              </div>
              <div className="fileDetails">
                Description (required){" "}
                <TextField
                  id="outlined-basic"
                  multiline
                  label=""
                  variant="outlined"
                  onBlur={handleOnBlurDescription}
                />
              </div>
            </div>
            <PrintSettings />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default UploadFile;
