import React from "react";
import { AppBar, Button, Toolbar, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    // Navigate to the questionnaire example page
    navigate("/questionnaire/create");
  };
  return (
    <AppBar
      position="static"
      color="default"
      style={{ backgroundColor: "#333" }}
    >
      <Toolbar>
        <Typography variant="h6" color={"#fff"}>
          Survey App
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleNavigate}>
          Create Questionnaire
        </Button>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
