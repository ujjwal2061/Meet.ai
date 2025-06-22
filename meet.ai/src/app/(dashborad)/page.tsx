import { headers } from "next/headers";
import HomeView from "@/modules/home/ui/home-view"
import { auth } from "@/lib/auth";
import {redirect} from "next/navigation"

const Page= async()=>{
  const session=await auth.api.getSession({
    headers:await headers(),
  })
  if(!session){
    redirect("/auth/sign-up")
  }
  return <HomeView />
}
export default Page;