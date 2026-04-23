import { InteractiveProductCard } from "@/components/ui/card-7";
import { HeroSection } from "@/components/HeroSection";
import { Instagram, Twitter, Facebook } from "lucide-react";

const products = [
  {
    title: "Classic Origin",
    description: "Nuestro blend insignia. Notas equilibradas a chocolate y caramelo.",
    price: "18.50€",
    imageUrl: "/assets/classic_v.png",
    logoUrl: "https://api.iconify.design/lucide:coffee.svg?color=white",
  },
  {
    title: "Double Roasted",
    description: "Tueste intenso para los amantes del cuerpo y la potencia. Notas a cacao puro.",
    price: "21.00€",
    imageUrl: "/assets/double_v.png",
    logoUrl: "https://api.iconify.design/lucide:zap.svg?color=white",
  },
  {
    title: "Honey Process",
    description: "Dulzor natural con matices de frutas amarillas y miel. Edición artesanal.",
    price: "24.90€",
    imageUrl: "/assets/honey_v.png",
    logoUrl: "https://api.iconify.design/lucide:droplets.svg?color=white",
  },
  {
    title: "Matcha Selection",
    description: "Grado ceremonial directamente desde Japón. Energía pura y color vibrante.",
    price: "29.00€",
    imageUrl: "/assets/matcha_v.png",
    logoUrl: "https://api.iconify.design/lucide:leaf.svg?color=white",
  }
];

function App() {
  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#2C1F14] selection:bg-[#043cd5] selection:text-white font-body">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#2C1F14]/10 bg-[#F5F0E8]/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo (2).png"
              alt="Origin 01 mascot"
              className="h-12 w-12 object-contain"
            />
            <span
              className="text-xl tracking-wider text-[#043cd5]"
              style={{ fontFamily: "'Monoton', cursive" }}
            >
              Origin 01
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-[#2C1F14]/60">
            <a href="#" className="transition-colors hover:text-[#2C1F14]">Shop</a>
            <a href="#" className="transition-colors hover:text-[#2C1F14]">Origin</a>
            <a href="#" className="transition-colors hover:text-[#2C1F14]">Process</a>
            <a href="#" className="transition-colors hover:text-[#2C1F14]">Contact</a>
          </div>
          <button className="rounded-full bg-[#2C1F14]/5 px-6 py-2 text-xs font-bold uppercase tracking-widest text-[#2C1F14] border border-[#2C1F14]/10 hover:bg-[#2C1F14]/10 transition-all">
            Account
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Products Section */}
      <section className="bg-[#F5F0E8] py-32 px-6">
        <div className="container mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#2C1F14] leading-none mb-6 font-heading italic">
                Nuestra <br />
                <span className="text-[#043cd5]">Selección</span>
              </h2>
              <p className="text-[#2C1F14]/60 text-lg font-medium font-body leading-relaxed">
                Cada origen cuenta una historia única. Desde las faldas de los Andes hasta los valles volcánicos de Indonesia.
              </p>
            </div>
            <div className="flex items-center gap-4 pb-2">
              <div className="h-px w-20 bg-[#2C1F14]/10" />
              <span className="text-sm font-black uppercase tracking-widest text-[#2C1F14]/40 font-body">Est. 2024</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product, index) => (
              <InteractiveProductCard
                key={index}
                {...product}
                className="mx-auto shadow-2xl"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C1F14] py-20 px-6 border-t border-[#F5F0E8]/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <img
                  src="/assets/logo (2).png"
                  alt="Origin 01 mascot"
                  className="h-12 w-12 object-contain"
                />
                <span
                  className="text-2xl tracking-wider text-[#043cd5]"
                  style={{ fontFamily: "'Monoton', cursive" }}
                >
                  Origin 01
                </span>
              </div>
              <p className="text-[#F5F0E8]/50 max-w-sm mb-8 leading-relaxed font-body">
                Redefiniendo la experiencia del café de especialidad a través de la innovación y el respeto por el origen.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10 text-[#F5F0E8] hover:bg-[#043cd5] transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10 text-[#F5F0E8] hover:bg-[#043cd5] transition-all">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-[#F5F0E8]/5 flex items-center justify-center border border-[#F5F0E8]/10 text-[#F5F0E8] hover:bg-[#043cd5] transition-all">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#F5F0E8]">Links</h4>
              <ul className="space-y-4 text-[#F5F0E8]/40 text-sm font-medium">
                <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-[#F5F0E8] transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-[#F5F0E8]">Newsletter</h4>
              <p className="text-[#F5F0E8]/40 text-sm mb-6 leading-relaxed">Únete a nuestra comunidad y recibe noticias sobre lanzamientos exclusivos.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-1 bg-[#F5F0E8]/5 border border-[#F5F0E8]/10 rounded-lg px-4 py-2 text-sm text-[#F5F0E8] placeholder:text-[#F5F0E8]/30 outline-none focus:border-[#043cd5] transition-all" />
                <button className="bg-[#043cd5] px-4 py-2 rounded-lg text-sm font-bold text-white hover:bg-[#0334b5] transition-all">OK</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-[#F5F0E8]/5 text-center text-[#F5F0E8]/20 text-[10px] uppercase tracking-[0.3em] font-bold">
            © 2024 Origin 01 Coffee Roasters. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
