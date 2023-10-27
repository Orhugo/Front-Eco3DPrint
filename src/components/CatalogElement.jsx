import React from "react";
import Box from "@mui/material/Box";

function CatalogElement(){
    return(
        <div id={"catalogElement"}>
            <div id={"catalogElementPreview"} color={"grey"}>
                <Box
                    sx={{
                        width: 300,
                        height: 200,
                        borderRadius: "10px 10px 0px 0px",
                        backgroundColor: "rgb(120,120,120)",
                        '&:hover': {
                            backgroundColor: "rgb(180,180,180)",
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                />
            </div>
            <div id={"catalogElementBody"}>
                <Box
                    sx={{
                        width: 300,
                        height: 100,
                        borderRadius: "0px 0px 10px 10px",
                        backgroundColor: "rgb(95,95,95)",'&:hover': {
                            backgroundColor: 'rgb(140,140,140)', opacity: [1, 1, 1],
                        },
                    }}
                />
            </div>
        </div>
    )
}

export default CatalogElement