import React from "react";
import Dropzone from "../components/Dropzone";
import TextField from '@mui/material/TextField';

function UploadFile() {
  return (
    <div>
      <div>
        <h1>Upload File</h1>
        <Dropzone />
      </div>
      <div className="centerDetails">
        <h1>File details</h1>
        <div className="fileDetails">
        Title (required) <TextField id="outlined-basic" label="" variant="outlined" />
        </div>
        <div className="fileDetails">
        Description (required) <TextField id="outlined-basic" multiline label="" variant="outlined" />
        </div>
      </div>
    </div>
  );
}

export default UploadFile;
