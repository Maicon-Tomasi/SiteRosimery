import Banner from "./components/Banner/banner";
import Especializacoes from "./components/Especializacoes/Especializacoes";
import Servico from "./components/Servicos/servicos";
import Sobre from "./components/Sobre/sobre";

export default function Home() {
  return (
    <>
    {/* bg-gradient-to-br from-[#faf0f0] to-[#e9adb7] */}
    <div className="min-h-screen overflow-x-hidden">
      <Banner />
      <Sobre />
      <Servico/>
      <Especializacoes />
    </div>
    </>
  );
}

