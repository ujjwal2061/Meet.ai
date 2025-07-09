import {ResponsiveDialog} from "@/components/responive-dialog"
interface NewAgenstDialoProps{
    open:boolean,
    onOpenChange:(open:boolean)=>void
}
export const NewAgenstDialog=({open,onOpenChange}:NewAgenstDialoProps)=>{
    return(
       <ResponsiveDialog title="New Agent" description="Create a new agent"
       open={open} onOpenChange={onOpenChange}>
         new agent form
       </ResponsiveDialog>
     )
}