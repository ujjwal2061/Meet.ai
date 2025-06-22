'use client'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { BotIcon, StarIcon, VideoIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Separator } from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"
import  DashboardSidebarUser  from "./dashbord-user-button"
const firstSection =[
    {
        icons:VideoIcon,
        label:"Meetings",
        href:"/meetings"
    },
    {
        icons:BotIcon,
        label:"Agents",
        href:"/agents"
    }
]

const SecondSection =[
    {
        icons:StarIcon,
        label:"Upgrade",
        href:"/upgrade"
    },

]

export const DashboardSidebar=()=>{
    const pathname=usePathname();

    return(
        <Sidebar>
            <SidebarHeader className="text-sidebar-accent">
              <Link href="/" className="flex items-center gap-3 px-2 pt-2" >
              <Image src="/logo.svg"  height={36} width={36} alt="Meet.ai"  />
              <p className="text-[24px]  font-semibold text-white">Meet.AI</p>
              </Link>
            </SidebarHeader>
            <div className="py-4 px-2 ">
                <Separator className=" " />
            </div>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item)=>(
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                     className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30%  via-sidebar/50 to-sidebar/50",
                                     pathname=== item.href && "bg-linear-to-r/oklch border-[5D6B68]/10")}
                                     isActive={pathname===item.href}>
                                        <Link href={item.href}>
                                        <item.icons size={20} />
                                        <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <div className="py-4 px-2 ">
                  <Separator className=" " />
               </div>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SecondSection.map((item)=>(
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton 
                                    asChild
                                     className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30%  via-sidebar/50 to-sidebar/50",
                                     pathname=== item.href && "bg-linear-to-r/oklch border-[5D6B68]/10")}
                                     isActive={pathname===item.href}>
                                        <Link href={item.href}>
                                        <item.icons size={20} />
                                        <span className="text-sm font-medium tracking-tight">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="text-white">
                 <DashboardSidebarUser />
            </SidebarFooter>
        </Sidebar>
    )
}