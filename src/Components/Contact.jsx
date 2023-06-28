
import React from "react";

// import Footer from "./components/About"
import ContactDetails from "./ContactDetails.jsx"
import ContactForm from "./ContactForm.jsx"



const Contact = () => {

  
  return (
    <div className=" bg-richblack-900">
      <div className="mx-auto  flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className=" sm:block lg:w-[40%] hidden ">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
     
      {/* <Footer /> */}
    </div>
  )
}

export default Contact