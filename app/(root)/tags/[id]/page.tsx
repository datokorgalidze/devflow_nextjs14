 import { IQuestion } from "@/database/question.model";
 import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
 import QuestionsCard from "@/components/cards/QuestionsCard";
 import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
 import NoResult from "@/components/shared/NoResult";
 import { URLProps } from "@/types";
import Pagination from "@/components/shared/Pagination";

   const Page = async ({params,searchParams}:URLProps) => {
        
    const result = await getQuestionsByTagId({
         tagId: params.id,
         page: searchParams.page ? +searchParams.page : 1,
         searchQuery:searchParams.q
    })
      
       return(
     <> 
         <h1 className="h1-bold text-dark100_light900">
           {result.tagTitle}   
        </h1>   
       <div className="mt-11 w-full">
         <LocalSearchbar 
           route="/"
           iconPosition="left"
           imgSrc="/assets/icons/search.svg"
           placeholder="Search for tags"
           otherClasses="flex-1"
         />
 
        
       </div>
 
     
 
       <div className="flex flex-col w-full gap-6 mt-10">
          {result.questions.length > 0 ? 
            result.questions.map((question: any ) => (
              <QuestionsCard
                key={question._id}
                _id = {question._id}
                author = {question.author}
                answers = {question.answers}
                createdAt = {question.createdAt}
                tags = {question.tags}
                upvotes = {question.upvotes}
                views = {question.views}
                title = {question.title}
              />
            ))
            : <NoResult
               title = "There’s no tag question to show"
               descr = "Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"   
               link = "/ask-question"
               linkTitle = "Ask a Qusestion"
            /> 
          }
       </div> 

       <div className="mt-10">
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNext}
          />
        </div>
     </>
    )
   }



   export default Page;