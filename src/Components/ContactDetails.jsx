import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@mbmc.gov.in",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office.",
    details:
      "Mira Bhaindar Municipal Corporation Indira Gandhi Bhavan, Chhatrapati Shivaji Maharaj Marg, Bhaindar West, Mira Bhaindar , Thane, Maharashtra 401101",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - sat From 9:45am to 6:15pm",
    details: "1800 224 849",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col sm: mt-40 gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
            key={i}
          >
            <div className="flex flex-row items-center gap-3">
              <Icon size={25} />
              <h1 className="text-lg font-semibold text-richblack-5">
                {ele?.heading}
              </h1>
            </div>
            <p className="font-medium">{ele?.description}</p>
            <p className="font-semibold">{ele?.details}</p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails