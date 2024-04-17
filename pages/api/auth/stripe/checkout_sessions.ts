const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      // const { productId, userEmail } = req.body; // Assuming productId is sent in the request body

      // Create a new object with the desired key-value pair and copy over other properties
      const newData = {
        ...req.body, // Copy over other properties
        productId: req.body["react-aria-:RemH5:"], // Create new key-value pair
      };

      // Check if the property exists before attempting to delete it
      if ("react-aria-:RemH5:" in newData) {
        delete newData["react-aria-:RemH5:"];
      }
      const { productId, userEmail } = newData;

      console.log(newData);

      console.log(req.body, "REQ BODY");
      console.log(userEmail, "userEmail");

      // Retrieve product price based on the selected productId
      let priceId = "";
      switch (productId) {
        case "product1":
          priceId = "price_1P5DoHFfppxn1GWhROv4Asyp";
          break;
        case "product2":
          priceId = "price_1P5Gu1Ffppxn1GWhfEqCLmJ3";
          break;
        case "product3":
          priceId = "price_1P5GuOFfppxn1GWhrncnOEHs";
          break;
        default:
          throw new Error("Invalid product selection");
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        metadata: {
          email: userEmail,
          selectedProduct: priceId,
        },
        mode: "payment",
        success_url: `${req.headers.origin}/auth/subscription?success=true`,
        cancel_url: `${req.headers.origin}/auth/subscription?canceled=true`,

        // automatic_tax: { enabled: false },
      });

      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
