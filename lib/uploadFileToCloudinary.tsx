async function uploadFileToCloudinary(file: any) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "my-uploads");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dultp5szy/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.url;
    } else {
      console.error("Failed to upload file:", file.name);
      return null;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

export { uploadFileToCloudinary };
