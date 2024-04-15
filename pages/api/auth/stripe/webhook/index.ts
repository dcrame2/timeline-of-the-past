import Stripe from "stripe";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import addTimlineCreditsToUser from "@/lib/addTimelineCreditsToUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const signature = req.headers["stripe-signature"] as string;

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      console.log(event, "EVENTTTT");

      if (event.type === "checkout.session.completed") {
        const { email, selectedProduct }: any = event.data.object.metadata;
        console.log(email, "Email", selectedProduct, "YESSSSSSSSIR");
        addTimlineCreditsToUser(email, selectedProduct);
      }
    } catch (err: any) {
      // On error, log and return the error message.
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // switch (event.type) {
    //   case "payment_intent.succeeded": {
    //     const paymentIntent = event.data.object;
    //     console.log(`PaymentIntent status: ${paymentIntent.status}`);
    //     break;
    //   }
    //   case "payment_intent.payment_failed": {
    //     const paymentIntent = event.data.object;
    //     console.log(
    //       `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
    //     );
    //     break;
    //   }
    //   case "charge.succeeded": {
    //     const charge = event.data.object;
    //     console.log(`Charge id: ${charge.id}`);
    //     break;
    //   }
    //   default: {
    //     console.warn(`Unhandled event type: ${event.type}`);
    //     break;
    //   }
    // }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
