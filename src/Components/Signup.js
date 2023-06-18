import signupImg from "../Data/signup.webp"
import Template from "./Template"

function Signup() {
  return (
    <div className=" bg-richblack-900">
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={"https://cdn.dribbble.com/users/1897588/screenshots/3820679/login.gif"}
      formType="signup"
    />
    </div>
  )
}

export default Signup