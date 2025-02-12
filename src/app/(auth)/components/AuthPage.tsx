"use client"; 


import styles from "../auth.module.css";
import classNames from "classnames/bind";

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterBody, RegisterBodyType } from '@/schemaValidations/auth.schema'
// import authApiRequest from '@/apiRequests/auth'
// import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
// import { handleErrorApi } from '@/lib/utils'
import { useState } from 'react'
// import { useAppContext } from '@/app/app-provider'

const cx = classNames.bind(styles);

const AuthPage = () => {
  // State để kiểm soát form hiển thị
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false)
//   const { setUser } = useAppContext()
//   const { toast } = useToast()
  const router = useRouter()

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: ''
    }
  })
  async function onSubmit(values: RegisterBodyType) {
    console.log(values);
    
    if (loading) return
    // setLoading(true)
    // try {
    //   const result = await authApiRequest.register(values)

    //   await authApiRequest.auth({
    //     sessionToken: result.payload.data.token,
    //     expiresAt: result.payload.data.expiresAt
    //   })
    //   toast({
    //     description: result.payload.message
    //   })
    //   setUser(result.payload.data.account)

    //   router.push('/me')
    // } catch (error: any) {
    //   handleErrorApi({
    //     error,
    //     setError: form.setError
    //   })
    // } finally {
    //   setLoading(false)
    // }
  }
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const handleSignup = () => {
    const userInfor = {
      fullName,
      email,
      password,
      rePassword,
    };
    console.log(userInfor);
  };
  
  const handleLogin = async () => {
    // const newEmail= "admin@gmail.com"
    // const newPasword= "admin"
    // const response = await fetch("http://localhost:5000/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ newEmail, newPasword }),
    // });
    // console.log(response);

  };

  return (
    <div className={cx("authContainer")}>
      <div className={cx("login")}>
        <div className={cx("login__content")}>
          <div className={cx("login__img")}></div>
          <div className={cx("login__forms")}>
            {/* Form đăng nhập */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={cx("login__registre", { none: isSignUp, block: !isSignUp })}>
                <h1 className={cx("login__title")}>Log In</h1>
                <div className={cx("login__box")}>
                    <i className={cx("bx bx-user login__icon")}></i>
                    <input type="text" placeholder="Username" className={cx("login__input")} />
                </div>
                <div className={cx("login__box")}>
                    <i className={cx("bx bx-lock-alt login__icon")}></i>
                    <input type="password" placeholder="Password" className={cx("login__input")} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <a href="#" className={cx("login__forgot")}>Forgot password?</a>
                <button type="submit" className={cx("login__button")} onClick={handleLogin}>Sign In</button>
                <div>
                    <span className={cx("login__account")}>Don't have an Account?</span>
                    <span className={cx("login__signin")} onClick={() => setIsSignUp(true)}>
                    Sign Up
                    </span>
                </div>
                </form>
            </Form>
            

            {/* Form đăng ký */}
            <form className={cx("login__create", { none: !isSignUp, block: isSignUp })}>
              <h1 className={cx("login__title")}>Create Account</h1>
              <div className={cx("login__box")}>
                <i className={cx("bx bx-user login__icon")}></i>
                <input type="text" placeholder="Username" className={cx("login__input")} />
              </div>
              <div className={cx("login__box")}>
                <i className={cx("bx bx-at login__icon")}></i>
                <input type="email" placeholder="Email" className={cx("login__input")} />
              </div>
              <div className={cx("login__box")}>
                <i className={cx("bx bx-lock-alt login__icon")}></i>
                <input type="password" placeholder="Password" className={cx("login__input")} />
              </div>
              <a href="#" className={cx("login__button")} onClick={handleSignup}>Sign Up</a>
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
}
export default AuthPage