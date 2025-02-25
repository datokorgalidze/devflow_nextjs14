import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import "../styles/prism.css";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from '@/context/ThemeProvider';


export const metadata: Metadata = {
    title: 'DevFlow',
    description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowlede",
    icons: {
      icon: "/assets/images/site-logo.svg",
    },
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});


 
 function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (        
    
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
            appearance={{
              elements: {
                formButtonPrimary: "primary-gradient",
                footerActionLink: "primary-text-gradient hover:text-primary-500",
              },
            }}
            > 
          <ThemeProvider>
            {children}
          </ThemeProvider>
         </ClerkProvider>          
        </body>
      </html>
   
  )
}

export default RootLayout;