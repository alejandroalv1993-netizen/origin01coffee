import { useRef } from 'react'
import { InteractiveProductCard } from "@/components/ui/card-7";
import { HeroSection } from "@/components/HeroSection";
import { IntroOverlay } from '@/components/IntroOverlay'
import { LogoSwap } from "@/components/ui/LogoSwap";
import { Instagram, Twitter, Facebook, Coffee, ShoppingBag, Info, Phone } from "lucide-react";
import { CircleMenu } from "@/components/ui/circle-menu";
import { FlowButton } from "@/components/ui/FlowButton";
import { ProductCarousel } from "@/components/ProductCarousel";

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
  },
  {
    title: "Origin Mug",
    description: "Taza cerámica de alta resistencia. Minimalismo en cada sorbo.",
    price: "12.00€",
    imageUrl: "/assets/Merch/Mug.png",
    logoUrl: "https://api.iconify.design/lucide:coffee.svg?color=white",
  },
  {
    title: "Origin Tote",
    description: "Bolsa de algodón orgánico. Lleva tu café a todas partes con estilo.",
    price: "15.00€",
    imageUrl: "/assets/Merch/bag (1).png",
    logoUrl: "https://api.iconify.design/lucide:shopping-bag.svg?color=white",
  },
  {
    title: "Logo Tee v1",
    description: "Camiseta 100% algodón. Diseño exclusivo Origin 01 con corte premium.",
    price: "25.00€",
    imageUrl: "/assets/Merch/tee1 (1).png",
    logoUrl: "https://api.iconify.design/lucide:shirt.svg?color=white",
  },
  {
    title: "Logo Tee v2",
    description: "Camiseta 100% algodón. Gráfica minimalista y durabilidad superior.",
    price: "25.00€",
    imageUrl: "/assets/Merch/tee1 (2).png",
    logoUrl: "https://api.iconify.design/lucide:shirt.svg?color=white",
  },
  {
    title: "Thermal Bottle",
    description: "Acero inoxidable. Mantiene tu café caliente por 12 horas.",
    price: "22.00€",
    imageUrl: "/assets/Merch/termo.png",
    logoUrl: "https://api.iconify.design/lucide:thermometer.svg?color=white",
  },
  {
    title: "Origin Glass",
    description: "Vaso de borosilicato. La transparencia del café perfecto.",
    price: "14.00€",
    imageUrl: "/assets/Merch/vaso.png",
    logoUrl: "https://api.iconify.design/lucide:glass-water.svg?color=white",
  }
];

const menuItems = [
  { label: "Tienda", icon: <ShoppingBag size={24} className="text-white" />, href: "#" },
  { label: "Sobre Nosotros", icon: <Info size={24} className="text-white" />, href: "#" },
  { label: "Cafés", icon: <Coffee size={24} className="text-white" />, href: "#" },
  { label: "Contacto", icon: <Phone size={24} className="text-white" />, href: "#" },
];

function App() {
  const mascotRef = useRef<HTMLImageElement>(null)
  return (
    <div className="min-h-screen text-[#2C1F14] selection:bg-[#043cd5] selection:text-white font-body">
      <IntroOverlay targetRef={mascotRef} />
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#2C1F14]/10 bg-[#F5F0E8]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-14 sm:h-20 items-center px-3 sm:px-6">
          {/* Left: Branding */}
          <div className="flex flex-1 items-center gap-3">
            <span
              className="text-2xl tracking-tighter text-[#043cd5] font-brand"
            >
              Origin 01
            </span>
          </div>
          
          {/* Center: Navigation Menu */}
          <div className="flex flex-1 justify-center">
             <CircleMenu 
               items={menuItems} 
               mode="dropdown" 
               openIcon={<LogoSwap className="h-16 w-16" />}
             />
          </div>

          {/* Right: Empty for balance (was Account) */}
          <div className="flex-1 flex justify-end">
            <FlowButton text="Login" variant="outline" className="hidden sm:flex text-sm px-6 h-10" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection mascotRef={mascotRef} />

      {/* Products Section */}
      <section className="bg-[#F5F0E8]/80 py-32">
        <div className="container mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#2C1F14] leading-none mb-6 font-heading">
                Nuestra <br />
                <span className="text-[#043cd5]">Selección</span>
              </h2>
              <p className="text-[#2C1F14]/60 text-lg font-medium font-body leading-relaxed">
                Desde los mejores granos de especialidad hasta el merchandising oficial de Origin 01.
              </p>
            </div>
            <div className="flex items-center gap-4 pb-2">
              <div className="h-px w-20 bg-[#2C1F14]/10" />
              <span className="text-sm font-black uppercase tracking-widest text-[#2C1F14]/40 font-body">Est. 2024</span>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <ProductCarousel products={products} />
      </section>

      {/* Footer */}
      <footer className="bg-[#F5F0E8]/80 py-20 px-6 border-t border-[#2C1F14]/10 backdrop-blur-md">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="text-2xl tracking-tighter text-[#043cd5] font-brand"
                >
                  Origin 01
                </span>
              </div>
              <p className="text-black/60 max-w-sm mb-8 leading-relaxed font-body">
                Redefiniendo la experiencia del café de especialidad a través de la innovación y el respeto por el origen.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center border border-black/10 text-black hover:bg-[#043cd5] hover:text-white transition-all">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center border border-black/10 text-black hover:bg-[#043cd5] hover:text-white transition-all">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-black/5 flex items-center justify-center border border-black/10 text-black hover:bg-[#043cd5] hover:text-white transition-all">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-black">Links</h4>
              <ul className="space-y-4 text-black/50 text-sm font-medium">
                <li><a href="#" className="hover:text-[#043cd5] transition-colors">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-[#043cd5] transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-[#043cd5] transition-colors">Envíos</a></li>
                <li><a href="#" className="hover:text-[#043cd5] transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 text-black">Newsletter</h4>
              <p className="text-black/50 text-sm mb-6 leading-relaxed">Únete a nuestra comunidad y recibe noticias sobre lanzamientos exclusivos.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-1 bg-black/5 border border-black/10 rounded-lg px-4 py-2 text-sm text-black placeholder:text-black/30 outline-none focus:border-[#043cd5] transition-all" />
                <FlowButton text="OK" variant="primary" />
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-black/10 text-center text-black/30 text-[10px] uppercase tracking-[0.3em] font-bold">
            © 2024 Origin 01 Coffee Roasters. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
