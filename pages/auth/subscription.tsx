import React, { useState } from "react";
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

import CreateButton from "@/components/reusable/createButton/Index";
import { variables } from "@/styles/Variables";
import StripeIcon from "@/components/reusable/svg/stripeIcon/Index";
import SectionHeader from "@/components/reusable/sectionHeader/Index";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Subscription() {
  const [purchaseMessage, setPurchaseMessage] = React.useState<string>();
  const [isLoading, setIsLoading] = useState(false);
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
  const [selectedProduct, setSelectedProduct] = React.useState<string>(); // State to hold the selected product
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  console.log(selectedProduct, "SELECTED");

  const handleProductChange = (product: string) => {
    setIsLoading(true);
    setSelectedProduct(product);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const form = document.getElementById("myForm") as HTMLFormElement;
    if (form) {
      form.submit();
    }
  };

  const tiers = [
    {
      name: "One Timeline",
      id: "tier-freelancer",
      href: "#",
      price: { monthly: "$10" },
      description: "The essentials to provide your best work for clients.",
      features: [
        "Adds the ability to create one timeline",
        "Change the theme to any allowed themes",
        "Access for life to your created timeline",
      ],
      mostPopular: false,
      product: "product1",
    },
    {
      name: "Three Timelines",
      id: "tier-startup",
      href: "#",
      price: { monthly: "$25" },
      description: "A plan that scales with your rapidly growing business.",
      features: [
        "Adds the ability to create three additional timelines",
        "Change the theme to any allowed themes",
        "Access for life to your created timelines",
      ],
      mostPopular: true,
      product: "product2",
    },
    {
      name: "Five Timelines",
      id: "tier-enterprise",
      href: "#",
      price: { monthly: "$35" },
      description: "Dedicated support and infrastructure for your company.",
      features: [
        "Adds the ability to create five additional timelines",
        "Change the theme to any allowed themes",
        "Access for life to your created timelines",
      ],
      mostPopular: false,
      product: "product3",
    },
  ];

  return (
    <Layout>
      <SectionHeader
        heading="Choose the right plan for you"
        // button={<CreateButton />}
        backButton={true}
      />

      {/* <MainContainer> */}
      <Form
        id="myForm"
        action="/api/auth/stripe/checkout_sessions"
        method="POST"
      >
        <div className="bg-lightGray py-8 sm:py-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* <div className="mt-20 flow-root"> */}
            <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
              {tiers.map((tier) => (
                <div key={tier.id} className="pt-16 lg:pt-0  lg:px-8  xl:px-14">
                  <h3
                    id={tier.id}
                    className="text-base font-semibold leading-7 text-gray-900"
                  >
                    {tier.name}
                  </h3>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {tier.price.monthly}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      one time
                    </span>
                  </p>

                  {!isLoading ? (
                    <Button
                      value={tier.product}
                      name="productId"
                      type="submit"
                      onSubmit={() => {
                        handleProductChange(tier.product);
                      }}
                      href={tier.href}
                      aria-describedby={tier.id}
                      className="mt-5 bg-lightOrange text-white w-full"
                      endContent={<StripeIcon color={`${variables.white}`} />}
                    >
                      Buy this plan
                    </Button>
                  ) : (
                    <Button
                      style={{
                        backgroundColor: `${variables.lightOrange}`,
                        color: `${variables.white}`,
                      }}
                      isLoading
                      disabled
                    >
                      Loading
                    </Button>
                  )}
                  <ul
                    role="list"
                    className="mt-6 space-y-3 text-sm leading-6 text-gray-600"
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckCircleIcon
                          className="h-6 w-5 flex-none text-lightOrange "
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* <div className="mx-auto max-w-7xl">
          <div className=" flex justify-center">
            <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <input type="hidden" name="userEmail" value={userEmail} />
              {tiers.map((tier) => (
                <>
                  <div
                    key={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? "ring-2 ring-lightBlue"
                        : "ring-1 ring-lightBlue",
                      "rounded-3xl p-8 xl:p-10"
                    )}
                  >
                    <div className="flex  items-center justify-between gap-x-4">
                      <h3
                        id={tier.id}
                        className={classNames(
                          tier.mostPopular ? "text-black" : "text-black",
                          "text-lg font-semibold leading-8"
                        )}
                      >
                        {tier.name}
                      </h3>
                      {tier.mostPopular ? (
                        <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-black">
                          Most popular
                        </p>
                      ) : null}
                    </div>

                    <p className="mt-6 flex items-baseline gap-x-1">
                      <span className="text-4xl font-bold tracking-tight text-black">
                        {tier.price.monthly}
                      </span>
                      <span className="text-sm font-semibold leading-6 text-black">
                        one time
                      </span>
                    </p>
                    {!isLoading ? (
                      <Button
                        value={tier.product}
                        name="productId"
                        type="submit"
                        onSubmit={() => {
                          handleProductChange(tier.product);
                        }}
                        href={tier.href}
                        aria-describedby={tier.id}
                        style={
                          tier.mostPopular
                            ? {
                                backgroundColor: `${variables.lightOrange}`,
                                color: `${variables.white}`,
                                width: "100%",
                                marginTop: "20px",
                              }
                            : {
                                backgroundColor: `${variables.transparent}`,
                                border: `1px solid ${variables.lightOrange}`,
                                color: `${variables.black}`,
                                width: "100%",
                                marginTop: "20px",
                              }
                        }
                        endContent={<StripeIcon color={`${variables.white}`} />}
                      >
                        Buy this plan
                      </Button>
                    ) : (
                      <Button
                        style={{
                          backgroundColor: `${variables.lightOrange}`,
                          color: `${variables.white}`,
                        }}
                        isLoading
                        disabled
                      >
                        Loading
                      </Button>
                    )}

                    <ul
                      role="list"
                      className="mt-8 space-y-3 text-sm leading-6 text-black xl:mt-10"
                    >
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon
                            className="h-6 w-5 flex-none text-indigo-600"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div> */}
      </Form>
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
