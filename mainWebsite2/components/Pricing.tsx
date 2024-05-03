import clsx from "clsx";

import { Button, Link } from "@nextui-org/react";
import { Container } from "./Container";
import { CheckCircleIcon } from "@heroicons/react/16/solid";

const tiers = [
  {
    name: "One Timeline",
    id: "tier-freelancer",
    href: "/auth/subscription",
    price: { monthly: "$10" },
    // description: "The essentials to provide your best work for clients.",
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
    href: "/auth/subscription",
    price: { monthly: "$25" },
    // description: "A plan that scales with your rapidly growing business.",
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
    href: "/auth/subscription",
    price: { monthly: "$35" },
    // description: "Dedicated support and infrastructure for your company.",
    features: [
      "Adds the ability to create five additional timelines",
      "Change the theme to any allowed themes",
      "Access for life to your created timelines",
    ],
    mostPopular: false,
    product: "product3",
  },
];

export function Pricing() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for&nbsp;you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
          Our pricing is simple and transparent. One time fees for all
          timelines. No hidden fees.
        </p>
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
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

                <Button
                  as={Link}
                  href={tier.href}
                  aria-describedby={tier.id}
                  className="w-full mt-8 bg-lightOrange text-white"
                >
                  Buy plan
                </Button>
                {/* <p className="mt-10 text-sm font-semibold leading-6 text-gray-900">
                  {tier.description}
                </p> */}
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
    </div>
  );
}
