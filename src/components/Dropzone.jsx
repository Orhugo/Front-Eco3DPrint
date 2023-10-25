import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/UploadFile.css";
import axios from "axios";
import ButtonUploadFiles from "./ButtonUploadFiles";

/* The `Dropzone` function is a React component that allows users to drag and drop files or click to
select files. It uses the `useDropzone` hook from the `react-dropzone` library to handle the file
drop functionality. */
function Dropzone() {
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  /* The `onDrop` function is a callback function that is called when files are dropped or selected in
  the dropzone. It takes two parameters: `acceptedFiles` and `rejectedFiles`, which are arrays of
  files that were accepted and rejected, respectively. */
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
    console.log(acceptedFiles);
  }, []);
  /* The `const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxSize: 1024 *
  1000 })` line is using the `useDropzone` hook from the `react-dropzone` library to configure the
  dropzone functionality. */
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 1024 * 100000,
    accept: { "model/stl": [".stl"] },
  });

  /**
   * The function `removeFile` removes a file from a list of files based on its name.
   */
  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  /**
   * The `removeAll` function clears the `files` and `rejected` arrays.
   */
  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  /**
   * The function `removeRejected` removes a file from the `rejected` array based on its name.
   */
  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="drag-area active">Drop the files here ...</p>
        ) : (
          <p className="drag-area">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>

      {/* Preview */}
      <div>
        <button type="button" onClick={removeAll}>
          Remove all files
        </button>
      </div>

      {/*Accepted files*/}
      <h3>Accepted Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file.name} className="li">
            <div className="inline-div">
              <img
                src={"./stl_icon.png"}
                width={40}
                height={40}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </div>
            <div className="inline-div">
              <p>{file.name}</p>
            </div>
            <div className="inline-div">
              <IconButton
                aria-label="delete"
                onClick={() => {
                  removeFile(file.name);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>

      {/* Rejected Files */}
      <h3>Rejected Files</h3>
      <ul>
        {rejected.map(({ file, errors }) => (
          <li key={file.name}>
            <div>
              <p>{file.name}</p>
              <ul>
                {errors.map((error) => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            </div>
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeRejected(file.name)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>

      {/* <button
        style={{ fontSize: "large", fontWeight: "bold" }}
        onClick={uploadFiles}
      >
        Subir Archivos
      </button> */}

      <ButtonUploadFiles files = {files}/>
    </>
  );
}

export default Dropzone;
