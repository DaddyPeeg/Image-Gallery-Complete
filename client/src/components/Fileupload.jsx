import React, { useState, useRef, useEffect } from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
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

const Fileupload = ({ setIsModal, isModal, setIsSnackbar }) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputFiles = useRef();
  const buttonUpload = useRef();
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  let files = [];
  const handleFile = (e) => {
    files = [...files, ...e.target.files];
    const filteredArray = files.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );
    files = [...filteredArray];
    inputFiles.current.innerText = `A total of (${files.length}) pictures to upload`;
    console.log(files);
  };

  const uploadImageToServer = async (images) => {
    setIsUploading(true);
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("photos", images[i]);
    }
    const response = await fetch(
      `${import.meta.env.VITE_LOCALIP}:${
        import.meta.env.VITE_SERVER_PORT
      }/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const hello = await response.json();
    const myTimeout = setTimeout(() => {
      setIsUploading(false);
      setIsModal(false);
      setIsSnackbar(true);
    }, 2000);
  };

  const handleUpload = () => {
    if (!files.length) alert("No files yet");
    else uploadImageToServer(files);
  };
  return (
    <Dialog
      open={isModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setIsModal(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      {isUploading ? (
        <>
          <DialogTitle margin="auto">Uploading</DialogTitle>
          <img src="check_answer.gif" />
        </>
      ) : (
        <>
          <DialogTitle>Photo Upload</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Image files only
            </DialogContentText>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Select Images
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                multiple
                onChange={handleFile}
              />
            </Button>
            <DialogContentText
              ref={inputFiles}
              id="alert-dialog-slide-description"
              style={{
                marginTop: "1rem",
              }}
            ></DialogContentText>
          </DialogContent>
          <Button onClick={handleUpload} ref={buttonUpload}>
            Upload
          </Button>
        </>
      )}
    </Dialog>
  );
};

export default Fileupload;
