import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Phone, Mail, MapPin, 
  ArrowRight, CheckCircle2, 
  Send, Factory, Package, Users, Building2, MessageSquare
} from 'lucide-react';
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface CategoryCardProps {
  title: string;
  img: string;
  items?: string[];
  icon: React.ElementType;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#products' },
    { name: 'Mission', href: '#mission' },
    { name: 'Inquiry', href: '#inquiry' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-900 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl font-times font-bold tracking-tight text-white italic">
            Poorani Engineering
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 ml-4">
            <button className="text-xs font-bold text-white px-6 py-2.5 rounded-lg border border-zinc-700 hover:bg-white/5 transition-all">
              Sign In
            </button>
          </div>
        </div>

        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-zinc-900 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs font-black uppercase tracking-widest text-zinc-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-white text-black text-xs font-black py-4 rounded-xl">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10" />
        <img 
          src="/landing_page.jpeg" 
          alt="Metal Fabrication Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-20 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bebas leading-none tracking-wider mb-6 md:mb-10 mt-16 md:mt-20 text-white uppercase">
              Wholesale and <br /> 
              <span className="text-zinc-600">Retail</span>
            </h1>
            
            <p className="text-base md:text-xl text-zinc-400 max-w-xl leading-relaxed mb-10 md:mb-12 font-medium">
              We are leading manufacturer of comprehensive stainless steel products, specializing in high-performance equipment's For Bakeries, Hotels, Educational Institutions, Pavilion (Mandapam) And Commercial Kitchens Etc…!
            </p>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute left-10 bottom-0 top-1/2 w-[1px] bg-gradient-to-b from-transparent via-zinc-800 to-transparent hidden xl:block" />
    </section>
  );
};

const CategoryCard = ({ title, img, items, icon: Icon }: CategoryCardProps) => (
  <div className="relative h-full rounded-2xl border border-zinc-800 p-1 md:p-1.5 transition-all group">
    <GlowingEffect
      spread={40}
      glow={true}
      disabled={false}
      proximity={64}
      inactiveZone={0.01}
      borderWidth={2}
    />
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-all group-hover:bg-zinc-900"
    >
      {img && (
        <div className="h-40 sm:h-52 md:h-72 lg:h-80 relative overflow-hidden rounded-t-xl transition-all duration-700 w-full shrink-0 border-b border-zinc-800">
          <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-700" />
        </div>
      )}
      <div className="flex-1 py-4 px-4 md:py-6 md:px-6 flex flex-col justify-between min-h-[120px] md:min-h-[180px]">
        <div className="flex flex-col items-center justify-center flex-1">
          <h3 className="text-sm sm:text-base md:text-xl font-black mb-3 md:mb-6 text-white text-center uppercase tracking-tight leading-snug group-hover:text-blue-500 transition-colors">{title}</h3>
        </div>
        {items && items.length > 0 && (
          <ul className="space-y-3 mb-8">
            {items.map(item => (
              <li key={item} className="flex items-center gap-3 text-zinc-400">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                <span className="text-xs font-bold uppercase tracking-widest">{item}</span>
              </li>
            ))}
          </ul>
        )}
        <button className="w-full py-3 md:py-4 rounded-xl border border-zinc-800 text-zinc-400 font-black text-[9px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Explore Category
        </button>
      </div>
    </motion.div>
  </div>
);

const Categories = () => {
  const categoriesList = [
    { title: "Display counter", icon: Building2, img: "/Images%20of%20Cards/displaycounter_card_img.png" },
    { title: "Snacks counter", icon: Package, img: "/Images%20of%20Cards/Snacks%20counter_img.png" },
    { title: "Dining table", icon: Users, img: "/Images%20of%20Cards/Dinning%20Table_img.png" },
    { title: "Chair", icon: Building2, img: "/Images%20of%20Cards/Chair_img.png" },
    { title: "Tea stall", icon: Package, img: "/Images%20of%20Cards/Teashall_card_img.jpeg" },
    { title: "Juice stall", icon: Users, img: "/Images%20of%20Cards/Juice%20stall_img.png" },
    { title: "Working table", icon: Building2, img: "/Images%20of%20Cards/Working%20stall_img.png" },
    { title: "Hand wash Sink", icon: Package, img: "/Images%20of%20Cards/Sink_img.png" },
    { title: "Dosa Kal", icon: Users, img: "/Images%20of%20Cards/Dosa%20Kal_img.png" },
    { title: "Bainmarie counter", icon: Building2, img: "/Images%20of%20Cards/Bainmarie_counter_img.png" },
    { title: "Oven", icon: Package, img: "/Images%20of%20Cards/Oven_img.png" },
    { title: "Cake machine", icon: Users, img: "/Images%20of%20Cards/Cake%20Machine_img.png" },
    { title: "Domixer", icon: Building2, img: "/Images of Cards/Domixer_img.png" },
    { title: "Hotbox", icon: Package, img: "/Images%20of%20Cards/Hotbox_img.png" },
    { title: "Folding table", icon: Users, img: "/Images of Cards/Folding Table_img.png" },
    { title: "Shawarma machine", icon: Building2, img: "/Images%20of%20Cards/Shawarma%20machine_img.png" },
    { title: "Double range burner", icon: Package, img: "/Images%20of%20Cards/Double%20range%20burner_img.png" },
    { title: "Single range burner", icon: Package, img: "/Images%20of%20Cards/single%20range%20burner_img.png" },
    { title: "Fastfood counter", icon: Users, img: "/Images%20of%20Cards/Fastfood%20counter_img.png" },
    { title: "Watercan stand", icon: Building2, img: "/Images%20of%20Cards/watercan%20stand_img.png" },
    { title: "Design pcs", icon: Package, img: "/Images%20of%20Cards/Design%20pcs_img.png" },
    { title: "Standing table", icon: Users, img: "/Images%20of%20Cards/Standing%20table_img.png" },
    { title: "Trolly", icon: Building2, img: "/Images%20of%20Cards/Trolley_img.png" },
    { title: "Racks", icon: Package, img: "/Images%20of%20Cards/Rack_img.png" },
    { title: "Panipuri stall", icon: Users, img: "/Images%20of%20Cards/Panipuri%20stall_img.png" },
    { title: "Roadside stall", icon: Building2, img: "/Images%20of%20Cards/Roadside%20stall_img.png" },
    { title: "Lamp cage", icon: Package, img: "/Images%20of%20Cards/lamp%20cage_img.png" },
    { title: "Baby cradle", icon: Users, img: "/Images%20of%20Cards/Baby%20Cradle_img.png" },
    { title: "Appam Patra(Paniyaram Adupu)", icon: Building2, img: "/Images%20of%20Cards/Paniyaram%20Adupu_img.png" },
    { title: "Tandoor Oven(Tandoori Adupu)", icon: Package, img: "/Images of Cards/tandoori_img.png" },
    { title: "Uruli Stove", icon: Users, img: "/Images of Cards/Uruli Stove_img.png" },
    { title: "BBQ", icon: Building2, img: "/Images of Cards/BBQ_img.png" },
    { title: "SS Door", icon: Package, img: "/Images of Cards/ss door_img.png" },
    { title: "Stool", icon: Users, img: "/Images%20of%20Cards/Stool_img.png" },
    { title: "school desk &bench", icon: Building2, img: "/Images of Cards/school desk &bench_img.png" }
  ];

  return (
    <section id="products" className="py-16 md:py-32 bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="text-left max-w-3xl mb-10 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 md:mb-6 uppercase tracking-tight">Our Products</h2>
          <p className="text-zinc-500 text-base md:text-xl font-medium">We specialize in manufacturing highly durable and hygienic equipment.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {categoriesList.map((cat, i) => (
            <CategoryCard 
              key={i}
              title={cat.title} 
              icon={cat.icon}
              img={cat.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


const ContactAndInquiry = () => {
  return (
    <section id="inquiry" className="py-16 md:py-32 bg-zinc-950 text-white overflow-hidden relative border-t border-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 lg:gap-32 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-10 leading-[0.95] uppercase tracking-tighter">Ready to build <br /> your facility?</h2>
            <p className="text-zinc-500 text-base md:text-xl mb-10 md:mb-16 max-w-md font-medium">
              Contact our designers for a custom quote and 3D layout planning of your equipment requirements.
            </p>

            <div className="space-y-12">
              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0 border border-zinc-800">
                  <Phone className="w-6 h-6 text-zinc-400 font-black" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest text-zinc-500 mb-2">Speak to Experts</h4>
                  <p className="text-xl font-bold">
                    <a href="tel:+919384543135" className="hover:text-blue-500 transition-colors tracking-tight">+91 93845 43135</a>
                  </p>
                  <p className="text-xl font-bold">
                    <a href="tel:+917708844441" className="hover:text-blue-500 transition-colors tracking-tight">+91 77088 44441</a>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0 border border-zinc-800">
                  <Mail className="w-6 h-6 text-zinc-400" />
                </div>
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest text-zinc-500 mb-2">Email Inquiry</h4>
                  <p className="text-xl font-bold">
                    <a href="mailto:info@pooraniengineering.com" className="hover:text-blue-500 transition-colors tracking-tight text-sm">info@pooraniengineering.com</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="w-14 h-14 bg-zinc-900 rounded-xl flex items-center justify-center shrink-0 border border-zinc-800">
                  <MapPin className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="grow">
                  <h4 className="font-black text-sm uppercase tracking-widest text-zinc-500 mb-2">Factory Address</h4>
                  <p className="text-zinc-400 text-sm font-medium mb-8 leading-relaxed">
                    <a href="https://maps.app.goo.gl/kSEzW5BTQ9628ssBA?g_st=aw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors underline decoration-zinc-700 underline-offset-4">
                      kalapprai Thottam, 3/60-D, Ramanujar temple road, Erumapalayam, Salem, Tamil Nadu 636015
                    </a>
                  </p>
                  
                  <a href="https://maps.app.goo.gl/kSEzW5BTQ9628ssBA?g_st=aw" target="_blank" rel="noreferrer" className="block rounded-2xl overflow-hidden h-64 bg-zinc-900 border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] group relative">
                    <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-black/60 transition-all z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                      <span className="bg-white text-black text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl flex items-center gap-2 shadow-2xl scale-95 group-hover:scale-100 transition-all duration-300">
                        <MapPin className="w-4 h-4" /> Open in Maps
                      </span>
                    </div>
                    <iframe 
                      title="Factory Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.871049283726!2d78.1727056!3d11.6252801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babef0056b20d35%3A0x466d90f2d3ba71b1!2sPoorani%20engineering%20works!5e0!3m2!1sen!2sin!4v1710864000000!5m2!1sen!2sin"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, pointerEvents: 'none' }} 
                      allowFullScreen={true} 
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 p-10 md:p-14 rounded-3xl border border-zinc-800 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[100px] pointer-events-none" />
            <h3 className="text-white text-3xl font-black mb-10 uppercase tracking-tight">Request Initial Quote</h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Your Name</label>
                  <input type="text" className="w-full bg-black border border-zinc-800/50 rounded-xl p-5 text-white focus:ring-1 ring-zinc-700 transition-all placeholder:text-zinc-700" placeholder="John Doe" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Contact Number</label>
                  <input type="text" className="w-full bg-black border border-zinc-800/50 rounded-xl p-5 text-white focus:ring-1 ring-zinc-700 transition-all placeholder:text-zinc-700" placeholder="+91 00000 00000" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category</label>
                <select className="w-full bg-black border border-zinc-800/50 rounded-xl p-5 text-zinc-400 focus:ring-1 ring-zinc-700 transition-all appearance-none cursor-pointer">
                  <option>Bakery Equipment</option>
                  <option>Hostel / Bulk Kitchen</option>
                  <option>Commercial Kitchen</option>
                  <option>Custom Requirement</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Message / Dimensions</label>
                <textarea rows={4} className="w-full bg-black border border-zinc-800/50 rounded-xl p-5 text-white focus:ring-1 ring-zinc-700 transition-all placeholder:text-zinc-700" placeholder="Describe your project size or specific dimensions needed..."></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white py-6 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.2)] group">
                Send Inquiry Request <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-12 md:py-20 border-t border-zinc-900">
    <div className="container mx-auto px-6 md:px-10">
      <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl font-times font-bold tracking-tight text-white italic">
            Poorani Works
          </span>
        </div>
        
        <div className="flex gap-8 md:gap-12">
          {['Materials', 'Mission', 'Inquiry'].map(item => (
            <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 text-center">© 2024 Poorani Engineering Works. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <Navbar />
      <Hero />
      <Categories />
      <ContactAndInquiry />
      <Footer />
    </div>
  );
}

