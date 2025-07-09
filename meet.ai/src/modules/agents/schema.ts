import {z} from "zod"

export const agentScheam=z.object({
    name:z.string().min(1,{message:"Name is required"}),
    instructions:z.string().min(1,{message:"Please give instructions"})
})