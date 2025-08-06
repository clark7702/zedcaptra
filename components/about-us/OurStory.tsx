import Image from "next/image";
import React from "react";

// import aboutusimg from "../../assets/images/aboutus.png";

import { bankName, bankYear } from "../../constants/Settings";

function OurStory() {
  return (
    <div
      className="grid grid-cols-1 gap-10 lg:gap-20 md:grid-cols-6"
      id="ourstory"
    >
      <div className="space-y-6 md:col-span-3">
        <h1 className="text-3xl font-bold">Our Story</h1>

        <div className="space-y-4">
          <p>
            Founded in {bankYear} in the heart of Switzerland, {bankName} was
            established with a singular vision: to provide discreet, secure, and
            world-class offshore banking solutions to individuals and businesses
            across the globe.
          </p>

          <p>
            Rooted in the tradition of Swiss banking excellence, {bankName} has
            steadily grown over the past three decades, earning a reputation for
            confidentiality, stability, and precision. We specialize in private
            wealth management, corporate banking, and international investment
            services—tailored to the unique needs of a global clientele.
          </p>

          <p>
            Our journey began with a small group of financial experts committed
            to redefining offshore banking. Today, {bankName} stands as a
            trusted financial partner, serving clients in over 40 countries with
            bespoke financial strategies, cutting-edge digital tools, and
            unwavering customer support.
          </p>

          <p>
            As the world of finance evolves, so do we—embracing innovation while
            safeguarding the timeless principles of trust, integrity, and
            discretion. From legacy wealth preservation to secure international
            transactions, our solutions are built to withstand change and
            deliver long-term value.
          </p>
        </div>
      </div>

      <div className="md:col-span-3 object-contain">
        <Image
          className="rounded-lg"
          width={1060}
          height={950}
          src={
            "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg"
          }
          alt=""
        />
      </div>
    </div>
  );
}

export default OurStory;
