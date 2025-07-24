import "../globals.css";
import { ApiProvider } from "@/context/ApiContext";
import Navbar from "../components/NavBar/navbar";
import Footer from "../components/Footer/footer";


export const metadata = {
  title: "Psicologa Rosiméry",
  description: "",
};


interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children } : MainLayoutProps) {

  return (
    <>
     <ApiProvider> 
          <Navbar />
               {children}
          <Footer />
     </ApiProvider>
    </>
  );
}
