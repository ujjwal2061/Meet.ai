"use client"
import {  useState } from "react";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib//auth-clients"
import { useRouter } from "next/navigation";
export default function HomeView() {

 
 const {data:session}=authClient.useSession();
 const router=useRouter();

  if(!session){
    return <p>
     Loading...
    </p>
  }


  return (
    <div className="flex flex-col gap-y-4 p-2 ">
       Loing as {session.user.name}
       <Button onClick={()=>authClient.signOut({
        fetchOptions:{onSuccess:()=>router.push("/auth/sign-in")}
       })}>Log out</Button>
    </div>
  );
}
