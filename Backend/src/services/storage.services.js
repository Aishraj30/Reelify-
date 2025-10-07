const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC,
  privateKey: process.env.IMAGEKIT_PRIVATE,
  urlEndpoint: process.env.URL_POINT,
});

const uploadFile = async (file, filename) => {
  try {
    const result = await imagekit.upload({
      file: file,       
      fileName: filename 
    });
    return result;
  } catch (error) {
    console.error("Error uploading file to ImageKit:", error);
    throw error;
  }
};

module.exports = uploadFile;
