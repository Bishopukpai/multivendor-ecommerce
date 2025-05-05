import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props{
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void
};

//component starts here

export const NavbarSidebar = ({
    items,
    open,
    onOpenChange,
}: Props) => {
    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 transition-none">
                <SheetHeader className="p-4 border-b">
                        <SheetTitle className="text-green-600">
                            Menu
                        </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {items.map((item)=> (
                        <Link onClick={()=> onOpenChange(false)} key={item.href} href={item.href} className="w-full text-left p-4 hover:bg-green-400 hover:text-white flex items-center text-base font-bold">
                            {item.children}
                        </Link>
                    ))}
                    <div className=" flex">
                      <Button asChild variant="secondary" className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none text-green-400 bg-white hover:bg-green-300 hover:text-white transition-colors text-lg">
                        <Link onClick={()=> onOpenChange(false)} href='/sign-in'>
                           Login
                        </Link>
                      </Button>
                      <Button asChild className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none text-green-400 bg-white hover:bg-green-300 hover:text-white transition-colors text-lg">
                        <Link onClick={()=> onOpenChange(false)} href='/sign-up'> 
                          Start Now
                        </Link>
                      </Button>
                   </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
};