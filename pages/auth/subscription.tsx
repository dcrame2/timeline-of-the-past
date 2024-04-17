import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import { useSession } from "next-auth/react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import styled from "styled-components";
import { MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";

const ExampleCardsContainer = styled.div`
  /* display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px; */
  margin-top: 20px;
  background-color: ${variables.lightGrey};
  margin: 24px;
  padding: 24px;
  z-index: 105;
  border-radius: 12px;
  display: flex;

  max-width: 1000px;
  position: relative;
  box-shadow: rgba(56, 59, 61, 0.2) 0px 2px 2px;
  @media ${MediaQueries.mobile} {
    padding: 24px 24px;
  }
  @media ${MediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${MediaQueries.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
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

  const handleProductChange = (event: any) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <Layout>
      <ExampleCardsContainer>
        <form action="/api/auth/stripe/checkout_sessions" method="POST">
          <RadioGroup
            label="Pricing"
            description="Selected plan can be changed at any time."
          >
            <Radio
              description="Build one timeline with lifetime access"
              name="productId"
              value="product1"
              checked={selectedProduct === "product1"}
              onChange={handleProductChange}
              classNames={{
                base: cn(
                  "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                  "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
              }}
            >
              One Timeline
            </Radio>
            <Radio
              description="Build three timelines with lifetime access"
              name="productId"
              value="product2"
              checked={selectedProduct === "product2"}
              onChange={handleProductChange}
              classNames={{
                base: cn(
                  "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                  "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
              }}
            >
              Three Timelines
            </Radio>
            <Radio
              description="Build one timeline with lifetime access"
              name="productId"
              value="product3"
              checked={selectedProduct === "product3"}
              onChange={handleProductChange}
              classNames={{
                base: cn(
                  "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                  "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
              }}
            >
              Five Timelines
            </Radio>
          </RadioGroup>
          <input type="hidden" name="userEmail" value={userEmail} />
          <button type="submit" disabled={!selectedProduct}>
            Checkout
          </button>
          {/* </section> */}
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
      </ExampleCardsContainer>
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
