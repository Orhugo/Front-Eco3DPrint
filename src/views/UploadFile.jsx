import React, { useState } from "react";
import Dropzone from "../components/Dropzone";
import TextField from "@mui/material/TextField";

function UploadFile() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOnBlurTitle = (event) => {
    if (title !== event.target.value) {
      setTitle(event.target.value);
      console.log(title);
    }
  };

  const handleOnBlurDescription = (event) => {
    if (description !== event.target.value) {
      setDescription(event.target.value);
    }
  };

  return (
    <div>
      <div>
        <h1>Upload File</h1>
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
    </div>
  );
}

export default UploadFile;
