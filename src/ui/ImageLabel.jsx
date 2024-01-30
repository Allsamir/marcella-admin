import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageLabel = ({ sizes }) => {
  return (
    <div className="d-flex mt-4 justify-content-center">
      <label
        htmlFor="file-upload"
        className="d-flex flex-column align-items-center border justify-content-center"
        style={{ height: "180px", width: "360px", display: "block", cursor: "pointer" }}
      >
        <FaCloudUploadAlt size={35} style={{ color: "green" }} />
        <p
          style={{
            color: "#0CB363",
            fontWeight: "bold",
            marginBottom: "0px",
            fontSize: "1rem",
          }}
        >
          Choose file to upload
        </p>
        <span style={{ color: "#ccc" }}>Allowed JPG, JPEG, PNG and GIF</span>
        <span style={{ color: "#ccc" }}>
          File must be less than <span style={{ color: "#afafaf" }}>2 MB</span>
        </span>
        <span style={{ color: "#0CB363" }}>Size: {sizes}</span>
      </label>
    </div>
  );
};

export default ImageLabel;
