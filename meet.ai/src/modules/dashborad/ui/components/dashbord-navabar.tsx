"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon,  SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashborad-command";
import { useEffect, useState } from "react";
const DashboardNavbar=()=>{
    const {state ,toggleSidebar,isMobile}=useSidebar();
    const [commandOpen ,setcommandOpen]=useState(false)

    // 
    useEffect(()=>{
       const down =(e:KeyboardEvent)=>{
        if(e.key==="k" && (e.metaKey || e.ctrlKey)){
            e.preventDefault()
            setcommandOpen((commandOpen)=>!commandOpen)
        }
    }
      document.addEventListener("keydown" ,down)
      return ()=>document.removeEventListener("keydown",down)
     },[])
     ///
     
    return (
        <>
      <DashboardCommand open={commandOpen} setOpen={setcommandOpen} />
         <nav className="flex px-3  py-3 gap-x-2 items-center border-b bg-background">
           <Button className="size-9 cursor-pointer" variant={"outline"} onClick={toggleSidebar}>
            {(state==="collapsed" || isMobile) 
            ? <PanelLeftCloseIcon className="size-4" />:<PanelLeftCloseIcon className="size-4" />}
           </Button>
           <Button 
           className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
           variant={"outline"} size="sm" onClick={()=>setcommandOpen((commandOpen)=>!commandOpen)}>
            <SearchIcon />
            Search
            <kbd className="ml-auto pointer-none: inline-flex h-5 select-none items-center gap-1
              rounded bg-muted px-1.5  py-1.5 text-[10px]  font-mono text-muted-foreground font-medium">
                <span className="text-sm">&#8984; K</span>
            </kbd>
           </Button>
         </nav>
        </>
    )
}
export default DashboardNavbar;