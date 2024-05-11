// pages/api/deleteImage.js

import cloudinary from "cloudinary";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { extractPublicId } from "cloudinary-build-url";
import { connectToDatabase } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the request method is POST
  if (req.method !== "DELETE") {
    // Retrieve the image URL to delete from the request body
    const { imageUrlToDelete, sessionUserEmail, selectedIndex } = req.body;
    console.log(
      imageUrlToDelete,
      sessionUserEmail,
      selectedIndex,
      "imageUrlToDelete from delete-single"
    );

    try {
      const client = await connectToDatabase();
      const db = client.db();

      // Find the user based on their email (or any unique identifier)
      const user = await db
        .collection("users")
        .findOne({ email: sessionUserEmail });

      //   console.log(user, "user from delete-single");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get the specific userData object based on the selectedIndex
      const specificUserData = user.userData[selectedIndex];

      console.log(specificUserData, "specificUserData from delete-single");

      // Find the index of the matching image URL in the uploadDatas.images array
      const imageIndexToDelete = specificUserData.uploadDatas.images.findIndex(
        (image: string) => image === imageUrlToDelete
      );

      // If the image URL exists in the array, remove it
      if (imageIndexToDelete !== -1) {
        specificUserData.uploadDatas.images.splice(imageIndexToDelete, 1);
      }

      console.log(specificUserData, "specificUserData from delete-single");

      // Update the user document in the database with the modified userData
      await db
        .collection("users")
        .updateOne(
          { _id: user._id },
          { $set: { [`userData.${selectedIndex}`]: specificUserData } }
        );

      res.status(200).json({ message: "Data updated successfully" });
      client.close();
    } catch (error) {
      console.error("Error updating data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Return an error response if the request method is not POST
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
