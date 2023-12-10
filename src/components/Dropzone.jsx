import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/UploadFile.css";
import ButtonUploadFiles from "./ButtonUploadFiles";

/* The `Dropzone` function is a React component that allows users to drag and drop files or click to
select files. It uses the `useDropzone` hook from the `react-dropzone` library to handle the file
drop functionality. */
function Dropzone({ info }) {
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
      alert("No se admite este tipo de archivo");
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
      <div className="mx-auto p-2">
        {/* General */}
        <div {...getRootProps()} className="rounded mx-auto">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="drag-area active mx-auto LoosFont">
              Drop the files here ...
            </p>
          ) : (
            <p className="drag-area mx-auto LoosFont">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>

        <div className="flex justify-end mt-5">
          {/* Preview */}
          <div className="">
            <button
              type="button"
              onClick={removeAll}
              className="text-gray-900 bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
            >
              Eliminar Todos
            </button>
          </div>

          <ButtonUploadFiles files={files} info={info} />
        </div>

        {/*Accepted files*/}
        <h3 className="font-bold">Accepted Files</h3>
        <div className="bg-gray-400 w-full h-[150px] overflow-auto">
          <ul>
            {files.map((file) => (
              <li key={file.name} className="li">
                <div className="flex justify-between mb-5 mt-2 ml-2 mr-2">
                  <div>
                    <img
                      src={"./stl_icon.png"}
                      width={40}
                      height={40}
                      onLoad={() => {
                        URL.revokeObjectURL(file.preview);
                      }}
                    />
                  </div>
                  <div>
                    <p className="LoosFont">{file.name}</p>
                  </div>
                  <div>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        removeFile(file.name);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Dropzone;
