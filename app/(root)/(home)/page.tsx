 
  import { Button } from "@/components/ui/button"; 
  import Link from "next/link";
  import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
  import Filter from "@/components/shared/Filter";
  import { HomePageFilters } from "@/costants/filter";
  import HomeFilters from "@/components/home/HomeFilters";
  import NoResult from "@/components/shared/NoResult";
  import QuestionsCard from "@/components/cards/QuestionsCard";
  import { getQuestions,   getRecommendedQuestions } from "@/lib/actions/question.action";
  import { SearchParamsProps } from "@/types";
  import Pagination from "@/components/shared/Pagination";
  import { Metadata } from "next";
  import { auth } from "@clerk/nextjs";


  export const metadata: Metadata = {
    title: "Home | Next Dev Overflow",
  };





  
  async function Home({searchParams}: SearchParamsProps) {
      
    
    const { userId } = auth();
    let result;
  
    if (searchParams?.filter === "recommended") {
      if (userId) {
        result = await getRecommendedQuestions({
          userId,
          searchQuery: searchParams.q,
          page: searchParams.page ? +searchParams.page : 1,
        });
      } else {
        result = {
          questions: [],
          isNext: false,
        };
      }
    } else {
      result = await getQuestions({
        searchQuery: searchParams.q,
        filter: searchParams.filter,
        page: searchParams.page ? +searchParams.page : 1,
      });
    }
  
    



    
    // const result = await getQuestions({
    //     searchQuery:searchParams.q,
    //     filter: searchParams.filter,
    //     page: searchParams.page ? +searchParams.page : 1
    // })

   
  

    return (
      <> 
        <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="h1-bold text-dark100_light900">
            All Qestions
            </h1>
          <Link 
            href= "/ask-questions"
            className="flex justify-end max-sm:w-full"
          >
            <Button  className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
              Ask a Question
            </Button> 
          </Link>
        </div>
        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearchbar 
            route="/"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for question"
            otherClasses="flex-1"
          />

          <Filter
            filters = {HomePageFilters}
            otherClasses = "min-h-[56px] sm:min-w-[170px]"
            containerClasses = "hidden max-md:flex"
          />
        </div>

        <HomeFilters/>

        <div className="flex flex-col w-full gap-6 mt-10">
           {result.questions.length > 0 ? 
             result.questions.map((question) => (
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
                title = "There’s no question to show"
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

  export default Home;