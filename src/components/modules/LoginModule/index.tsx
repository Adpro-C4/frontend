import LoginBox from "./components/LoginBox"

const LoginModule = () => {
    return <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-pink-200">
        <h1 className={`text-[#2F2F2F] font-bold text-2xl md:text-4xl text-center mb-12`}>Sign In to 
    <span className="text-pink-500"> Specialty Store</span></h1>
        <LoginBox/>
    </div>
}

export default LoginModule