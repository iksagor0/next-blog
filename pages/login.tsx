import { AiFillLock } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

export default function login() {
  return (
    <div className="grid place-content-center bg-[#2c3338] h-[100vh] text-white">
      <div className="container">
        <form action="#" method="#" className="login-form">
          <div className="form__field">
            <label for="login__username">
              <RxAvatar />
              <span className="hidden">Username</span>
            </label>
            <input
              type="email"
              name="username"
              className="form__input"
              placeholder="Email"
              required
            />
          </div>

          <div className="form__field">
            <label for="login__password">
              <AiFillLock />

              <span className="hidden">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="form__input"
              placeholder="Password"
              required
            />
          </div>
          <div className="form__field">
            <input type="submit" value="Sign In" />
          </div>
        </form>
        <p className="text--center">
          Not a member? <a href="/signup">Sign up now</a>
        </p>
      </div>
    </div>
  );
}
