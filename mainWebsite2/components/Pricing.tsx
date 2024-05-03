import clsx from "clsx";

import { Button } from "@nextui-org/react";
import { Container } from "./Container";

function CheckIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      aria-hidden="true"
      className={clsx(
        "h-6 w-6 flex-none fill-current stroke-current",
        className
      )}
      {...props}
    >
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        strokeWidth={0}
      />
      <circle
        cx={12}
        cy={12}
        r={8.25}
        fill="none"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Plan({
  name,
  price,
  description,
  href,
  features,
  featured = false,
}: {
  name: string;
  price: string;
  description?: string;
  href: string;
  features: Array<string>;
  featured?: boolean;
}) {
  return (
    <section
      className={clsx(
        "flex flex-col rounded-3xl px-6 sm:px-8",
        featured
          ? "order-first bg-lightBlue py-8 lg:order-none"
          : "lg:py-8 bg-darkerLightGrey"
      )}
    >
      <h3
        className={`{mt-5 font-display text-lg ${
          featured ? "text-white" : "text-lightBlue"
        }`}
      >
        {name}
      </h3>
      <p
        className={clsx(
          "mt-2 text-base",
          featured ? "text-white" : "text-lightBlue"
        )}
      >
        {description}
      </p>
      <p
        className={` order-first font-display text-5xl font-light tracking-tight ${
          featured ? "text-white" : "text-lightBlue"
        }`}
      >
        {price}
      </p>
      <ul
        role="list"
        className={clsx(
          "order-last mt-10 flex flex-col gap-y-3 text-sm",
          featured ? "text-white" : "text-lightBlue"
        )}
      >
        {features.map((feature) => (
          <li key={feature} className="flex">
            <CheckIcon className={featured ? "fill-white" : "text-white"} />
            <span className="ml-4">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        href={href}
        className={`mt-8 ${
          featured
            ? "text-lightBlue bg-white"
            : "text-lightBlue bg-white ring-lightBlue ring-2 hover:ring-lightOrange"
        }`}
        aria-label={`Get started with the ${name} plan for ${price}`}
      >
        Get started
      </Button>
    </section>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-label="Pricing"
      className="bg-lightGrey py-20 sm:py-32"
    >
      <Container>
        <div className="md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-lightBlue sm:text-4xl">
            <span className="relative whitespace-nowrap">
              <span className="relative text-lightOrange">Simple pricing,</span>
            </span>{" "}
            for everyone.
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Our pricing is simple and transparent. One time fees for all
            timelines. No hidden fees.
          </p>
        </div>
        <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8 bg-lightGrey ">
          <Plan
            name="One Timeline"
            price="$10"
            // description="Good for one additional timeline."
            href="/auth/authenticate"
            features={[
              "Adds the ability to create one timeline",
              "Change the theme to any allowed themes",
              "Access for life to your created timeline",
            ]}
          />
          <Plan
            featured
            name="Three Timelines"
            price="$25"
            // description="Perfect for building timelines for your family."
            href="/auth/authenticate"
            features={[
              "Adds the ability to create three additional timelines",
              "Change the theme to any allowed themes",
              "Access for life to your created timelines",
            ]}
          />
          <Plan
            name="Five Timelines"
            price="$35"
            // description="For your building timelines for your friends and family"
            href="/auth/authenticate"
            features={[
              "Adds the ability to create five additional timelines",
              "Change the theme to any allowed themes",
              "Access for life to your created timelines",
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
