import React from "react";
import { BadgeCheck } from "lucide-react";

const OurInfo = () => {
  return (
    <section className="bg-white py-16 px-6 sm:px-10 lg:px-20 border-t">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Who We Are & What We Do
        </h2>

        <p className="text-lg text-gray-600 mb-4">
          We are a passionate{" "}
          <span className="font-semibold">IT Solutions Company</span> dedicated
          to building scalable, modern digital products that solve real-world
          problems.
        </p>

        <p className="text-md text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
          <strong>Nexus Technical Solutions</strong> is committed to delivering
          permanent solutions for your technical needs. We support businesses by
          ensuring their customers receive excellent service, technical
          reliability, and trusted experiences.
        </p>

        <div className="flex items-center justify-center mb-8">
          <div className="bg-gray-50 rounded-xl shadow-md max-w-md w-full px-8 py-8">
            <img
              src="/images/Nexus.jpg"
              alt="Nexus Company Logo"
              className="mx-auto h-36 w-auto object-contain"
            />
          </div>
        </div>

        <p className="text-sm text-gray-500 max-w-md mx-auto">
          From technical development to daily CRM customer support, Nexus
          ensures seamless experiences that help businesses grow with
          confidence.
        </p>
      </div>
    </section>
  );
};

export default OurInfo;
