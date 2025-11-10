import Tentang from "./component/About/page";
import Koleksi from "./component/Collection/page";
import Contact from "./component/Contact/page";
import Fitur from "./component/Fiturr/page";
import Hero from "./component/Hero/page";
import Statistik from "./component/Statistic/page";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full overflow-hidden bg-white">
      <Hero/>
      <Statistik/>
      <Tentang/>
      <Koleksi/>
      <Fitur/>
      <Contact/>
    </div>
  )
}
