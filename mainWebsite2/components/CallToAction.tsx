import { Button } from "@nextui-org/react";
import { Container } from "./Container";
import Link from "next/link";

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-lightOrange py-32"
    >
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Build gorgeous timelines
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Showcase your life's journey with Timeline That
          </p>
          <Button as={Link} href="/auth/authenticate" className="mt-6 bg-white">
            Get started today
          </Button>
        </div>
      </Container>
    </section>
  );
}
