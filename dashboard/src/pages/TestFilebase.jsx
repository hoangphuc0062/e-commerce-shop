import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { imageDb } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

const UploadImage = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const storageRef = ref(imageDb, `uploads/${uuidv4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    // Monitor the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
        setUploading(false);
      },
      () => {
        // Get the download URL when the upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          setUploading(false);
          console.log("File available at", url);
        });
      }
    );
  };

  return (
    <div className="text-center">
      <label
        htmlFor="uploadFile1"
        className="bg-white text-secondary font-weight-semibold text-base rounded d-flex flex-column justify-content-center align-items-center cursor-pointer border border-secondary border-dashed mx-auto"
        style={{ maxWidth: "24rem", height: "13rem", fontFamily: "sans-serif" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-25 mb-2"
          viewBox="0 0 32 32"
          style={{ fill: "#6c757d" }} // Bootstrap secondary color
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            fill="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            fill="#000000"
          />
        </svg>
        Upload file
        <input
          type="file"
          id="uploadFile1"
          className="d-none"
          onChange={handleFileUpload}
        />
        <p className="text-xs font-weight-medium text-muted mt-2">
          PNG, JPG, SVG, WEBP, and GIF are allowed.
        </p>
      </label>

      {/* Progress bar */}
      {uploading && <p>Uploading: {progress}%</p>}

      {/* Display the download URL */}
      {downloadURL && (
        <div className="mt-4">
          <p>File uploaded successfully!</p>
          <a
            href={downloadURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            View Uploaded File
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
