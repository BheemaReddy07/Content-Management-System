import AuthForm from "@/components/authForm";

export default function SignUp() {
   
    return <section className="w-full flex h-screen items-center justify-center">
       <AuthForm origin="signup" />
    </section>
}