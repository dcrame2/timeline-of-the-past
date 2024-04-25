import React, { useEffect } from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Layout from "@/components/layout/dashboard/Index";
import { useSession } from "next-auth/react";
import { RadioGroup, Radio, cn, Divider } from "@nextui-org/react";
import styled from "styled-components";
import { MediaQueries } from "@/styles/Utilities";
import { pXSmall, pBase } from "@/styles/Type";
import { Button } from "@nextui-org/react";
import MainContainer from "@/components/reusable/mainContainer/Index";
import Title from "@/components/reusable/title/Index";
import BackButton from "@/components/reusable/backButton/Index";
import CreateButton from "@/components/reusable/createButton/Index";
import { variables } from "@/styles/Variables";
import StripeIcon from "@/components/reusable/svg/stripeIcon/Index";

const CustomRadioBox = styled.div`
  display: flex;
  gap: 12px;

  @media ${MediaQueries.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SingleRadioBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .ml-2 {
    margin-left: 0px;
  }

  .bg-primary {
    background-color: ${variables.lightOrange};
  }
  .group[data-selected="true"] .group-data-\[selected\=true\]\:border-primary {
    border-color: ${variables.lightOrange};
  }

  .group[data-selected="true"] {
    background-color: ${variables.lightGrey};
  }
`;

const CheckoutButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 1000px;
  padding-bottom: 4px;
  @media ${MediaQueries.mobile} {
    gap: 16px;
  }
`;

const RadioText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  .price {
    font-size: 48px;
    font-weight: 600;
    line-height: 1.5rem;
    span {
      font-size: 12px;
      font-weight: 400;
    }
  }
  ul {
    margin: 20px 20px 20px 16px;
    ${pXSmall}
    list-style-type: square;
    display: flex;
    flex-direction: column;
    gap: 16px;
    li {
      color: #636262;
    }
  }
`;

const ButtonInfo = styled.div`
  display: flex;
  justify-content: space-between;
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
  const [selectedProduct, setSelectedProduct] = React.useState(); // State to hold the selected product
  console.log(selectedProduct, "SELECTED");

  const handleProductChange = (event: any) => {
    setSelectedProduct(event.target.value);
  };

  const handleSubmit = () => {
    const form = document.getElementById("myForm") as HTMLFormElement;
    if (form) {
      form.submit();
    }
  };

  return (
    <Layout>
      <HeadingContainer>
        <Title name="Pay only for what you need" />
        <ButtonInfo>
          <BackButton />
          <Button
            type="submit"
            disabled={!selectedProduct}
            style={{
              backgroundColor: `${variables.lightOrange}`,
              color: `${variables.white}`,
            }}
            endContent={<StripeIcon color={`${variables.white}`} />}
            onClick={handleSubmit}
          >
            Checkout
          </Button>
        </ButtonInfo>
      </HeadingContainer>
      <MainContainer>
        <Form
          id="myForm"
          action="/api/auth/stripe/checkout_sessions"
          method="POST"
        >
          <RadioGroup>
            <CustomRadioBox>
              <SingleRadioBox>
                <Radio
                  name="productId"
                  value="product1"
                  checked={selectedProduct === "product1"}
                  onChange={handleProductChange}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-col max-w-[300px] cursor-pointer rounded-lg gap-4 pt-10 pb-10 border-2 border-transparent",
                      "data-[selected=true]:border-lightBlue"
                    ),
                  }}
                >
                  <RadioText>
                    <span>One Timeline</span>
                    <p className="price">$10</p>
                    <ul style={{ maxWidth: "300px" }}>
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                      <Divider />
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                      <Divider />
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                    </ul>
                  </RadioText>
                </Radio>
              </SingleRadioBox>
              <SingleRadioBox>
                <Radio
                  name="productId"
                  value="product2"
                  checked={selectedProduct === "product2"}
                  onChange={handleProductChange}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-col max-w-[300px] cursor-pointer rounded-lg gap-4 pt-10 pb-10  border-2 border-transparent",
                      "data-[selected=true]:border-lightBlue"
                    ),
                  }}
                >
                  <RadioText>
                    <span>Three Timelines</span>
                    <p className="price">$25</p>
                    <ul style={{ maxWidth: "300px" }}>
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                      <Divider />
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                      <Divider />
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                    </ul>
                  </RadioText>
                </Radio>
              </SingleRadioBox>
              <SingleRadioBox>
                <Radio
                  name="productId"
                  value="product3"
                  checked={selectedProduct === "product3"}
                  onChange={handleProductChange}
                  classNames={{
                    base: cn(
                      "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                      "flex-col max-w-[300px] cursor-pointer rounded-lg gap-4 pt-10 pb-10  border-2 border-transparent",
                      "data-[selected=true]:border-lightBlue"
                    ),
                  }}
                >
                  <RadioText>
                    <span>Five Timelines</span>
                    <p className="price">$35</p>
                    <ul style={{ maxWidth: "300px" }}>
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                      <Divider />
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                      <Divider />
                      <li>
                        Build one timeline and change the theme to any theme you
                        want
                      </li>
                    </ul>
                  </RadioText>
                </Radio>
              </SingleRadioBox>
            </CustomRadioBox>
          </RadioGroup>
          <CheckoutButtonContainer>
            <input type="hidden" name="userEmail" value={userEmail} />
          </CheckoutButtonContainer>
          {purchaseMessage && <p>{purchaseMessage}</p>}
        </Form>
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
