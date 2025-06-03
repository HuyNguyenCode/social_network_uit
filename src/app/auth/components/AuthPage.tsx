"use client";

import styles from "./auth.module.css";
import classNames from "classnames/bind";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/app/AppProvider";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { loginUser, registerUser } from "../../../redux/authSlice";
import { useUserStore } from "@/store/useUserStore"; // import store

import Cookies from "js-cookie";

const cx = classNames.bind(styles);

// Schema validation cho đăng nhập
const loginSchema = z.object({
  username: z.string().min(2, "name phải có ít nhất 2 ký tự"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

// Schema validation cho đăng ký
const signUpSchema = z
  .object({
    username: z.string().min(2, "name phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const AuthPage = () => {
  // State để kiểm soát form hiển thị
  const { setUser } = useUserStore(); // Lấy hàm setUser từ store

  const [isSignUp, setIsSignUp] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth as { loading: boolean; error: string | null });
  const { token } = useSelector((state: RootState) => state.auth);

  //   const { toast } = useToast()
  const router = useRouter();

  const { setSessionToken } = useAppContext();

  // Hook form cho đăng nhập
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Hook form cho đăng ký
  const {
    register: registerSignUp,
    handleSubmit: handleSignUpSubmit,
    formState: { errors: signUpErrors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  // Xử lý đăng nhập
  const onLogin = async (data: any) => {
    const result = await dispatch(loginUser(data));

    // Cập nhật thông tin người dùng vào Zustand
    const idPayload = result.payload as { user: { id: string } };
    const unPayload = result.payload as { user: { name: string } };
    setUser(idPayload.user.id, unPayload.user.name);
    Cookies.set("userName", unPayload.user.name, {
      expires: 1,
      path: "/", // đảm bảo cookie được gửi trong mọi request
    });

    if (loginUser.fulfilled.match(result)) {
      toast.success("✅ Login Successfully!");
      router.push("/");
    } else {
      const errorMessage = (result.payload as { message: string })?.message || "Lỗi không xác định!";
      toast.error(`❌ ${errorMessage}`);
    }
  };

  //Gọi api để lưu sessionToken vào cookie
  useEffect(() => {
    if (token) {
      fetch("api/auth/", {
        method: "POST",
        body: JSON.stringify({ token }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      setSessionToken(token);
    }
  }, [token]);

  // Xử lý đăng ký
  const onSignUp = async (data: any) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      toast.success("Register Successfully!");
      toast.success("Check your mail for verification!");
      router.push("/auth");
    } else {
      toast.error(((await result).payload as { message: string })?.message || "Signup error");
    }
  };

  return (
    <div className={cx("authContainer")}>
      <div className={cx("auth__bg")}></div>
      <div className={cx("login")}>
        <div className={cx("login__content")}>
          <div className={cx("login__img")}>
          </div>
          <div className={cx("login__forms")}>
            {/* Form đăng nhập */}

            <form
              onSubmit={handleLoginSubmit(onLogin)}
              className={cx("login__registre", {
                none: isSignUp,
                block: !isSignUp,
              })}
            >
              <h1 className={cx("login__title")}>Log In</h1>
              <div className={cx("login__box")}>
                <i className={cx("bx bx-user login__icon")}></i>
                <input {...registerLogin("username")} type="text" placeholder="Username" className={cx("login__input")} />
              </div>
              {loginErrors.username && <p className={cx("error-message")}>{loginErrors.username.message?.toString()}</p>}
              <div className={cx("login__box")}>
                <i className={cx("bx bx-lock-alt login__icon")}></i>
                <input {...registerLogin("password")} type="password" placeholder="Password" className={cx("login__input")} />
              </div>
              {loginErrors.password && <p className={cx("error-message")}>{loginErrors.password.message?.toString()}</p>}
              <a href="#" className={cx("login__forgot")}>
                Forgot password?
              </a>
              <button type="submit" className={cx("login__button")} disabled={loading}>
                {loading ? "Logging  up..." : "Login"}
              </button>
              <div>
                <span className={cx("login__account")}>Don't have an Account?</span>
                <span className={cx("login__signin")} onClick={() => setIsSignUp(true)}>
                  Sign Up
                </span>
              </div>
            </form>

            {/* Form đăng ký */}
            <form
              onSubmit={handleSignUpSubmit(onSignUp)}
              className={cx("login__create", {
                none: !isSignUp,
                block: isSignUp,
              })}
            >
              <h1 className={cx("login__title")}>Create Account</h1>
              <div className={cx("login__box")}>
                <i className={cx("bx bx-user login__icon")}></i>
                <input {...registerSignUp("username")} type="text" placeholder="name" className={cx("login__input")} />
              </div>
              {signUpErrors.name && <p className={cx("error-message")}>{signUpErrors.name.message?.toString()}</p>}

              <div className={cx("login__box")}>
                <i className={cx("bx bx-at login__icon")}></i>
                <input {...registerSignUp("email")} type="email" placeholder="Email" className={cx("login__input")} />
              </div>
              {signUpErrors.email && <p className={cx("error-message")}>{signUpErrors.email.message?.toString()}</p>}

              <div className={cx("login__box")}>
                <i className={cx("bx bx-lock-alt login__icon")}></i>
                <input {...registerSignUp("password")} type="password" placeholder="Password" className={cx("login__input")} />
              </div>
              {signUpErrors.password && <p className={cx("error-message")}>{signUpErrors.password.message?.toString()}</p>}

              <div className={cx("login__box")}>
                <i className={cx("bx bx-lock-alt login__icon")}></i>
                <input
                  {...registerSignUp("confirmPassword")}
                  type="password"
                  placeholder="Re-Password"
                  className={cx("login__input")}
                />
              </div>
              {signUpErrors.confirmPassword && (
                <p className={cx("error-message")}>{signUpErrors.confirmPassword.message?.toString()}</p>
              )}
              <button type="submit" className={cx("login__button")}>
                Sign Up
              </button>
              <div>
                <span className={cx("login__account")}>Already have an Account?</span>
                <span className={cx("login__signup")} onClick={() => setIsSignUp(false)}>
                  Sign In
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
