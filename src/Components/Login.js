import Template from "./Template"
import loginImg from "../Data/login.webp"

function Login() {
  return (
    <div className=" bg-richblack-900">
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={"https://cdn.dribbble.com/users/1897588/screenshots/3820679/login.gif"}
      formType="login"
    />
    </div>
  )
}

export default Login