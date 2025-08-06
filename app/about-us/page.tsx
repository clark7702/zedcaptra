import { Box } from "@mui/material";
import TopBanner from "../../components/homepage/TopBanner";
import MobileNav from "../../components/homepage/MobileNav";
import DesktopNav from "../../components/homepage/DesktopNav";
import Footer from "../../components/homepage/Footer";
import Stats from "../../components/about-us/Stats";
import Partners from "../../components/about-us/Partners";
import OurStory from "../../components/about-us/OurStory";

function AboutUs() {
  return (
    <section>
      <div className="sticky top-0 z-40 bg-white">
        <div className="hidden md:block">
          <DesktopNav />
        </div>
        <div className="block md:hidden">
          <MobileNav />
        </div>
      </div>
      <TopBanner />

      <section className="space-y-14 lg:space-y-16">
        <div className=" py-8 md:py-14 space-y-14 md:space-y-16 lg:space-y-24">
          <div className="px-4 md:px-10 xl:px-40">
            <OurStory />
          </div>
          <Partners />
          <Stats />
        </div>

        <Footer />
      </section>
    </section>
  );
}

export default AboutUs;
