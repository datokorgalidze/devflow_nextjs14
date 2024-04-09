"use client"

import Image from "next/image";
import { formatAndDivideNumber } from "@/lib/utils";
import { upvoteQuestion, downvoteQuestion } from "@/lib/actions/question.action";
import { toggleSaveQuestions } from "@/lib/actions/user.action";
import { upvoteAnswer, downvoteAnswer } from "@/lib/actions/answer.action";
import { usePathname, useRouter  } from "next/navigation";
import { useEffect } from "react";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { toast } from "react-toastify";




interface Props{
    type:string;
    itemId:string;
    userId:string;
    upvotes:number;
    hasupVoted:boolean;
    downvotes:number;
    hasdownVoted:boolean;
    hasSaved?:boolean;
}

const Votes = ({
    type,
    itemId,
    userId,
    upvotes,
    hasupVoted,
    downvotes,
    hasdownVoted,
    hasSaved,
}:Props) => {

    const pathname = usePathname();
    const router = useRouter();


 
    const handleVote = async (action: string) => {
        if (!userId) {
          return toast('You need to log in to vote',{
            position:"top-center"
          });
        }
    
        if (action === "upvote") {
          if (type === "Question") {
            await upvoteQuestion({
              questionId: JSON.parse(itemId),
              userId: JSON.parse(userId),
              hasupVoted,
              hasdownVoted,
              path: pathname,
            });
          } else if (type === "Answer") {
            await upvoteAnswer({
              answerId: JSON.parse(itemId),
              userId: JSON.parse(userId),
              hasupVoted,
              hasdownVoted,
              path: pathname,
            });
          }
    
          //  show a toast
          return  !hasupVoted  ?  toast.success("Upvote Succcessful",{
            position: "top-center"
          }) :  toast.error('Upvote Removed');
        }
    
        if (action === "downvote") {
          if (type === "Question") {
            await downvoteQuestion({
              questionId: JSON.parse(itemId),
              userId: JSON.parse(userId),
              hasupVoted,
              hasdownVoted,
              path: pathname,
            });
          } else if (type === "Answer") {
            await downvoteAnswer({
              answerId: JSON.parse(itemId),
              userId: JSON.parse(userId),
              hasupVoted,
              hasdownVoted,
              path: pathname,
            });
          }
    
          // show a toast
          !hasdownVoted ? toast.success("Downvote Succcessful", {
            position: "top-center"
          }) : toast.error('Downvote Removed');
        }
      };




    // const handleSave = async () => {
          
    //       await toggleSaveQuestions({
    //         userId: JSON.parse(userId),
    //         questionId: JSON.parse(itemId),
    //         path: pathname
    //       })

    //       if (!hasSaved) {
    //         toast.success('Saved', { position: "top-center" });
    //       } else {
    //         toast.error("Removed");
    //       }

    //   //  return  !hasSaved ? toast.success('Saved', {position: "top-center"}) 
    //   //    :  toast.error("Removed");
    // }

    const handleSave = async () => {
      try {
        await toggleSaveQuestions({
          userId: JSON.parse(userId),
          questionId: JSON.parse(itemId),
          path: pathname
        });
    
        if (!hasSaved) {
          toast.success('Saved in  your collection', { position: "top-center" });
        } else {
          toast.error("Removed from  your collection");
        }
      } catch (error) {
        console.error("Error while toggling save:", error);
      
      }
    };
    



    useEffect(() => {

      viewQuestion({
       questionId: JSON.parse(itemId),
       userId: userId ? JSON.parse(userId) : undefined
      })

   },[itemId, userId, pathname, router])



    return (
        <div className="flex gap-5">
            <div className="flex-center gap-3.5">
              <div className="flex-center gap-1.5">
              <Image
                    src={
                    hasupVoted
                        ? "/assets/icons/upvoted.svg"
                        : "/assets/icons/upvote.svg"
                    }
                    width={18}
                    height={18}
                    alt="upvote"
                    className="cursor-pointer"
                    onClick={() => handleVote("upvote")}
                />
                <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                   <p className="subtle-medium text-dark400_light900"> {formatAndDivideNumber(upvotes)}</p>
                </div> 
                <Image
                    src={
                    hasdownVoted
                        ? "/assets/icons/downvoted.svg"
                        : "/assets/icons/downvote.svg"
                    }
                    width={18}
                    height={18}
                    alt="downvote"
                    className="cursor-pointer"
                    onClick={() => handleVote("downvote")}
                />

                <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                    <p className="subtle-medium">{formatAndDivideNumber(downvotes)}</p>
                </div> 
              </div>
            </div>
            {type === "Question" && (
          <Image
            src={
                hasSaved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
                width={18}
                height={18}
                alt="star"
                className="cursor-pointer"
                onClick={handleSave}
                />
            )}
        </div>
    )
}


export default Votes;