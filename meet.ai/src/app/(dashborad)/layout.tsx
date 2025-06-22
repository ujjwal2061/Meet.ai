import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavbar from "@/modules/dashborad/ui/components/dashbord-navabar";
import {DashboardSidebar} from "@/modules/dashborad/ui/components/dashbord-sidebar"
interface Props{
    children:React.ReactNode
}

const Layout=({children}:Props)=>{
    return (
        <SidebarProvider>
            <DashboardSidebar />
        <main className="flex flex-col h-screen w-screen bg-muted">
            <DashboardNavbar />
            {children}
        </main>
        </SidebarProvider>
    )
}
export default Layout;