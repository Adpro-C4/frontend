import Navbar from "@/components/elements/Navbar/CustomerNavbar";
import HomepageModule from "@/components/modules/HomepageModule";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-screen min-h-screen bg-gray-200">
      <Navbar/>
      <HomepageModule/>
    </main>
  );
}
