
import { SingUpView } from "@/modules/auth/ui/views/sing-up-view";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page=async()=>{
          const session=await auth.api.getSession({
            headers:await headers(),
          })
          if(!!session){
            redirect("/")
          }
    return <SingUpView />
}
export default Page;