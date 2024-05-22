import Navbar from "@/components/elements/Navbar/CustomerNavbar";
import SearchModule from "@/components/modules/SearchModule";
import { Suspense } from "react";

export default function Page(){
    return <div className="flex flex-col items-center w-screen min-h-screen bg-gray-200">
        <Navbar/>
        <Suspense><SearchModule/></Suspense>
        
    </div>
}