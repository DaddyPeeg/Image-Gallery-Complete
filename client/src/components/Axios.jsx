import { formHelperTextClasses } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Axios() {
  const [file, setFile] = useState(null);
  console.log(file);

  const handleSubmit = async () => {
    let newArrFiles = [];
    for (let i = 0; i < file.length; i++) {
      newArrFiles.push(file[i]);
    }
    const formData = new FormData();
    for (let i = 0; i < newArrFiles.length; i++) {
      formData.append("photos", newArrFiles[i]);
    }
    for (let x of formData.entries()) {
      console.log(x);
    }

    // axios
    //   .post(
    //     `${import.meta.env.VITE_LOCALIP}:${
    //       import.meta.env.VITE_SERVER_PORT
    //     }/uploaddufichier`,
    //     formData
    //   )
    //   .then((res) => res.data);
  };

  return (
    <div className="App">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files)}
        accept="image/*"
        multiple
      />
      <button onClick={handleSubmit}>envoyer</button>
    </div>
  );
}

export default Axios;
