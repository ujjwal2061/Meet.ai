"use client";
import { Card, CardContent } from "@/components/ui/card"
import { zodResolver } from '@hookform/resolvers/zod'; 
import * as z from 'zod'; 

import {OctagonAlertIcon} from "lucide-react";
import {useForm} from "react-hook-form";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Form,FormControl,FormField,FormLabel,FormItem,FormMessage } from "@/components/ui/form"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { authClient } from "@/lib/auth-clients";
import { useRouter } from "next/navigation";
import { useState } from "react";

// scheam of form 
const formSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1,{message:"Password is required"})
});

export const  SingInView=()=>{
    const router=useRouter();
    const [error,setError]=useState<string | null>(null)
    const [loading ,setIsLoading]=useState<boolean>(false)
    // react from-hook
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
        }
    })
  //action of button
   const onSubmit=async(data:z.infer<typeof formSchema>)=>{
    setIsLoading(true)
    setError(null);
     authClient.signIn.email({
        email:data.email,
        password:data.password
    },
    {
    onSuccess:()=>{
        setIsLoading(false)
        router.push("/");
    },
    onError:({error})=>{
        setError(error.message)
    }
  })
}

    return (
    <div className="flex flex-col gap-6">
     <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
           <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6  md:p-8">
               <div className="flex flex-col gap-2  items-center  ">
                 <div className="flex flex-col   items-center text-center">
                   <h1 className="text-2xl font-bold font-sans">Welcome back</h1>
                   <p className="text-muted-foreground text-balance">Login to your account</p>
                 </div>
                <div className="flex flex-row mt-4  w-full ">
                 <FormField  control={form.control}  name="email" render={({field})=>(
                   <FormItem className=" w-full px-2 py-1 items-start ">
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
                {!!error && (
                    <Alert className="bg-destructive/10 border-none">
                        <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>
                )}
                <Button 
                    disabled={loading}
                    type="submit" 
                    className="w-full">Sing up</Button>
                    <div className="after:border-1.5 relative text-center text-sm after:absolute after:inset-0
                    after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                    <span className="bg-card text-muted-foreground relative z-120 px-2">or continue with</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" type="button" className="w-full" >Google</Button>
                         <Button variant="outline" type="button" className="w-full" >Github</Button>
                    </div>
                    <div className="text-center text-sm">
                        Don&apos;t have an account ?{" "}
                     <Link href={"/auth/sign-up"} className=" font-semibold tex-[14px]   underline underline-offset-4">Sign Up</Link>   
                    </div>
              </div>
            </form>
           </Form>
             <div className="bg-radial from-green-700 to-green-900 relative hidden
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


