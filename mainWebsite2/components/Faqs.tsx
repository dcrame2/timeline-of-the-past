import Image from "next/image";

import { Container } from "./Container";
import backgroundImage from "../images/background-faqs.jpg";

const faqs = [
  [
    {
      question: "Can I customize the appearance of my timeline?",
      answer:
        "Yes, absolutely! Our Timeline app offers a variety of custom themes that you can choose from to personalize the look and feel of your timeline.",
    },
    {
      question: "Can I edit my timeline at any time?",
      answer:
        "Yes, timelines are fully editable, allowing you to add, remove, or modify events as needed. You can update your timeline at any time to reflect milestones or new information.",
    },
    {
      question: "How long is my timeline available for?",
      answer:
        "Your timelines are available for life. You can access your timelines at any time and make changes as needed.",
    },
  ],
  [
    {
      question: "Is there a limit to the number of timelines I can create?",
      answer:
        "Yes, we offer one free timeline and then you must purchase more timelines with a one timeline payment.",
    },
    {
      question: "Is my data secure on your platform?",
      answer:
        "We take the security and privacy of your data very seriously. Our platform employs industry-standard security measures to ensure that your information remains safe and confidential.",
    },
    {
      question: "How can I share my timeline with others?",
      answer:
        "Sharing your timeline is easy! You can either share a link to your timeline which will be generated upon saving your timeline.",
    },
  ],
  [
    {
      question: "Can I collaborate with others on creating a timeline?",
      answer:
        "Currently, our platform doesn't support real-time collaboration, but you can share your timeline with others, allowing them to view it.",
    },
    {
      question: "How often are updates and new features released?",
      answer:
        "We strive to continuously improve our platform based on user feedback. Updates and new features are released regularly to enhance your experience with our Timeline app.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide comprehensive customer support to assist you with any questions or issues you may encounter while using Timeline That. You can reach out to us via email or the in app feedback form.",
    },
  ],
];

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      {/* <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      /> */}
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            If you can’t find what you’re looking for, email our support team or
            fill out the in app feedback form.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
