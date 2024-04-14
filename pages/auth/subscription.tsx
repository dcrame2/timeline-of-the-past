import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import { useSession } from "next-auth/react";

function Subscription() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
  const [selectedProduct, setSelectedProduct] = React.useState("product2"); // State to hold the selected product
  console.log(selectedProduct, "SELECTED");

  const [products, setProducts] = React.useState([]);

  const handleProductChange = (event: any) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <Layout>
      <form action="/api/auth/stripe/checkout_sessions" method="POST">
        <section>
          <fieldset>
            <legend>Select a product:</legend>
            <label>
              <input
                type="radio"
                name="productId"
                value="product1"
                checked={selectedProduct === "product1"}
                onChange={handleProductChange}
              />
              One Timeline - $10
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="productId"
                value="product2"
                checked={selectedProduct === "product2"}
                onChange={handleProductChange}
              />
              Three Timeline - $25
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="productId"
                value="product3"
                checked={selectedProduct === "product3"}
                onChange={handleProductChange}
              />
              Five Timeline - $35
            </label>
          </fieldset>
          <input type="hidden" name="userEmail" value={userEmail} />
          <button type="submit" disabled={!selectedProduct}>
            Checkout
          </button>
        </section>
        <style jsx>
          {`
            section {
              background: #ffffff;
              display: flex;
              flex-direction: column;
              width: 400px;
              height: 150px;
              border-radius: 6px;
              justify-content: space-between;
            }
            button {
              height: 36px;
              background: #556cd6;
              border-radius: 4px;
              color: white;
              border: 0;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            button:hover {
              opacity: 0.8;
            }
          `}
        </style>
      </form>
    </Layout>
  );
}

export default Subscription;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession({ req: context.req });
  console.log(session, "session");
  if (!session) {
    return {
      redirect: { destination: "/auth/authenticate", permanent: false },
    };
  }

  return {
    props: { session },
  };
}
