// pages/api/deleteImage.js
import cloudinary from "cloudinary";
import type { NextApiRequest, NextApiResponse } from "next";
import { extractPublicId } from "cloudinary-build-url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is POST
  if (req.method !== "DELETE") {
    // Retrieve the image URL to delete from the request body
    const { person } = req.body;

    // Extract all images from uploadDatas
    const allImages = Object.values(person.uploadDatas)
      .map((data: any) => data.images)
      .filter(Array.isArray)
      .flat();
    console.log(person, "person");
    console.log(allImages, "allImages");

    const publicIds = allImages.map((imageUrl: string) =>
      extractPublicId(imageUrl)
    );

    try {
      cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const result = await Promise.all(
        publicIds.map(async (publicId) => {
          // Delete the image from Cloudinary
          return await cloudinary.v2.uploader.destroy(`${publicId}`);
        })
      );

      // Return the result of the deletion operation
      res.status(200).json({ success: true, result });
    } catch (error) {
      // Handle any errors that occur during the deletion process
      console.error("Error deleting image from Cloudinary:", error);
      res.status(500).json({ success: false, error: "Failed to delete image" });
    }
  } else {
    // Return an error response if the request method is not POST
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
