// import { connectToDatabase } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

// import { NextApiRequest, NextApiResponse } from "next";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const formData = await req.formData();

//   const image = formData.get("image") as unknown as File;

//   return res.json({ msg: image }, { status: 200 });
// }

// export default handler;

// import formidable, { IncomingForm } from "formidable";
// import path from "path";
// import fs from "fs";

// import { NextRequest, NextResponse } from "next/server";

// const POST = async (req: NextRequest) => {
//   console.log(form, "FORMSKI");
//   //   const formData = req.body;
//   console.log(req.body, "RACET");
//   //   const image = formData.get("image") as unknown as File;

//   //   console.log(image, "IMAGE");

//   //   return NextResponse.json(
//   //     { msg: image },
//   //     {
//   //       status: 200,
//   //     }
//   //   );
// };

// export default POST;
// Import necessary modules
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const form = new IncomingForm();

//   console.log(form, "form");

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       console.error("Error parsing form data:", err);
//       return res.status(500).json({ error: "Error parsing form data" });
//     }

//     const file = files["image"];
//     if (!file) {
//       return res.status(400).json({ error: "No file received" });
//     }

//     console.log(file, "File");

//     try {
//       // Move the uploaded file to the desired directory
//       const newPath = path.join(process.cwd(), "public/", file.name);
//       fs.renameSync(file.path, newPath);
//       console.log("File uploaded successfully:", newPath);

//       // Respond with success message
//       return res.status(201).json({ message: "File uploaded successfully" });
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       return res.status(500).json({ error: "Error uploading file" });
//     }
//   });
// }

// Import necessary modules
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

// Define the POST handler for the file upload
const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body, "GET REQ");
  // Parse the incoming form data
  const formData = await req.body;

  console.log(formData, "FORM DATA");

  // Get the file from the form data
  const file = formData.get("file");

  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = file.name.replaceAll(" ", "_");
  console.log(filename);

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(
      path.join(process.cwd(), "public/assets/" + filename),
      buffer
    );

    // Return a JSON response with a success message and a 201 status code
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};

export default POST;
