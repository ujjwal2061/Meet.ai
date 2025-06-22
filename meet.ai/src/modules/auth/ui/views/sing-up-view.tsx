"use client";

import { Card, CardContent } from "@/components/ui/card"
import { zodResolver } from '@hookform/resolvers/zod'; 
import * as z from 'zod'; 
import { useRouter } from "next/navigation";
import { FaGoogle ,FaGithub} from "react-icons/fa";


import {OctagonAlertIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from "@/components/ui/form"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { authClient } from "@/lib/auth-clients";
import { useState } from "react";

// scheam of form 
const formSchema=z.object({
    name:z.string().min(1,{message:"Name is required"}),
    email:z.string().email(),
    password:z.string().min(1,{message:"Password is required"}),
    confirmPassword:z.string().min(1,{message:"Paaword is required"})
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password don,t match",
    path:["confirmPassword"]
})
export const  SingUpView=()=>{
      const router=useRouter();
    const [error,setError]=useState<string | null>(null)
    const [loading ,setIsLoading]=useState<boolean>(false)
    // react from-hook
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    })
  //action of button
   const onSubmit=async(data:z.infer<typeof formSchema>)=>{
    setIsLoading(true)
    setError(null);
     authClient.signUp.email({
        name:data.name,
        email:data.email,
        password:data.password,
        callbackURL:"/"
    },
    {
    onSuccess:()=>{
        setIsLoading(false);
        router.push("/")
    },
    onError:({error})=>{
        setError(error.message)
    }
  })
}

    return (
    <div className="flex flex-col gap-4">
     <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-4  md:p-8">
               <div className="flex flex-col gap-2  items-center  ">
                 <div className="flex flex-col   items-center text-center">
                   <h1 className="text-2xl font-bold font-sans">Let&apos;s get Started</h1>
                   <p className="text-muted-foreground text-balance">Create your account</p>
                 </div>
                <div className="flex flex-row mt-4  w-full ">
                 <FormField  control={form.control}  name="name" render={({field})=>(
                   <FormItem className=" w-full px-2 py-0.5 items-start ">
                   <FormLabel>Name</FormLabel>
                    <FormControl >
                      <Input
                        type="text" placeholder="neyuj_11" {...field} />
                    </FormControl>
                     <FormMessage />
                    </FormItem>
                 )} />
                </div>
                <div className="flex flex-row  w-full ">
                 <FormField  control={form.control}  name="email" render={({field})=>(
                   <FormItem className=" w-full px-2 py-0.5 items-start ">
                   <FormLabel>Email</FormLabel>
                    <FormControl >
                      <Input
                        type="email" placeholder="m@gmail.com" {...field} />
                    </FormControl>
                     <FormMessage />
                    </FormItem>
                 )} />
                </div>
                 <div className="flex flex-row mt-4  w-full ">
                 <FormField  control={form.control}  name="password" render={({field})=>(
                   <FormItem className=" w-full px-2 py-1 items-start ">
                   <FormLabel>Password</FormLabel>
                    <FormControl >
                      <Input
                        type="password" placeholder="********" {...field} />
                        
                    </FormControl>
                     <FormMessage />
                    </FormItem>
                 )} />
                </div>
                 <div className="flex flex-row mt-4  w-full ">
                 <FormField  control={form.control}  name="confirmPassword" render={({field})=>(
                   <FormItem className=" w-full px-2 py-0.5 items-start ">
                   <FormLabel>Confirm Password</FormLabel>
                    <FormControl >
                      <Input
                        type="password" placeholder="********" {...field} />
                    </FormControl>
                     <FormMessage />
                    </FormItem>
                 )} />
                </div>
                {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                )}
                <Button 
                    disabled={loading}
                    type="submit" 
                    className="w-full">Sing in</Button>
                    <div className="after:border-1.5 relative text-center text-sm after:absolute after:inset-0
                    after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-120 px-2">or continue with</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button 
                         onClick={()=>{
                            authClient.signIn.social({
                            provider:"google"
                          })}}
                        variant="outline" type="button" className="w-full cursor-pointer" > <FaGoogle  /></Button>
                         <Button 
                          onClick={()=>{
                            authClient.signIn.social({
                            provider:"github"
                          })}}
                         variant="outline" type="button" className="w-full cursor-pointer" ><FaGithub color="black" /></Button>
                    </div>
                    <div className="text-center text-sm">
                        Already  have an account ?{" "}
                     <Link href={"/auth/sign-in"} className=" font-semibold tex-[14px]   underline underline-offset-4">Sign in</Link>   
                    </div>
              </div>
            </form>
           </Form>
             <div className="bg-radial from-sidebar-accent to-sidebar  relative hidden
               md:flex flex-col gay-y-4 items-center justify-center">
                <img src="/logo.svg"  alt="Image" className="h-[92px] w-[92px]" />
                <p className="text-xl font-medium font-sans text-white font-">Meet.AI</p>
             </div>
       </CardContent> 
    </Card>
    <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs
    text-balance *:[a]:underline *:[a]:underline-offset-4">By clicking continue,you agree to our <a href="#">Terms of Service </a>  and <a href="#"> Privacy Policy</a></div>
    </div>
    )
}