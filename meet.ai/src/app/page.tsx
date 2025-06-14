"use client"
import {  useState } from "react";
import { Input } from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {authClient} from "@/lib//auth-clients"
export default function Home() {
  const [name ,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password ,setPassword]=useState("");
  const {data:session}=authClient.useSession();
  // submit button
  const onSubmmit=()=>{
    authClient.signUp.email({
      name,
      email,
      password
    },{
     onError:()=>{
       window.alert("Something went Wrong") }
    }),
    {
     onSuccess:()=>{
      window.alert("Login done ")
     }
    }
  }
  if(session){
    return <div>
      <p>Hello{session.user.name}</p>
      <Button onClick={()=>authClient.signOut()}>Logout</Button>
    </div>
  }


  return (
    <div className="flex flex-col gap-y-4 ">
        <Input  placeholder="name" value={name} onChange={(e)=>setName(e.target.value)} />
        <Input placeholder="eamil" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <Input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
       <Button
       onClick={onSubmmit}
       >Create user</Button>
    </div>
  );
}
