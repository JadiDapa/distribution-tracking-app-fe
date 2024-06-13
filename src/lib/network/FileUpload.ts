import axios from "axios";

export default async function fileUpload(file?: string | File | Blob | null) {
  let fileUrl = file;
  if (fileUrl instanceof (File || Blob)) {
    const formData = new FormData();
    formData.append("file", fileUrl);
    formData.append("upload_preset", "ml_default");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dxxgiqzhc/upload",
      formData,
    );

    fileUrl = response.data.secure_url;
  }

  return fileUrl;
}
