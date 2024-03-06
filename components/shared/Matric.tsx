  import Image from "next/image";
  import Link from "next/link";

  interface Props {
    imgUrl: string;
    alt: string;
    title: string;
    value: string | number;
    textStyles?: string;
    isAuthor?: Boolean;
    href?: string; 
  }


  const Matric = ({imgUrl, alt, title, value, textStyles,isAuthor, href }: Props) => {
      const Content = (
       <>
          <Image
          src={imgUrl}
          alt= {alt}
          width={16}
          height={16}
          // style={{ width: "auto" }} 
          className={`object-contain ${href ? "rounded-full" : ""}`}
          />

      <p className={`${textStyles} flex  items-center  gap-1`}>
        {value}

        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
           >
          {title}
        </span>
      </p>
      </> 
      )

      if (href) {
        return (
          <Link href={href} className="flex-center  gap-1">
            {Content}
          </Link>
        );
      }
     
      return(
        <div className="flex-center  flex-wrap gap-1">
            {Content}
        </div>
      )
  }


   export default Matric;