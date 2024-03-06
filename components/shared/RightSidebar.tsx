"use client";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "./RenderTag";




const hotQuestions = [
    { _id: 1, title: "How do I use express as a custom server in NextJS?" },
    { _id: 2, title: "Cascading Deletes in SQLAlchemy?" },
    { _id: 3, title: "How to perfactly center a Div  with Tailwind CSS?" },
    {
      _id: 4,
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    { _id: 5, title: "Redux Toolkit Not Updating State as Expected" },
  ];
 
  const popularTags = [
    { _id: 1, name: "javascript", totalQuestions: 5 },
    { _id: 2, name: "react", totalQuestions: 5 },
    { _id: 3, name: "next", totalQuestions: 5 },
    { _id: 4, name: "vue", totalQuestions: 2 },
    { _id: 5, name: "redux", totalQuestions: 10 },
  ];
  

const RightSidebar = () => {
    return(
        <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
            <div>
               <h3 className="h3-bold text-dark200_light900">
                 Top questions
               </h3>
               <div className="flex mt-7 flex-col w-full gap-[30px]">
                   {hotQuestions.map((question) =>(
                   
                      <Link 
                        href={`/questions/${question._id}`}
                        key={question._id}
                        className="flex justify-between items-center gap-7 cursor-pointer"
                      >
                        <p className="body-medium text-dark500_light700">
                            {question.title}   
                        </p>
                        <Image
                          src = "/assets/icons/chevron-right.svg"
                          alt="chevron-right"
                          width={20}
                          height={20}
                          className="invert-colors"
                        />
                      </Link> 
                   ))} 
               </div>
            </div>
            <div className="mt-16">
               <h3 className="h3-bold text-dark200_light900">
                 Popular Tags
               </h3>
               <div className="flex flex-col mt-7 gap-4">
                  {popularTags.map((tag) => (
                    <RenderTag
                      key={tag._id}
                      name = {tag.name}
                      _id = {tag._id}
                      totalQuestions = {tag.totalQuestions}
                      showCount
                    />
                  ))}
               </div>
            </div>
        </section>
    )
}



export default RightSidebar;