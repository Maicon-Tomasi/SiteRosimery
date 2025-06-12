import Banner from "./components/Banner/banner";
import Sobre from "./components/Sobre/sobre";

export default function Home() {
  return (
    <>
    {/* bg-gradient-to-br from-[#faf0f0] to-[#e9adb7] */}
    <div className="min-h-screen overflow-x-hidden">
      <Banner />
      <Sobre />
    </div>
    </>
  );
}

