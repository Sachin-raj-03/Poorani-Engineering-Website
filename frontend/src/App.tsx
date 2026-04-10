import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';

const VERSION = "1.0.5-DEBUG";
import { 
  Menu, X, Phone, Mail, MapPin, 
  ArrowRight, CheckCircle2, 
  Send, Factory, Package, Users, Building2, MessageSquare, Clock,
  ChevronLeft, ChevronRight, ShoppingCart, Info, Activity, Flame, Shield
} from 'lucide-react';
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Footer } from "@/components/ui/footer-section";
import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryImage,
  StoryOverlay,
  StoryTitle,
} from '@/components/ui/stories-carousel';

interface CategoryCardProps {
  title: string;
  img: string;
  items?: string[];
  icon: React.ElementType;
  onExplore?: () => void;
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
    { name: 'Products', href: '/#products', isExternal: false },
    { name: 'About Us', href: '/about', isExternal: true },
    { name: 'Privacy Policy', href: '/privacy', isExternal: true },
    { name: 'Terms & Conditions', href: '/terms', isExternal: true },
    { name: 'Inquiry', href: '/#inquiry', isExternal: false },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-zinc-900 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl md:text-3xl font-times font-bold tracking-tight text-white italic">
            Poorani Engineering
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            link.isExternal ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            )
          ))}
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
                link.isExternal ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-xs font-black uppercase tracking-widest text-zinc-400 focus:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xs font-black uppercase tracking-widest text-zinc-400 focus:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Common descriptions for categories
  const categoryDescriptions: Record<string, string> = {
    "Display counter": "Our premium display counters are designed to showcase your bakery and confectionery products with maximum visibility. Featuring high-clarity tempered glass and integrated LED lighting, these counters maintain optimal temperature while presenting your items elegantly.",
    "Dining table": "Built for high-traffic environments, our stainless steel dining tables combine extreme durability with easy-to-clean hygienic surfaces. Perfect for industrial canteens, school mess halls, and commercial food courts.",
    "Snacks counter": "Versatile and efficient snacks counters designed for quick-service environments. These units integrate storage, heating, and serving areas into a single ergonomic workstation for peak operational performance.",
    "Tea stall": "Professional-grade mobile and stationary tea stalls engineered for high-volume service. These units feature reinforced burner spaces and ample storage for all brewing essentials.",
    "Juice stall": "Hygienic and stylish juice extraction stations made from food-grade SS304. Designed to handle high-volume fruit processing while maintaining a clean, professional aesthetic for customers."
  };

  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const commonDescription = categoryDescriptions[categoryName || ""] || 
    `Discover our premium range of ${categoryName} manufacturing equipment. Precisely engineered for maximum durability, commercial hygiene, and everyday operational efficiency. All products adapt perfectly to intensive industrial usage, ensuring long-lasting performance and sleek integration into your professional environment.`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setErrorStatus(null);
        const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        console.log("Fetching from:", apiBaseUrl);
        const response = await fetch(`${apiBaseUrl}/api/products?category=${categoryName}`);
        
        if (!response.ok) {
           setErrorStatus(`Server Error: ${response.status}`);
        } else {
           const data = await response.json();
           setProducts(data);
           if (data.length === 0) setErrorStatus("Database match returned 0 items");
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setErrorStatus(`Connection Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchProducts();
    }
    window.scrollTo(0, 0);
  }, [categoryName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') setSelectedIndex((prev) => (prev !== null && prev < products.length - 1 ? prev + 1 : prev));
      if (e.key === 'ArrowLeft') setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, products.length]);

  return (
    <div className="min-h-screen bg-black text-white py-32 px-6 md:px-10">
      <div className="container mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 uppercase text-[10px] font-black tracking-widest group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 leading-none italic font-times">{categoryName}</h1>
            <div className="w-32 h-2 bg-blue-600 rounded-full mb-10" />
          </motion.div>
        </div>

        <div className="flex items-center justify-between mb-10 border-b border-zinc-900 pb-10">
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Product Gallery</h2>
              <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest italic">{products.length} Items Available</p>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600"><Activity size={16}/></div>
           </div>
        </div>

        {selectedIndex !== null && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl"
              onClick={() => setSelectedIndex(null)}
            >
              <button 
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors z-[110] p-3 md:p-4 bg-zinc-900/50 rounded-full border border-zinc-800"
                onClick={() => setSelectedIndex(null)}
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Navigation Buttons - Responsive Sizing */}
              <button 
                className={`absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] p-3 md:p-4 bg-zinc-900/50 rounded-full border border-zinc-800 ${selectedIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedIndex !== null && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
                }}
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <button 
                className={`absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110] p-3 md:p-4 bg-zinc-900/50 rounded-full border border-zinc-800 ${selectedIndex === products.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedIndex !== null && selectedIndex < products.length - 1) setSelectedIndex(selectedIndex + 1);
                }}
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
              
              <motion.div 
                key={selectedIndex}
                initial={{ scale: 0.9, opacity: 0, x: 20 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0.9, opacity: 0, x: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 80 && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
                  else if (info.offset.x < -80 && selectedIndex < products.length - 1) setSelectedIndex(selectedIndex + 1);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedIndex < products.length - 1) {
                    setSelectedIndex(selectedIndex + 1);
                  }
                }}
                className={`relative max-w-5xl w-full flex flex-col items-center justify-center gap-12 group ${selectedIndex === products.length - 1 ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="relative w-full flex items-center justify-center">
                  <img 
                    src={products[selectedIndex].image_url} 
                    alt="Full view" 
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-[0_0_100px_rgba(37,99,235,0.2)] border border-zinc-800/50 transition-all duration-500" 
                  />
                </div>

                {/* Thumbnail Strip */}
                <div className="flex items-center gap-3 px-4 py-4 bg-zinc-900/30 backdrop-blur-md rounded-2xl border border-zinc-800/50 max-w-full overflow-x-auto no-scrollbar" onClick={(e) => e.stopPropagation()}>
                    {products.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedIndex(i)}
                            className={`relative shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                                selectedIndex === i ? 'border-blue-500 scale-110 shadow-[0_0_20px_rgba(59,130,246,0.5)]' : 'border-transparent opacity-40 hover:opacity-100'
                            }`}
                        >
                            <img src={p.image_url} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>

                <div className="text-center">
                   <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.5em]">
                     Poorani Engineering Works • Image {selectedIndex + 1} of {products.length}
                   </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64 mb-20">
            <div className="w-12 h-12 border-4 border-zinc-800 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <Stories className="mb-20">
            <StoriesContent>
              {products.map((product, idx) => (
                <Story 
                  key={product.id || idx} 
                  className="aspect-[4/5]" 
                  onClick={() => setSelectedIndex(idx)}
                >
                  <StoryImage alt={product.name || `${categoryName} Item`} src={product.image_url} />
                  <StoryOverlay side="top" />
                  <StoryOverlay side="bottom" />
                  <StoryTitle className="truncate font-black text-[10px] uppercase tracking-[0.3em] text-white/90">
                    {categoryName} • PHOTO {idx + 1}
                  </StoryTitle>
                  <StoryAuthor>
                    <StoryAuthorImage
                      fallback="PEW"
                      name="Poorani Engineering"
                      className="size-8"
                    />
                    <StoryAuthorName className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">View Details</StoryAuthorName>
                  </StoryAuthor>
                </Story>
              ))}
            </StoriesContent>
          </Stories>
        ) : (
          <div className="text-center py-32 bg-zinc-900/30 rounded-[3rem] border border-zinc-800 border-dashed mb-20">
            <Package className="w-16 h-16 text-zinc-800 mx-auto mb-6 opacity-50" />
            <p className="text-zinc-600 uppercase text-xs font-black tracking-widest">Gallery empty for this category</p>
            <button className="mt-8 bg-zinc-800 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-zinc-700 transition-all">
              Request Catalog
            </button>
          </div>
        )}

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-zinc-900/40 border border-zinc-800/50 p-8 md:p-12 rounded-[2rem] backdrop-blur-sm relative overflow-hidden group max-w-4xl"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Info className="w-24 h-24 text-blue-500" />
          </div>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4">Category Overview</h3>
          <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed relative z-10">
            {commonDescription}
          </p>
        </motion.div>
      </div>
    </div>
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

const CategoryModal = ({ category, onClose }: { category: any, onClose: () => void }) => {
  if (!category) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-zinc-950 border border-zinc-800 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-white hover:text-black border border-zinc-800 rounded-full flex items-center justify-center text-zinc-400 transition-all backdrop-blur-md"
          >
            <X size={20} />
          </button>

          {/* Left Side: Images */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-zinc-800">
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden relative group shrink-0">
              <img src={category.img} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
            </div>
            {/* Gallery Placeholders */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
               <div key={i} className="aspect-square rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center group cursor-pointer relative">
                  <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest z-10 px-2 text-center leading-tight">Image<br/>{i}</span>
                  <div className="absolute inset-0 bg-zinc-800/0 group-hover:bg-zinc-800/50 transition-colors" />
               </div>
              ))}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
               <category.icon className="w-8 h-8 text-blue-500" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6">
              {category.title}
            </h2>
            <div className="w-20 h-1 bg-blue-600 rounded-full mb-8" />
            
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-8">
              Discover our premium <strong>{category.title}</strong>, precisely engineered for maximum durability, commercial hygiene, and everyday operational efficiency. All products adapt perfectly to intensive institutional usage, ensuring long-lasting performance and sleek integration into your professional environment.
            </p>
            
            <div className="space-y-4 mb-10 bg-black/50 p-6 rounded-2xl border border-zinc-800/50">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Key Advantages</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-zinc-300">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-blue-500" /></div>
                  <span className="text-sm font-medium leading-tight">100% Commercial Grade Stainless Steel Material</span>
                </li>
                <li className="flex items-start gap-4 text-zinc-300">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-blue-500" /></div>
                  <span className="text-sm font-medium leading-tight">Precision Welded & Corrosion Resistant Finish</span>
                </li>
                <li className="flex items-start gap-4 text-zinc-300">
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-blue-500" /></div>
                  <span className="text-sm font-medium leading-tight">Fully Customizable Dimensions tailored to space</span>
                </li>
              </ul>
            </div>

            <a 
              href="#inquiry" 
              onClick={onClose}
              className="w-full bg-white text-black py-5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all group shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              Request Custom Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CategoryCard = ({ title, img, items, icon: Icon, onExplore }: CategoryCardProps) => (
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
        <button 
          onClick={onExplore}
          className="w-full py-3 md:py-4 rounded-xl border border-zinc-800 text-zinc-400 font-black text-[9px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer relative z-10">
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
    { title: "Triple range burner", icon: Flame, img: "/Images%20of%20Cards/Triple%20range%20burner_img.png" },
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
    { title: "Tandoori Adupu", icon: Package, img: "/Images of Cards/tandoori_img.png" },
    { title: "Uruli Stove", icon: Users, img: "/Images of Cards/Uruli Stove_img.png" },
    { title: "BBQ", icon: Building2, img: "/Images of Cards/BBQ_img.png" },
    { title: "SS Door", icon: Package, img: "/Images of Cards/ss door_img.png" },
    { title: "Stool", icon: Users, img: "/Images%20of%20Cards/Stool_img.png" },
    { title: "school desk &bench", icon: Building2, img: "/Images of Cards/school desk &bench_img.png" }
  ];

  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const navigate = useNavigate();

  // Stop body scroll when modal is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedCategory]);

  return (
    <section id="products" className="py-16 md:py-32 bg-zinc-950 relative">
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
              onExplore={() => navigate(`/explore/${encodeURIComponent(cat.title)}`)}
            />
          ))}
        </div>
      </div>

      {selectedCategory && (
        <CategoryModal 
          category={selectedCategory} 
          onClose={() => setSelectedCategory(null)} 
        />
      )}
    </section>
  );
};




const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12">Privacy <span className="text-zinc-600">Policy</span></h1>
        
        <div className="prose prose-invert prose-zinc max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">1. Introduction</h2>
            <p className="text-zinc-400 leading-relaxed font-medium">Welcome to Poorani Engineering Works. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>Name, phone number, and email address</li>
              <li>Business or company details (if provided)</li>
              <li>Delivery address</li>
              <li>Any information you submit through contact forms or inquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process orders and communicate order updates</li>
              <li>Improve our products, services, and website</li>
              <li>Send important updates related to your orders or our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">4. Cookies and Tracking</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>Our website may use cookies to enhance user experience.</li>
              <li>Cookies help us understand website traffic and improve functionality.</li>
              <li>You can choose to disable cookies through your browser settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">5. Data Sharing</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>We do not sell, trade, or rent your personal information.</li>
              <li>Your data may be shared with trusted third parties only for business purposes such as delivery services or payment processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">6. Data Security</h2>
            <p className="text-zinc-400 leading-relaxed font-medium">We take appropriate measures to protect your personal information from unauthorized access, misuse, or disclosure. However, no method of online transmission is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">8. Your Rights</h2>
            <p className="text-zinc-400 leading-relaxed font-medium">You have the right to request access, correction, or deletion of your personal data. You may contact us at any time regarding your data.</p>
          </section>

          <section className="p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800">
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">9. Contact Us</h2>
            <div className="space-y-4 text-zinc-400 font-bold">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-500" /> pooraniengg@gmail.com</p>
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-blue-500" /> +91 93845 43135</p>
                <p className="flex items-center gap-3 ml-8">+91 77088 44441</p>
              </div>
              <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-blue-500" /> 3/60 D, Ramanujar Temple Road, Erumapalayam, Salem - 636015</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12">Terms & <span className="text-zinc-600">Conditions</span></h1>
        
        <div className="prose prose-invert prose-zinc max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">1. Introduction</h2>
            <p className="text-zinc-400 leading-relaxed font-medium">Welcome to Poorani Engineering Works. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">2. About Us</h2>
            <p className="text-zinc-400 leading-relaxed font-medium">We are a manufacturing company specializing in stainless steel and glass products for bakeries, hostels, and commercial kitchens. Our products include (but are not limited to) storage units, display counters, racks, and custom equipment.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">3. Use of Website</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>You agree to use this website only for lawful purposes.</li>
              <li>You must not misuse this website or attempt unauthorized access.</li>
              <li>All content on this website is for general information only and may change without notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">4. Product Information</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>We strive to ensure all product details, images, and specifications are accurate.</li>
              <li>However, product images may show slight variations due to lighting, reflections (especially on stainless steel and glass surfaces), and display settings.</li>
              <li>The actual product may differ slightly from the images shown.</li>
              <li>Custom orders may also vary slightly from displayed designs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">5. Orders and Payments</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>Orders are confirmed only after approval and payment (full or partial).</li>
              <li>Prices are subject to change without prior notice.</li>
              <li>For custom manufacturing, advance payment may be required.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">6. Delivery and Shipping</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>Delivery timelines are estimates and may vary depending on production and location.</li>
              <li>We are not responsible for delays caused by external factors such as logistics or natural events.</li>
              <li>Customers must inspect products upon delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">7. Returns and Refunds</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>Since most products are custom-made, returns may not be accepted unless there is a manufacturing defect.</li>
              <li>Any damage or defect must be reported within 2 days of delivery.</li>
              <li>Refunds, if applicable, will be processed based on company policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">8. Warranty</h2>
            <ul className="list-disc pl-5 text-zinc-400 space-y-2 font-medium">
              <li>Warranty (if provided) applies only to manufacturing defects.</li>
              <li>It does not cover damage caused by misuse, improper installation, or normal wear and tear.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">9. Intellectual Property</h2>
            <p className="text-zinc-400 leading-relaxed font-medium">All content, including images, logos, and designs, are the property of Poorani Engineering Works. Unauthorized use or reproduction is strictly prohibited.</p>
          </section>

          <section className="p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800">
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6">10. Contact Us</h2>
            <div className="space-y-4 text-zinc-400 font-bold">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-blue-500" /> pooraniengg@gmail.com</p>
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-blue-500" /> +91 93845 43135</p>
                <p className="flex items-center gap-3 ml-8">+91 77088 44441</p>
              </div>
              <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-blue-500" /> 3/60 D, Ramanujar Temple Road, Erumapalayam, Salem - 636015</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-12 italic font-times">
          About <br /> <span className="text-zinc-600">Us</span>
        </h1>
        <div className="w-32 h-2 bg-blue-600 rounded-full mb-16" />

        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-6">Who We Are</h2>
            <p className="text-zinc-400 text-xl leading-relaxed font-medium">
              Welcome to Poorani Engineering Works, a trusted manufacturer of high-quality stainless steel and glass products. We specialize in designing and producing durable, hygienic, and modern equipment for bakeries, hostels, and commercial kitchens.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-6 border-l-4 border-blue-600 pl-6">What We Do</h2>
            <p className="text-zinc-400 text-lg mb-8 font-medium">At Poorani Engineering Works, we manufacture a wide range of products including:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 "Bakery display counters",
                 "Stainless steel racks and storage units",
                 "Kitchen equipment and workstations",
                 "Hostel and industrial utility items",
                 "Custom-designed stainless steel and glass products"
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
                    <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                    <span className="text-zinc-300 font-bold uppercase text-xs tracking-widest">{item}</span>
                 </div>
               ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section className="p-10 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem]">
              <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                <Flame className="w-6 h-6 text-blue-500" /> Our Mission
              </h2>
              <p className="text-zinc-400 leading-relaxed font-medium">
                Our mission is to deliver reliable, innovative, and cost-effective solutions that meet the needs of our customers while maintaining superior quality and craftsmanship.
              </p>
            </section>

            <section className="p-10 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem]">
              <h2 className="text-xl font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-blue-500" /> Our Vision
              </h2>
              <p className="text-zinc-400 leading-relaxed font-medium">
                To become a leading manufacturer in the stainless steel and glass industry by continuously improving our designs, technology, and customer satisfaction.
              </p>
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-8 border-l-4 border-blue-600 pl-6">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { title: "High-quality materials", desc: "Stainless steel & glass" },
                 { title: "Strong construction", desc: "Durable and long-lasting" },
                 { title: "Custom design", desc: "Tailored to your needs" },
                 { title: "Timely delivery", desc: "Manufacturing speed" },
                 { title: "Customer focused", desc: "Your satisfaction first" }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900/40 transition-colors group text-center">
                    <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2 group-hover:text-blue-500 transition-colors">{item.title}</h3>
                    <p className="text-zinc-600 text-[10px] font-black uppercase tracking-tighter">{item.desc}</p>
                 </div>
               ))}
            </div>
          </section>

          <section className="p-12 bg-white text-black rounded-[3rem] text-center">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Our Commitment</h2>
            <p className="text-sm md:text-base font-bold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
              We are committed to providing products that combine strength, safety, and modern design. Whether it’s a small kitchen setup or large-scale industrial requirement, we ensure every product meets your expectations.
            </p>
          </section>

          <section className="p-12 bg-zinc-900/30 rounded-[3rem] border border-zinc-800">
            <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-10">Contact Us</h2>
            <p className="text-zinc-500 font-bold mb-8 uppercase text-xs tracking-widest italic">We would love to work with you and support your business needs.</p>
            <div className="space-y-6 text-zinc-300 font-bold">
              <p className="flex items-center gap-4"><Mail className="w-6 h-6 text-blue-500" /> pooraniengg@gmail.com</p>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-4"><Phone className="w-6 h-6 text-blue-500" /> +91 93845 43135</p>
                <p className="flex items-center gap-4 ml-10">+91 77088 44441</p>
              </div>
              <p className="flex items-center gap-4"><MapPin className="w-6 h-6 text-blue-500" /> 3/60 D, Ramanujar Temple Road, Erumapalayam, Salem - 636015</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <section id="mission" className="py-24 md:py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
             <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-6">Since 2004</h4>
             <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-10">
               Engineering Excellence in <span className="text-zinc-500">Stainless Steel</span>
             </h2>
             <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-medium">
               <p>
                 Poorani Engineering Works is a leading manufacturer of comprehensive stainless steel products, specializing in high-performance equipment for Bakeries, Hotels, Educational Institutions, and Commercial Kitchens.
               </p>
               <p>
                 Our commitment to using premium SS 304 grade materials ensures that every product we build meets the highest standards of durability and hygiene.
               </p>
             </div>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
             <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
                <Shield className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2">Quality</h3>
                <p className="text-zinc-500 text-sm">Certified SS 304 Grade material for life-long durability.</p>
             </div>
             <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
                <Factory className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2">Precision</h3>
                <p className="text-zinc-500 text-sm">Advanced manufacturing for perfect dimensional accuracy.</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Inquiry = () => {
  return (
    <section id="inquiry" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 md:px-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">Ready to Work with Us?</h2>
        <p className="text-zinc-500 text-xl mb-12 max-w-2xl mx-auto italic font-medium">Get a custom quote for your industrial kitchen or commercial project today.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="tel:+919384543135" className="bg-white text-black px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Call Now</a>
          <a href="mailto:pooraniengg@gmail.com" className="bg-zinc-900 text-white border border-zinc-800 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all">Send Email</a>
        </div>
      </div>
    </section>
  );
};

const WhatsAppButton = () => (
  <a
    href="https://wa.me/919384543135"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] bg-[#25D366] text-white p-3.5 md:p-4.5 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-2 transition-all duration-300 group"
    aria-label="Enquire on WhatsApp"
  >
    <svg 
      viewBox="0 0 24 24" 
      className="w-6 h-6 md:w-8 md:h-8"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-widest py-2.5 px-5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-800 pointer-events-none shadow-2xl backdrop-blur-md">
      Chat with us
    </span>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Categories />
            <Inquiry />
          </>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/explore/:categoryName" element={<CategoryPage />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

