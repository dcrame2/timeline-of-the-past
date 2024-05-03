import Image from "next/image";

import { Container } from "./Container";
import avatarImage1 from "../images/avatars/avatar-1.png";
import avatarImage2 from "../images/avatars/avatar-2.png";
import avatarImage3 from "../images/avatars/avatar-3.png";
import avatarImage4 from "../images/avatars/avatar-4.png";
import avatarImage5 from "../images/avatars/avatar-5.png";

const testimonials = [
  [
    {
      content:
        "Timeline That is so easy to use and it’s so much fun to see my life laid out in front of me. I can’t wait to show my friends and family.",
      author: {
        name: "Sheryl Berge",
        role: "Mother of 3",
        image: avatarImage1,
      },
    },
    {
      content:
        "I’ve been using Timeline That for a few months now and I can’t believe how many new themes its created since I joined.",
      author: {
        name: "Amy Hahn",
        role: "Aunt",
        image: avatarImage4,
      },
    },
  ],
  [
    {
      content:
        "My daughter introduced me to this amazing Timeline app, and I'm hooked! I've been able to create beautiful timelines of our family's milestones with ease. It's such a wonderful way to preserve memories.",
      author: {
        name: "Leland Kiehn",
        role: "Proud Mom",
        image: avatarImage5,
      },
    },
    {
      content:
        "I stumbled upon this Timeline app while searching for a way to document my family history, and it's exceeded my expectations! I've been able to create detailed timelines that I can share with future generations.",
      author: {
        name: "Erin Powlowski",
        role: "Family Historian",
        image: avatarImage2,
      },
    },
  ],
  [
    {
      content:
        "This Timeline app has simplified my life! As a busy mom, I don't have much time to organize memories, but with this app, I can easily create timelines of my kids' milestones.",
      author: {
        name: "Peter Renolds",
        role: "Busy Mom",
        image: avatarImage3,
      },
    },
    {
      content:
        "I've been using this Timeline app to plan my upcoming family reunion, and it's been incredibly helpful! The custom themes make it look professional.",
      author: {
        name: "Jamie Anderson",
        role: "Event Planner",
        image: avatarImage4,
      },
    },
  ],
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Loved by family and friends
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            See what people are saying about Timeline That. We love our users
            and they love us back. Timeline That bringing you closer to the
            people around you.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
                {column.map((testimonial, testimonialIndex) => (
                  <li key={testimonialIndex}>
                    <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                      <blockquote className="relative">
                        <p className="text-lg tracking-tight text-slate-900">
                          {testimonial.content}
                        </p>
                      </blockquote>
                      <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                        <div>
                          <div className="font-display text-base text-slate-900">
                            {testimonial.author.name}
                          </div>
                          <div className="mt-1 text-sm text-slate-500">
                            {testimonial.author.role}
                          </div>
                        </div>
                        <div className="overflow-hidden rounded-full bg-slate-50">
                          <Image
                            className="h-14 w-14 object-cover"
                            src={testimonial.author.image}
                            alt=""
                            width={56}
                            height={56}
                          />
                        </div>
                      </figcaption>
                    </figure>
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
