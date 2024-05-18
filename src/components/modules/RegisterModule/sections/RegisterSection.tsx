"use client"

import PasswordValidator from "@/components/elements/PasswordValidator"
import TextField from "@/components/elements/TextField"
import { useState, ChangeEvent } from "react"

const RegisterSection = () => {
    const [isEmailAlreadyInUse, setIsEmailAlreadyInUse] = useState<boolean>(false)
    const [isValidEmail, setIsValidEmail] = useState<boolean>(true)
    const [afterSubmit, setAfterSubmit] = useState<boolean>(false)
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [tooManyRequest, setTooManyRequest] = useState(false)
    const [page, setPage] = useState<number>(1)
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    

    const isPasswordValid = () : boolean => {
        const isLengthValid = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[^A-Za-z0-9]/.test(password);
        return isLengthValid && hasUppercase && hasLowercase && hasNumber && hasSymbol
    }

    const isEmpty = ( val:string) : boolean => {
        return val.trim().length == 0
    }

    const checkIsEmailValid = (): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        if(!isValid){
            setIsValidEmail(false);
        }
        return emailRegex.test(email);
      };
    const handleRegister = async ()=>{
        if(page == 1){
            setPage(2)
            return
        }
        setAfterSubmit(true)
        if(!isPasswordValid() || !checkIsEmailValid() || isEmpty(username) || 
        isEmpty(name) || isEmpty(phoneNumber)){
            return;
        }
        try{

        }catch(err: any){
            if(err.response.status == 406){
                setIsEmailAlreadyInUse(true)
            }
            if(err.response.status == 429){
                setTooManyRequest(true)
            }
            console.log(err.response.status)
            return
        }
    }

    const handleChangeName = (e: ChangeEvent<HTMLInputElement>)=>{
        setName(e.target.value)
        setAfterSubmit(false)
    }

    const handleChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>)=>{
        setPhoneNumber(e.target.value)
        setAfterSubmit(false)
    }

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>)=>{
        setUsername(e.target.value)
        setAfterSubmit(false)
    }

    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>)=> {
        setEmail(e.target.value)
        setIsValidEmail(true)
        setIsEmailAlreadyInUse(false)
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
        setAfterSubmit(false)
    }

    return  <div className=" max-w-md mx-auto my-auto">
    <h1 className={`text-[#2F2F2F] font-bold text-2xl md:text-4xl text-center ${tooManyRequest? "mt-4": ""}`}>Sign Up to 
    <span className="text-pink-500"> Specialty Store</span></h1>
    <div className="mt-8 mb-4">
        {page == 1 && <>
            <TextField label={"New Username"} type="text" onChange={handleChangeUsername} placeholder="Your Name" value={username}>
            { afterSubmit && isEmpty(username) && <div className="rounded-md w-full text-sm border-[#FBDFDF] border-2 bg-[#FFF5F5]
             text-[#79889D] mt-6 p-4">
              <p>Username cant be empty</p>
            </div>}
        </TextField>
        <TextField label={"Email Address"} type="text" onChange={handleChangeEmail} placeholder="Email" value={email}>
        { afterSubmit && (isEmailAlreadyInUse || !isValidEmail) &&<div className="rounded-md w-full text-sm border-[#FBDFDF] border-2 bg-[#FFF5F5]
             text-[#79889D] mt-6 p-4">
                <p>{(!isValidEmail)? "Email is invalid": "Oops! It seems this email is already in use. Please try another email address or sign in with your existing account"}</p>
            </div>}
        </TextField>
        <TextField label={"Create Password"} type="password" onChange={handleChangePassword} placeholder="Password" value={password}>
        {afterSubmit && <PasswordValidator password={password}/>}
        </TextField>
        </>}
        {
            page == 2 && <>
             <TextField label={"Name"} type="text" onChange={handleChangeName} placeholder="Your Name" value={name}>
            { afterSubmit && isEmpty(name) && <div className="rounded-md w-full text-sm border-[#FBDFDF] border-2 bg-[#FFF5F5]
             text-[#79889D] mt-6 p-4">
              <p>Name cant be empty</p>
            </div>}
        </TextField>
        <TextField label={"Phone Number"} type="tel" onChange={handleChangePhoneNumber}
         placeholder="Your Phone Number" value={phoneNumber}>
            { afterSubmit && isEmpty(phoneNumber) && <div className="rounded-md w-full text-sm border-[#FBDFDF] border-2 bg-[#FFF5F5]
             text-[#79889D] mt-6 p-4">
              <p>Phone number cant be empty</p>
            </div>}
            </TextField>
            </>
        }
        
        <h1 className="text-center mt-auto text-black">{page}/2</h1>
    </div>
    <div className="flex w-full  space-x-2">
    {page == 2 && <div onClick={()=>{
        setPage(1)
    }} className="grow mt-4 text-center
     bg-[#0F172A] py-2 px-4 rounded-lg">Kembali</div>
    }
    <button onClick={handleRegister} className={`grow mt-4 bg-pink-600 font-bold py-2 px-4 rounded-lg`}>{page == 1 ? "Lanjut": "Register"}</button>
    </div>
   
    <p className="text-[#2F2F2F] text-center mt-8">By creating an account 
    you agree with our <a className="underline">Terms of Service</a> and <a className="underline">Privacy Policy</a></p>
    <p className="text-[#2F2F2F] text-center mt-4">Already have an 
    account? <a href="/login" className="underline">Login</a></p>
    
</div>
}
export default RegisterSection