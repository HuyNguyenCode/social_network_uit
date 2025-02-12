import RegisterForm from "@/app/(auth)/register/register-form";

export default function RegisterPage() {
    return (
       <div>
            <h1 className="text-xl font-semibold text-center ">Register</h1>
            <div className="flex justify-center">
                <RegisterForm />
            </div>
       </div>
    )
}