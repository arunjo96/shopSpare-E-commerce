

import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const imageUploadUtil = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
      },

      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default imageUploadUtil;
