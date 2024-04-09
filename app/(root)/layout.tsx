import LeftSidebar from "@/components/shared/LeftSidebar";
import NavBar from "@/components/shared/navbar/NavBar";
import RightSidebar from "@/components/shared/RightSidebar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children}: {children: React.ReactNode}) => {
    return(
        <main className="background-light850_dark100 relative">
         <ToastContainer/>
           <NavBar/>
           <div className="flex">
            <LeftSidebar/>
            <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
             <div className="mx-auto w-full max-w-5xl">
                {children}
             </div>
            </section>
            <RightSidebar/>
           </div>
        </main>
    )
}

export default Layout;