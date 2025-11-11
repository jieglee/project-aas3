import Tentang from "./component/LandingPage/About/page";
import Koleksi from "./component/LandingPage/Collection/page";
import Contact from "./component/LandingPage/Peta/page";
import Fitur from "./component/LandingPage/Fiturr/page";
import Hero from "./component/LandingPage/Hero/page";
import Statistik from "./component/LandingPage/Statistic/page";
import Footer from "./component/LandingPage/Footer/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden bg-white">
      <Hero/>
      <Statistik/>
      <Tentang/>
      <Koleksi/>
      <Fitur/>
      <Contact/>
      <Footer/>
    </div>
  )
}
