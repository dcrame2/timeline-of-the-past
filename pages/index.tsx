import Head from "next/head";
import { Testimonials } from "@/mainWebsite2/components/Testimonials";
import { Hero } from "@/mainWebsite2/components/Hero";
import { Header } from "@/mainWebsite2/components/Header";
import { PrimaryFeatures } from "@/mainWebsite2/components/PrimaryFeatures";
import { CallToAction } from "@/mainWebsite2/components/CallToAction";
import { Faqs } from "@/mainWebsite2/components/Faqs";
import { Footer } from "@/mainWebsite2/components/Footer";
import { Pricing } from "@/mainWebsite2/components/Pricing";

export default function Home() {
  return (
    <>
      <Head>
        <title>Timeline That</title>
        <meta
          name="description"
          content="Timeline That allows users to create timelines for themselves, their child or anything related to time"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        {/* <SecondaryFeatures /> */}
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
