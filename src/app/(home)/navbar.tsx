"use client"

import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["900"],
});

//Individual Navbar item

interface NavbarItemProps{
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
};

const NavbarItem = ({
    href,
    children,
    isActive
}: NavbarItemProps) => {
    return (
        <Button asChild variant="outline" className={cn("bg-transparent hover:bg-green-300 hover:text-white rounded-full hover:border-green-300 border-transparent px-3.5 text-lg", isActive && "bg-green-100 text-green-600 hover:text-white")}>
            <Link href={href}>
              {children}
            </Link>
        </Button>
    );
};

const navbarItems = [
    {href: "/", children: "Home"},
    {href: "/about", children: "About"},
    {href: "/features", children: "Features"},
    {href: "/pricing", children: "Pricing"},
    {href: "/contact", children: "Contact"}
]

//component starts here

export const Navbar = () => {
    
    //this makes the isActive property work. So that a tab with the href of the user's current page can have a different background
    const pathname = usePathname()

    //Create a state to check if the side bar is open
    const [isSidebarOpen, setisSidebarOpen] = useState(false)

    return (  
        <nav className="h-20 flex border-b justify-between font-medium bg-white">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    buybit
                </span>
            </Link>

            <NavbarSidebar 
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setisSidebarOpen}
            />

            <div className="items-center gap-4 hidden lg:flex"> 
                {navbarItems.map((item) => (
                    <NavbarItem 
                    key={item.href}
                    href={item.href}
                    /** This will give the active button i=on the nav bar a different bg color. To show that it is active */
                    isActive={pathname === item.href}>
                        {item.children}
                    </NavbarItem>
                ))}
            </div>

            <div className="hidden lg:flex">
                <Button asChild variant="secondary" className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none text-green-400 bg-white hover:bg-green-300 hover:text-white transition-colors text-lg">
                   <Link href='/sign-in'>
                      Login
                   </Link>
                </Button>
                <Button asChild className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none text-green-400 bg-white hover:bg-green-300 hover:text-white transition-colors text-lg">
                    <Link href='/sign-up'> 
                      Start Now
                    </Link>
                </Button>
            </div>

            {/**This is the menu bar icon for mobile design*/}
            <div className="flex lg:hidden items-center justify-center">
                <Button variant="ghost" className="size-12  border-transparent bg-white" onClick={()=> setisSidebarOpen(true)}>
                   {/**The (!) will enforce the width and height on the menu icon button and make it bigger*/}
                    <MenuIcon className="!w-8 !h-8"/>
                </Button>
            </div>
        </nav>
    );
}