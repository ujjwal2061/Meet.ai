import { AlertCircleIcon } from "lucide-react";

interface Props{
    title:string,
    description:string,
}
export const ErrortState=({title,description}:Props)=>{
    return (
       <div className="py-10 px-28 border-2 flex flex-1 items-center justify-center">
       <div className="flex flex-col items-center justify-center gap-y-8 bg-background rounded-2xl w-96 h-72 ">
       <AlertCircleIcon className="size-8  text-red-500 " />
       <div className="flex flex-col gap-y-3 text-center">
      <h6 className="text-xl font-semibold">{title}</h6>
      <p className="text-base text-muted-foreground">{description}</p>
    </div>
  </div>
</div>

    )
}