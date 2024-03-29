async function uploadFilesToCloudinary(files: any) {
  const uploadedUrls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
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
        uploadedUrls.push(data.url);
      } else {
        console.error("Failed to upload file:", file.name);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return uploadedUrls;
}

export { uploadFilesToCloudinary };
