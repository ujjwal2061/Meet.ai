"use client"
import { AvatarImage ,Avatar} from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-clients"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel, DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import {  ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardSidebarUser=()=>{
  const router=useRouter();
    const {data,isPending}=authClient.useSession();
    if(isPending || ! data?.user){
        return null ;
    }
    // logout function
    const Logout=async()=>{
   await authClient.signOut({
   fetchOptions:{
    onSuccess:()=>{
      router.push("/auth/sign-in")
    }
  }
})
    }
return(
   <DropdownMenu >
     <DropdownMenuTrigger className="rounded-lg  gap-1 border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
         {data.user.image ? (
           <Avatar>
            <AvatarImage src={data.user.image} />
           </Avatar>
         ) :null}
         <div className="flex p-1   flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
           <p className="text-sm  font-semibold truncate w-full ">
            {data.user.name}
           </p>
           <p className="text-xs truncate w-full">{data.user.email}</p>
         </div>
         <ChevronDownIcon className="size-4 shrink-0 cursor-pointer"/>
     </DropdownMenuTrigger>
     <DropdownMenuContent align="end" side="right" className="w-72">
      <DropdownMenuLabel>
        <div className="flex flex-col gap-1">
        <span className="font-medium truncate">{data.user.name}</span>
        <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator/>
       <DropdownMenuItem className="p-2 cursor-pointer flex justify-between items-center">
         Billing 
        <CreditCardIcon className="size-4" />
       </DropdownMenuItem>
        <DropdownMenuItem 
        onClick={Logout}
        className="cursor-pointer flex items-center justify-between">
          Logout  
        <LogOutIcon className="size-4" />
       </DropdownMenuItem>
      </DropdownMenuContent>
   </DropdownMenu>
    )
}
export default DashboardSidebarUser; 