 "use client"

 import Image from "next/image"
 import { deleteQuestion } from "@/lib/actions/question.action"
 import { deleteAnswer } from "@/lib/actions/answer.action"
 import { usePathname, useRouter } from "next/navigation"
import { toast } from "react-toastify"


 interface Props {
     itemId:string,
     type:string
 }

     const EditDeleteAction = ({itemId, type} : Props) => {
        
        const router = useRouter()
        const pathname = usePathname()

         
        const handleEdit = () => {
            router.push(`/question/edit/${JSON.parse(itemId)}`)
        }

        const handleDelete = async () => {

            if(type === 'Question' ){
              
               await deleteQuestion({
                questionId: JSON.parse(itemId),
                 path: pathname
                })

            }else if (type === 'Answer' ){
                
                await deleteAnswer({
                     answerId: JSON.parse(itemId),
                     path: pathname
                    })
            }

            toast.error("Deleted", {
              position: "top-center"
            })
        }

         return(
            <div className="flex items-center justify-end gap-3 max-sm:w-full">
               {type === 'Question' && (
                 <Image
                   src="/assets/icons/edit.svg"
                   alt="Edit icon"
                   width={14}
                   height={14}
                   className="cursor-pointer object-contain"
                   onClick={handleEdit}
                 />
               )}

                 <Image
                   src="/assets/icons/trash.svg"
                   alt="Edit icon"
                   width={14}
                   height={14}
                   className="cursor-pointer object-cover"
                   onClick={handleDelete}
                 />
              
            </div>
         )
     }

     export default EditDeleteAction;