import Link from "next/link"
import RenderTag from "../shared/RenderTag"
import Matric from "../shared/Matric"
import { getTimestamp } from "@/lib/utils"
import { formatAndDivideNumber } from "@/lib/utils"
import { SignedIn } from "@clerk/nextjs"
import EditDeleteAction from "../shared/EditDeleteAction"


  interface Props {
    _id:string;
    author:{
        _id:string;
        name:string;
        picture:string;
        clerkId?: string | null;
    }
    answers:Array <object>
    title:string;
    createdAt:Date;
    tags:{
        _id:number;
        name:string;
    }[]
    upvotes:string[];
    views:number;
    clerkId?:string | null;
  }

   const QuestionsCard = ({
    clerkId,
    _id,
    author,
    answers,
    title,
    createdAt,
    tags,
    upvotes,
    views
   }: Props) => {

    const showeActionButton = clerkId && clerkId === author.clerkId;
       return(
        <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
            <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
                <div>
                   <span className="subtle-regular text-dark200_light700 flex line-clamp-1 sm:hidden">
                      {getTimestamp(createdAt)}
                   </span>
                   <Link href={`/question/${_id}`}>
                    <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
                     {title}
                    </h3>
                   </Link>
                </div>
               <SignedIn>
                  {showeActionButton && (
                     <EditDeleteAction type = 'Question' itemId = {JSON.stringify(_id)}/>
                  )}
               </SignedIn>
            </div> 

          
           <div className="mt-3.5 flex flex-wrap gap-2">
               {tags.map((tag) => (
                  <RenderTag key={tag._id} _id = {tag._id} name = {tag.name}/>
               ))}
           </div> 

            
            <div className="flex-between mt-6 w-full flex-wrap gap-3">    
              <Matric
                imgUrl= {author.picture}
                alt="user"
                value={author.name}
                title= {` - asked ${getTimestamp(createdAt)}`}
                href={`/profile/${author.clerkId}`}
                isAuthor
                textStyles="body-medium text-dark400_light800"
                />
             <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
               <Matric
                 imgUrl = "/assets/icons/like.svg"
                 alt = "upvotes"
                 title = "Votes"
                 value = {formatAndDivideNumber (upvotes.length)}
                 textStyles ="small-medium text-dark400_light800"
               />

                  <Matric
                 imgUrl = "/assets/icons/message.svg"
                 alt = "answers"
                 title = "Answers"
                 value = {formatAndDivideNumber (answers.length)}
                 textStyles ="small-medium text-dark400_light800"
               />

                <Matric
                 imgUrl = "/assets/icons/eye.svg"
                 alt = "eye"
                 title = "Views"
                 value = {formatAndDivideNumber (views)}
                 textStyles ="small-medium text-dark400_light800"
               /> 
               </div>               
           </div>         
         </div>
       )
   }



   export default QuestionsCard;