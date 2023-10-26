import Fileupload from "./components/Fileupload";
import React, { useRef, useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import AddIcon from "@mui/icons-material/Add";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import Lightbox from "yet-another-react-lightbox";
import useMediaQuery from "./useMediaQuery";
import "yet-another-react-lightbox/styles.css";
import PhotoAlbum from "react-photo-album";
import slides from "./data/slides";
import fetchData from "./data/slidescopy";

import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function App() {
  // fetchData();
  const [isModal, setIsModal] = useState(false);
  const [isSnackbar, setIsSnackbar] = useState(false);
  const media1 = useMediaQuery("(min-width:1215px)");
  const media2 = useMediaQuery("(min-width:600px)");
  const [index, setIndex] = useState(-1);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref1 = useRef(null);
  const [state, setState] = React.useState({
    vertical: "top",
    horizontal: "right",
  });

  const { vertical, horizontal } = state;

  const observer = new IntersectionObserver((entries) => {
    setIsIntersecting(entries[0].isIntersecting ? true : false);
  });

  useEffect(() => {
    observer.observe(ref1.current);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbar(false);
  };

  const handleScrollTop = () => {
    ref1.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlelogo = () => {
    if (!media2) {
      return "100px";
    }
  };

  useEffect(() => {
    if (isModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModal]);
  return (
    <div className="app">
      <div ref={ref1} className="headerComp">
        <div className="containIt">
          <img
            style={{ height: handlelogo(), width: handlelogo() }}
            src="logoCfc.png"
            alt="logo"
          />
          <h1 style={{ fontSize: "1rem" }}>
            Christian Fellowship Church - Himamaylan City
          </h1>
        </div>
      </div>
      <div className="searchComp">
        <div className="containSearch">
          <span className="searchBtn">
            <ImageSearchIcon
              fontSize="inherit"
              style={{ marginLeft: "10px" }}
            />
          </span>
          <input type="text" placeholder="Search Image..." />
        </div>
      </div>
      <div className="imgHeader">
        <h1>
          <i>PHOTO COLLECTION</i>
        </h1>
      </div>
      <div className="image-gallery-container">
        <div className="image-gallery">
          <PhotoAlbum
            layout="rows"
            photos={fetchData()}
            targetRowHeight={150}
            onClick={({ index: current }) => setIndex(current)}
          />
        </div>
      </div>

      <Lightbox
        index={index}
        slides={fetchData()}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Slideshow, Thumbnails, Zoom]}
      />
      {!isIntersecting && (
        <span onClick={handleScrollTop} className="go-to-top">
          <KeyboardDoubleArrowUpIcon
            className="icon-to-top"
            fontSize="inherit"
          />
        </span>
      )}
      {isModal ? (
        <Fileupload
          setIsSnackbar={setIsSnackbar}
          isModal={isModal}
          setIsModal={setIsModal}
        />
      ) : (
        <span
          onClick={() => {
            setIsModal(true);
          }}
          className="add-files"
        >
          <AddIcon fontSize="inherit" />
        </span>
      )}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={isSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Uploading Done
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
