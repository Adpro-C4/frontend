"use client"
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import SearchBar from "../Searchbar";
import { IoCartOutline } from "react-icons/io5";
import { GoHistory } from "react-icons/go";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [scrollTimeout, setScrollTimeout] = useState<any>(null);
    const [isFullscreen, setIsFullscreen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;

            // If current scroll position is less than previous, show navbar
            setIsNavbarVisible(currentPosition < scrollPosition);
            setScrollPosition(currentPosition);

            // Clear previous timeout if scrolling continues
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }

            // Set a timeout to show the navbar after scrolling stops
            const newTimeout = setTimeout(() => {
                setIsNavbarVisible(true);
            }, 200); // 200ms after scroll stops, adjust as needed
            setScrollTimeout(newTimeout);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [scrollPosition, scrollTimeout]);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isFullscreen) {
                setIsFullscreen(false);
            }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isFullscreen]);

  

    const handleHamburgerClick = () => {
        if (window.innerWidth < 768) {
            setIsFullscreen(!isFullscreen);
        }
    };
    
    
    return (
        <div className={`fixed top-0 px-8 lg:px-24 w-full flex flex-col items-center py-4  transition-all duration-500 ease-in-out border-b-4 border-pink-200
        ${isFullscreen ? 'bg-white w-screen h-screen z-50' : 'bg-white w-screen z-30'}  ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="flex w-full justify-between items-center xmd:items-start">
                <img src="/specialitystore.png" className="w-12 h-12 rounded-full md:w-16 md:h-16 xlg:w-24 xlg:h-24" alt=""/>
                <div className="hidden md:flex grow mx-8">
                <div className="grow max-w-2xl mx-auto">
                <SearchBar onSearch={function (query: string): void {
                    if(query.trim().length > 0){
                        router.push("/search?q="+query)
                    }
                } }/>
                </div>
                </div>
                <div></div>
                <div className="hidden md:flex space-x-8 items-center  text-[#344175] font-semibold text-lg xlg:text-3xl">
                    
                    <a href=""><IoCartOutline className="text-3xl text-pink-500"/></a>
                    <a href=""><GoHistory className="text-3xl text-pink-500"/></a>
                    <button className="hidden md:flex px-8 py-2 text-white rounded-xl font-semibold
                     bg-gradient-to-r from-pink-500 to-blue-400
                    xlg:text-3xl">Sign In</button>
                </div>
                
                {!isFullscreen ? <GiHamburgerMenu className="text-[#344175] md:hidden text-lg cursor-pointer" 
                onClick={handleHamburgerClick} /> :
                <IoCloseOutline className="text-[#344175] md:hidden text-lg cursor-pointer" onClick={handleHamburgerClick}/>}
            </div>
            {
                isFullscreen && <div className="mt-16 flex flex-col items-center w-screen text-center   text-[#344175] font-semibold text-lg lg:text-2xl">
                <div className="grow max-w-2xl  px-8">
                <SearchBar onSearch={function (query: string): void {
                    if(query.trim().length > 0){
                        router.push("/search?q="+query)
                    }
                } }/>
                </div>
                <a className="flex items-center mt-16  space-x-4" href="">
                    <IoCartOutline className="text-3xl text-pink-500"/>
                    <h1>Your Shopping Cart</h1>
                </a>
                <a className="flex items-center mt-8 space-x-4" href="">
                    <GoHistory className="text-3xl text-pink-500"/>
                    <h1>Your Order History</h1>
                </a>
                    <button className="flex px-8 mt-8  w-fit py-2 text-white rounded-xl font-semibold
                     bg-gradient-to-r from-pink-500 to-blue-400
                    xlg:text-3xl">Sign In</button>
        </div>
            }
        </div>
    )
}
export default Navbar;