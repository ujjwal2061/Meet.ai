"use client"
import { Drawer,DrawerContent,DrawerTitle,DrawerDescription, DrawerHeader } from "./ui/drawer"
import { Dialog ,DialogContent,DialogHeader,DialogTitle,DialogDescription} from "./ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"

interface ResponseProps{
    title:string;
    description:string;
    children:React.ReactNode;
    open:boolean;
    onOpenChange:(open:boolean)=>void
}
export  const ResponsiveDialog=({title,description,children, open,onOpenChange,}:ResponseProps)=>{
 const isMoblie=useIsMobile()
// Moblie view 
 if(isMoblie){
    return(
        <Drawer open={open} onOpenChange={onOpenChange}>
         <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>{title}</DrawerTitle>
                <DrawerDescription>{description}</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
               {children}
            </div>
         </DrawerContent>
        </Drawer>
    )
}
return(
    <Dialog open={open} onOpenChange={onOpenChange}>
     <DialogContent>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
          {children}
     </DialogContent>
    </Dialog>
)
}