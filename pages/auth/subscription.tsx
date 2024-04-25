import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import { useSession } from "next-auth/react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import styled from "styled-components";
import { MediaQueries } from "@/styles/Utilities";
import { pXSmall, pBase } from "@/styles/Type";
import { Button } from "@nextui-org/react";
import MainContainer from "@/components/reusable/mainContainer/Index";
import Title from "@/components/reusable/title/Index";

const CustomRadioBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SingleRadioBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function Subscription() {
  const [purchaseMessage, setPurchaseMessage] = React.useState<string>();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setPurchaseMessage(
        `${selectedProduct} "Order placed! You will receive an email confirmation."`
      );
    }

    if (query.get("canceled")) {
      setPurchaseMessage(
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
      <Title name="Pay only for what you need" />
      <MainContainer>
        <form action="/api/auth/stripe/checkout_sessions" method="POST">
          <RadioGroup
            // label="Findd the best pricing plan for you"
            description="Selected plan can be changed at any time."
          >
            <CustomRadioBox>
              <SingleRadioBox>
                <Radio
                  description="Build one timeline with lifetime access"
                  name="productId"
                  value="product1"
                  checked={selectedProduct === "product1"}
                  onChange={handleProductChange}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 pt-20 pb-20 pl-8 pr-8 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  One Timeline - $10
                </Radio>
                <p style={{ maxWidth: "300px" }}>
                  Build one timeline and change the theme to any theme you want
                </p>
              </SingleRadioBox>
              <SingleRadioBox>
                <Radio
                  description="Build three timelines with lifetime access"
                  name="productId"
                  value="product2"
                  checked={selectedProduct === "product2"}
                  onChange={handleProductChange}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 pt-20 pb-20 pl-8 pr-8 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  Three Timelines - $25
                </Radio>
                <p style={{ maxWidth: "300px" }}>
                  Build one timeline and change the theme to any theme you want
                </p>
              </SingleRadioBox>
              <SingleRadioBox>
                <Radio
                  description="Build one timeline with lifetime access"
                  name="productId"
                  value="product3"
                  checked={selectedProduct === "product3"}
                  onChange={handleProductChange}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 pt-20 pb-20 pl-8 pr-8 border-2 border-transparent",
                      "data-[selected=true]:border-primary"
                    ),
                  }}
                >
                  Five Timelines - $35
                </Radio>
                <p style={{ maxWidth: "300px" }}>
                  Build one timeline and change the theme to any theme you want
                </p>
              </SingleRadioBox>
            </CustomRadioBox>
          </RadioGroup>
          <input type="hidden" name="userEmail" value={userEmail} />
          <Button type="submit" disabled={!selectedProduct} color="primary">
            Checkout
          </Button>
          {purchaseMessage && <p>{purchaseMessage}</p>}
        </form>
      </MainContainer>
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
