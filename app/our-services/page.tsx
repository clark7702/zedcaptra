import TopBanner from "../../components/homepage/TopBanner";
import DesktopNav from "../../components/homepage/DesktopNav";
import MobileNav from "../../components/homepage/MobileNav";
import Services from "../../components/our-services/OurServices";
import Footer from "../../components/homepage/Footer";

function OurServices() {
  return (
    <section>
      <div className='sticky top-0 z-40 bg-white'>
        <div className='hidden md:block'>
          <DesktopNav />
        </div>
        <div className='block md:hidden'>
          <MobileNav />
        </div>
      </div>
      <TopBanner />

      <section className='space-y-14 lg:space-y-16 '>
        <div className='min-h-[60vh] py-8 md:py-10 space-y-14 md:space-y-16 lg:space-y-24'>
          <div className='px-4 md:px-10 xl:px-40'>
            <Services />
          </div>
        </div>

        <Footer />
      </section>
    </section>
  );
}

export default OurServices;
