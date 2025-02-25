"use client";

import styles from "./auth.module.css";
import classNames from "classnames/bind";
import { useToast } from "@/hooks/use-toast";
// import authApiRequest from '@/apiRequests/auth'
// import { useToast } from '@/components/ui/use-toast'
import { useRouter } from "next/navigation";
// import { handleErrorApi } from '@/lib/utils'
import { useState } from "react";
import envConfig from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppContext } from "@/app/AppProvider";
// import { useAppContext } from '@/app/app-provider'
import { z } from "zod";
const cx = classNames.bind(styles);

// Schema validation cho đăng nhập
const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không được để trống"),
});

// Schema validation cho đăng ký
const signUpSchema = z
  .object({
    username: z.string().min(2, "Username phải có ít nhất 2 ký tự"),
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
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const { setUser } = useAppContext()
  //   const { toast } = useToast()
  const router = useRouter();

  const { toast } = useToast();
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
    console.log("Dữ liệu đăng nhập:", data);
    try {
      try {
        const response = await fetch("http://localhost:4000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
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
        toast({
          description: response.payload.message,
        });
        const resultFromNextServer = await fetch("api/auth/", {
          method: "POST",
          body: JSON.stringify(response),
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
        setSessionToken(resultFromNextServer.payload.data.token);
      } catch (error: any) {
        console.log(error);

        const errors = error.payload.errors as {
          field: string;
          message: string;
        }[];
        const status = error.status as number;
        if (status === 422) {
          errors.forEach((error) => {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          });
        }
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  // Xử lý đăng ký
  const onSignUp = async (data: any) => {
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);

      console.log(data);
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <div className={cx("authContainer")}>
      <div className={cx("login")}>
        <div className={cx("login__content")}>
          <div className={cx("login__img")}></div>
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
                <input
                  {...registerLogin("email")}
                  type="text"
                  placeholder="Email"
                  className={cx("login__input")}
                />
              </div>
              {loginErrors.email && (
                <p className={cx("error-message")}>
                  {loginErrors.email.message?.toString()}
                </p>
              )}
              <div className={cx("login__box")}>
                <i className={cx("bx bx-lock-alt login__icon")}></i>
                <input
                  {...registerLogin("password")}
                  type="password"
                  placeholder="Password"
                  className={cx("login__input")}
                />
              </div>
              {loginErrors.password && (
                <p className={cx("error-message")}>
                  {loginErrors.password.message?.toString()}
                </p>
              )}
              <a href="#" className={cx("login__forgot")}>
                Forgot password?
              </a>
              <button type="submit" className={cx("login__button")}>
                Sign In
              </button>
              <div>
                <span className={cx("login__account")}>
                  Don't have an Account?
                </span>
                <span
                  className={cx("login__signin")}
                  onClick={() => setIsSignUp(true)}
                >
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
                <input
                  {...registerSignUp("username")}
                  type="text"
                  placeholder="Username"
                  className={cx("login__input")}
                />
              </div>
              {signUpErrors.username && (
                <p className={cx("error-message")}>
                  {signUpErrors.username.message?.toString()}
                </p>
              )}

              <div className={cx("login__box")}>
                <i className={cx("bx bx-at login__icon")}></i>
                <input
                  {...registerSignUp("email")}
                  type="email"
                  placeholder="Email"
                  className={cx("login__input")}
                />
              </div>
              {signUpErrors.email && (
                <p className={cx("error-message")}>
                  {signUpErrors.email.message?.toString()}
                </p>
              )}

              <div className={cx("login__box")}>
                <i className={cx("bx bx-lock-alt login__icon")}></i>
                <input
                  {...registerSignUp("password")}
                  type="password"
                  placeholder="Password"
                  className={cx("login__input")}
                />
              </div>
              {signUpErrors.password && (
                <p className={cx("error-message")}>
                  {signUpErrors.password.message?.toString()}
                </p>
              )}

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
                <p className={cx("error-message")}>
                  {signUpErrors.confirmPassword.message?.toString()}
                </p>
              )}
              <button type="submit" className={cx("login__button")}>
                Sign Up
              </button>
              <div>
                <span className={cx("login__account")}>
                  Already have an Account?
                </span>
                <span
                  className={cx("login__signup")}
                  onClick={() => setIsSignUp(false)}
                >
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
