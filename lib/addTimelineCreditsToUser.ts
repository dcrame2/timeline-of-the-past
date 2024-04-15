import { ObjectId } from "mongodb";
import { connectToDatabase } from "./db";

export default async function addTimlineCreditsToUser(
  userEmail: string,
  selectedProduct: string
) {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    let creditsToAddCount = 0;

    if (selectedProduct === "price_1P5DoHFfppxn1GWhROv4Asyp") {
      creditsToAddCount += 1;
    } else if (selectedProduct === "price_1P5Gu1Ffppxn1GWhfEqCLmJ3") {
      creditsToAddCount += 3;
    } else if (selectedProduct === "price_1P5GuOFfppxn1GWhrncnOEHs") {
      creditsToAddCount += 5;
    } else {
      creditsToAddCount = 0;
    }

    const user = await db.collection("users").findOne({ email: userEmail });

    if (!user) {
      return;
      //   res.status(404).json({ message: "User not found" });
    }

    await db
      .collection("users")
      .updateOne(
        { _id: user._id },
        { $inc: { remainingTimelines: +creditsToAddCount } }
      );

    client.close();
    return;
  } catch (error) {
    console.error("An error occurred while updating the user: ", error);
    return;
  } finally {
  }
}
