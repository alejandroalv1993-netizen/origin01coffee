import { InteractiveProductCard } from "@/components/ui/card-7";
import { Coffee, Zap, Droplets, Leaf, Instagram, Twitter, Facebook } from "lucide-react";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#043cd5] selection:text-white font-body">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#043cd5] flex items-center justify-center">
              <Coffee className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter font-heading italic">
              Origin <span className="text-[#043cd5]">01</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-white/60">
            <a href="#" className="transition-colors hover:text-white">Shop</a>
            <a href="#" className="transition-colors hover:text-white">Origin</a>
            <a href="#" className="transition-colors hover:text-white">Process</a>
            <a href="#" className="transition-colors hover:text-white">Contact</a>
          </div>
          <button className="rounded-full bg-white/5 px-6 py-2 text-xs font-bold uppercase tracking-widest text-white border border-white/10 hover:bg-white/10 transition-all">
            Account
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Gradients */}
        <div className="absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[#043cd5]/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-[#043cd5]/10 blur-[100px]" />
        
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#043cd5] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#043cd5]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Fresh Batch Just Roasted</span>
          </div>
          
          <h1 className="mb-8 text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] font-heading italic">
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/20">
              Coffee Ritual
            </span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-2xl text-lg text-white/50 md:text-xl font-body leading-relaxed">
            Descubre la excelencia en cada grano. Importamos, tostamos y servimos café de especialidad con una obsesión por el detalle y el origen.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto rounded-full bg-[#043cd5] px-10 py-4 text-sm font-black uppercase tracking-widest text-white shadow-[0_10px_40px_rgba(4,60,213,0.4)] transition-all hover:scale-105 hover:bg-[#0334b5] active:scale-95">
              Explorar Catálogo
            </button>
            <button className="w-full sm:w-auto rounded-full border border-white/10 bg-white/5 px-10 py-4 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md hover:bg-white/10 transition-all">
              Nuestro Proceso
            </button>
          </div>
        </div>

        {/* Floating elements decor */}
        <div className="absolute bottom-10 left-10 hidden lg:block opacity-20">
          <div className="text-[150px] font-black text-white/5 select-none leading-none font-heading italic">01</div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-white py-32 px-6">
        <div className="container mx-auto">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-none mb-6 font-heading italic">
                Nuestra <br />
                <span className="text-[#043cd5]">Selección</span>
              </h2>
              <p className="text-black/60 text-lg font-medium font-body leading-relaxed">
                Cada origen cuenta una historia única. Desde las faldas de los Andes hasta los valles volcánicos de Indonesia.
              </p>
            </div>
            <div className="flex items-center gap-4 pb-2">
              <div className="h-px w-20 bg-black/10" />
              <span className="text-sm font-black uppercase tracking-widest text-black/40 font-body">Est. 2024</span>
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
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <Coffee className="h-8 w-8 text-[#043cd5]" />
                <span className="text-2xl font-black uppercase tracking-tighter font-heading italic">
                  Origin <span className="text-[#043cd5]">01</span>
                </span>
              </div>
              <p className="text-white/40 max-w-sm mb-8 leading-relaxed font-body">
                Redefiniendo la experiencia del café de especialidad a través de la innovación y el respeto por el origen.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#043cd5] transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#043cd5] transition-all">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#043cd5] transition-all">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-white">Links</h4>
              <ul className="space-y-4 text-white/40 text-sm font-medium">
                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-white">Newsletter</h4>
              <p className="text-white/40 text-sm mb-6 leading-relaxed">Únete a nuestra comunidad y recibe noticias sobre lanzamientos exclusivos.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#043cd5] transition-all" />
                <button className="bg-[#043cd5] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#0334b5] transition-all">OK</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">
            © 2024 Origin 01 Coffee Roasters. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
