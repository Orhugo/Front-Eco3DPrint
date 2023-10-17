import React from "react";
import {Pagination, TextField} from "@mui/material";
import Dropzone from "../components/Dropzone.jsx";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import CatalogElement from "../components/CatalogElement.jsx";

function Catalog(){
    return (
        <>
            <div id={"catalogNavHeader"}>
                <TextField id="filled-basic" label="Filled" variant="filled" />
                <Button variant="outlined">Outlined</Button>
            </div>
            <div id={"catalogGalery"} style={{ display: "inline-flex" }}>
                <div id={"catalogGalleryRow"}>
                    <CatalogElement/>
                    <CatalogElement/>
                    <CatalogElement/>
                </div>

            </div>
            <Pagination count={10} />
        </>
    );
}

export default Catalog