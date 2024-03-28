// pages/api/deleteImage.js

import cloudinary from "cloudinary";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { extractPublicId } from "cloudinary-build-url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is POST
  if (req.method !== "DELETE") {
    // Retrieve the image URL to delete from the request body
    const { imageUrlToDelete } = req.body;
    console.log(imageUrlToDelete, "imageUrlToDelete");

    const publicId = extractPublicId(imageUrlToDelete);

    console.log(publicId, "publicId");

    try {
      // Delete the image from Cloudinary
      const result = await cloudinary.v2.uploader.destroy(`${publicId}`, {
        api_secret: process.env.CLOUDINARY_API_SECRET,
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
      });

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
