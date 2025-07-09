import { z } from "zod";
import { useTRPC } from "@/trpc/client";
import { AgenstGentOne } from "../../types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { agentScheam } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface AgenstFormProps{
    onSuccess?:()=>void;
    onCancel?:()=>void;
    intialVlaues?:AgenstGentOne
}

export const AgenstForm=({onSuccess,onCancel,intialVlaues}:AgenstFormProps)=>{
const trpc=useTRPC();
const router=useRouter();
const queryClient=useQueryClient();

const createAgent=useMutation(
    trpc.agents.create.mutationOptions({
        onSuccess:()=>{},
        onError:()=>{},
    })
);
const form =useForm<z.infer<typeof agentScheam>>({
resolver:zodResolver(agentScheam),
defaultValues:{
    name:intialVlaues?.name ?? "",
    instructions:intialVlaues?.instructions ??"",
}
})
//
const isEdit=!!intialVlaues?.id;
const isPending =createAgent.isPending;

const onSubmit=(values:z.infer<typeof agentScheam>)=>{
    if(isEdit){
        console.log("TODO:updatesAgent")
    }else{
        createAgent.mutate(values)
    }
}
}