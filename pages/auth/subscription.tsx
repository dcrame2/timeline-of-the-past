import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import { useSession } from "next-auth/react";
import { RadioGroup, Radio, cn } from "@nextui-org/react";
import styled from "styled-components";
import { MediaQueries } from "@/styles/Utilities";
import { variables } from "@/styles/Variables";
import { h1styles, h3styles, pLarge, pXSmall, pBase } from "@/styles/Type";
import { Button } from "@nextui-org/react";
const ExampleCardsContainer = styled.div`
  margin-top: 20px;
  background-color: ${variables.lightGrey};

  padding: 24px;
  z-index: 105;
  border-radius: 12px;
  display: flex;
  flex-direction: column;

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
  h1 {
    ${pLarge}
  }
  p {
    ${pXSmall}
  }
`;

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

const TextContainer = styled.div`
  gap: 20px;
  @media ${MediaQueries.tablet} {
    gap: 12px;
  }
  @media ${MediaQueries.mobile} {
    gap: 8px;
  }
  h1 {
    ${pBase}
    margin: 24px 0 12px 24px;
  }
  p {
    ${pXSmall}
    margin-left: 24px;
    max-width: 1000px;
  }
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
      <TextContainer>
        <h1>Pay only for what you need</h1>
        <p>Join many and create timelines for your family</p>
      </TextContainer>
      <ExampleCardsContainer>
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
