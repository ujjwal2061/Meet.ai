import { createTRPCRouter, baseProcedure, protcetedProcdure } from "@/trpc/init"
import { db } from "@/db"
import {agents} from "@/db/schema"
import { agentScheam } from "../schema"
import { z } from "zod"
import { eq } from "drizzle-orm"


export const agentRouter=createTRPCRouter({
// get one 
  getOne:baseProcedure.input(z.object({id:z.string()}))
  .query(async ({input})=>{
 const [existingagent]=await db
 .select()
 .from(agents)
 .where(eq(agents.id,input.id))
 return existingagent
  }),

  // getMany
    getMany:baseProcedure.query(async()=>{
      const data =await db.select().from(agents)
      return data;
    }),
    create:protcetedProcdure.input(agentScheam)
    .mutation( async ({input,ctx})=>{
      const [createdAgent]=await db.insert(agents)
      .values({...input,userId:ctx.auth.user.id})
      .returning()
      return createdAgent;
    })
})