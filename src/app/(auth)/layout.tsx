import { ApiProvider } from "../../context/ApiContext";

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
            {children}           
        </ApiProvider>
    </>
  );
}

export default LoginLayout;
