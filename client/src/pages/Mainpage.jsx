import React from "react";
import MainHeader from "./lading/MainHedaer";
import Visitros from "./lading/Visitros";
import Crmrocks from "./lading/Crmrocks";
import Testimonials from "./lading/Testnominal";
import CallToAction from "./lading/Call";
import FAQ from "./lading/Faq";
import BlogResources from "./lading/blog";
import LFooter from "./lading/footer";
import Features from "./lading/feruts";
import AboutUs from "./lading/AboutUS";
import OurInfo from "./lading/OurInfo";

const Mainpage = () => {
  return (
    <div>
      <MainHeader />
      <AboutUs />
      <Visitros />
      <OurInfo />
      <Features />
      {/* <Crmrocks /> */}
      <Testimonials />
      {/* <CallToAction /> */}
      <FAQ />
      <BlogResources />
      <LFooter />
    </div>
  );
};

export default Mainpage;
