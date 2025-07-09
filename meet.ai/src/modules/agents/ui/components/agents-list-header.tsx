"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewAgenstDialog } from "./new-agents-dialog"
import { useState } from "react"

export const AgentListHeader=()=>{
    const [IsOpen,setOpen]=useState(false)
    return(
        <>
        <NewAgenstDialog  open={IsOpen} onOpenChange={setOpen}/>
        <div className="py-4 px-4 md:pxx-8 flex flex-col gap-4-y-4">
         <div className="flex items-center justify-between">
          <h5 className="font-medium text-lg">My Agents</h5>
          <Button onClick={()=>setOpen(!IsOpen)}><PlusIcon />New Agent</Button>
         </div>
        </div>
        </>
    )
}