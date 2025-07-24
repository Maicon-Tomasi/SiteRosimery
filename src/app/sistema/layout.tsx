import { ApiProvider } from "../../context/ApiContext";
import { AppSidebar } from "@/components/SideBar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import "../../custom-css/calendar-custom.css"

export const metadata = {
  title: "Psicologa Rosiméry",
  description: "",
};

interface Props {
  children: React.ReactNode;
}

const LoginLayout: React.FC<Props> = ({ children }) => {

  return (
    <>
        <ApiProvider> 
          <SidebarProvider>
              <AppSidebar />
              <main className="w-full">
              <SidebarTrigger />
              {children}
              </main>         
          </SidebarProvider>
        </ApiProvider>
    </>
  );
}

export default LoginLayout;
