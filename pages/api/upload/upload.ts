// import { connectToDatabase } from "@/lib/db";
// import type { NextApiRequest, NextApiResponse } from "next";

import { NextApiRequest, NextApiResponse } from "next";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const formData = await req.formData();

//   const image = formData.get("image") as unknown as File;

//   return res.json({ msg: image }, { status: 200 });
// }

// export default handler;

import formidable, { IncomingForm } from "formidable";
import path from "path";
import fs from "fs";

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
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();

  //   console.log(form, "form");

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Error parsing form data" });
    }

    const file = files["image"]; // Assuming 'image' is the field name
    if (!file) {
      return res.status(400).json({ error: "No file received" });
    }

    console.log(file, "File");

    try {
      // Move the uploaded file to the desired directory
      const newPath = path.join(process.cwd(), "public/", file.name);
      fs.renameSync(file.path, newPath);
      console.log("File uploaded successfully:", newPath);

      // Respond with success message
      return res.status(201).json({ message: "File uploaded successfully" });
    } catch (error) {
      console.error("Error uploading file:", error);
      return res.status(500).json({ error: "Error uploading file" });
    }
  });
}
