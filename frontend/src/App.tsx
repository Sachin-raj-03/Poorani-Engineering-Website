import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';

const VERSION = "1.0.5-DEBUG";
import { 
  Menu, X, Phone, Mail, MapPin, Search,
  ArrowRight, CheckCircle2, 
  Send, Factory, Package, Users, Building2, MessageSquare, Clock,
  ChevronLeft, ChevronRight, ShoppingCart, Info, Activity, Flame, Shield,
  Sun, Moon
} from 'lucide-react';
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Footer } from "@/components/ui/footer-section";
import NavMenu from "@/components/ui/menu-hover-effects";
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
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', isExternal: true },
    { name: 'Products', href: '/#products', isExternal: false },
    { name: 'About Us', href: '/about', isExternal: true },
    { name: 'Privacy Policy', href: '/privacy', isExternal: true },
    { name: 'Terms & Conditions', href: '/terms', isExternal: true },
    { name: 'Inquiry', href: '/#inquiry', isExternal: false },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-background/90 backdrop-blur-md border-b border-border py-3 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="w-full pl-[10px] pr-6 md:pr-12 flex justify-between items-center relative">
        <Link 
          to="/" 
          className="flex items-center gap-4 z-10 hover:opacity-80 transition-opacity"
        >
          <img 
            src="/Logo_bg/l1.png" 
            alt="Logo" 
            className="w-12 h-12 md:w-20 md:h-20 object-contain"
          />
          <img 
            src="/Logo_bg/l2.png" 
            alt="Branding" 
            className="h-10 md:h-16 object-contain brightness-110"
          />
        </Link>

        <div className="flex items-center gap-6 self-center">
          <NavMenu 
            tabs={navLinks} 
            onTabClick={(tab) => {
              if (tab.isExternal) {
                navigate(tab.href);
              } else {
                window.location.href = tab.href;
              }
            }}
          />
        </div>
      </div>
    </nav>
  );
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Common descriptions for categories
  const categoryDescriptions: Record<string, string> = {
    "Display counter": "Premium display counter crafted from 304-grade stainless steel with toughened glass, ensuring durability and hygiene. Its elegant multi-shelf design enhances product visibility, making it perfect for bakeries, sweet shops, and retail spaces while offering long-lasting performance and easy maintenance.",
    "Dining table": "Premium tables crafted from high-quality stainless steel, ensuring durability, stability, and hygiene. Designed for dining, commercial, and flexible use, they offer strong build quality, space efficiency, and easy maintenance, making them ideal for restaurants, kitchens, and institutional environments.",
    "Standing table": "Premium tables crafted from high-quality stainless steel, ensuring durability, stability, and hygiene. Designed for dining, commercial, and flexible use, they offer strong build quality, space efficiency, and easy maintenance, making them ideal for restaurants, kitchens, and institutional environments.",
    "Folding table": "Premium tables crafted from high-quality stainless steel, ensuring durability, stability, and hygiene. Designed for dining, commercial, and flexible use, they offer strong build quality, space efficiency, and easy maintenance, making them ideal for restaurants, kitchens, and institutional environments.",
    "Chair": "Premium seating solutions crafted for strength, comfort, and durability. Made from high-quality materials, they are ideal for schools, dining areas, and commercial spaces, offering sturdy construction, long-lasting performance, easy maintenance, and a clean, functional design.",
    "Stool": "Premium seating solutions crafted for strength, comfort, and durability. Made from high-quality materials, they are ideal for schools, dining areas, and commercial spaces, offering sturdy construction, long-lasting performance, easy maintenance, and a clean, functional design.",
    "school desk &bench": "Premium seating solutions crafted for strength, comfort, and durability. Made from high-quality materials, they are ideal for schools, dining areas, and commercial spaces, offering sturdy construction, long-lasting performance, easy maintenance, and a clean, functional design.",
    "Working table": "Premium working table crafted from 304-grade stainless steel, ensuring durability and hygiene. Designed for efficient workflow in commercial kitchens and industries, it offers a strong, stable surface, corrosion resistance, easy cleaning, and long-lasting performance under heavy-duty use.",
    "Hand wash Sink": "Premium hand wash sink crafted from high-quality stainless steel, ensuring hygiene and durability. Designed for commercial and industrial use, it offers efficient water flow, corrosion resistance, easy maintenance, and a clean, professional design suitable for kitchens and workplaces.",
    "Racks": "Premium racks and trolley systems crafted from durable stainless steel, ensuring strength and reliability. Designed for storage and easy movement, they are ideal for commercial kitchens and industries, offering efficient organization, smooth mobility, corrosion resistance, and long-lasting performance.",
    "Trolly": "Premium racks and trolley systems crafted from durable stainless steel, ensuring strength and reliability. Designed for storage and easy movement, they are ideal for commercial kitchens and industries, offering efficient organization, smooth mobility, corrosion resistance, and long-lasting performance.",
    "Watercan stand": "Premium water can stand crafted from high-quality stainless steel, ensuring durability and stability. Designed to hold water cans securely, it offers convenience, hygiene, corrosion resistance, and easy maintenance, making it ideal for homes, offices, and commercial spaces.",
    "SS Door": "Premium stainless steel door designed for strength, security, and durability. Crafted from high-quality materials, it offers corrosion resistance, long-lasting performance, and a modern appearance, making it ideal for commercial, industrial, and residential applications with minimal maintenance.",
    "Baby cradle": "Premium baby cradle crafted with strong and safe materials, ensuring comfort and security. Designed for durability and stability, it provides a gentle resting space, easy maintenance, and long-lasting performance, making it ideal for both home and institutional use.",
    "Lamp cage": "Premium lamp cage crafted from durable stainless steel, ensuring protection and longevity. Designed to safeguard lighting fixtures, it offers corrosion resistance, strong build quality, and a functional design, making it ideal for industrial, commercial, and outdoor applications.",
    "Design pcs": "Premium stainless steel design pieces crafted with precision and creativity. Designed to enhance aesthetics, they offer durability, corrosion resistance, and a modern finish, making them ideal for decorative and functional applications in commercial, residential, and industrial spaces.",
    "Appam Patra(Paniyaram Adupu)": "Premium appam patra crafted for efficient and uniform cooking. Made from high-quality materials, it ensures durability and heat distribution, making it ideal for commercial kitchens while offering consistent results, easy maintenance, and long-lasting performance."
  };

  // Technical specifications for categories
  const technicalSpecs: Record<string, {
    name: string;
    category: string;
    grade: string;
    standard: string;
    dimensions: string;
    features: string[];
  }> = {
    "Display counter": {
      name: "Display Counter",
      category: "Food & Bakery Display",
      grade: "SS 304 / 202 Grade",
      standard: "Industrial Mirror/Matt Finish",
      dimensions: "60 × 21 × 46 inches (L×W×H)\n(Custom size available as per requirement)",
      features: [
        "Multiple SS Grades (304 / 202)",
        "Heavy-duty Frame & Strong Base",
        "Mirror / Matte / Brushed Finish",
        "Glass & LED Display Options",
        "Multi-shelf Storage System",
        "Low Maintenance & Easy Cleaning"
      ]
    },
    "Tea stall": {
      name: "Tea Stall Counter",
      category: "Beverage & Commercial Kitchen",
      grade: "SS 304 / 202  Grade",
      standard: "Heat-Resistant Work Surface",
      dimensions: "60 × 30 × 30 inches (L×W×H)\n(Custom size available as per requirement)",
      features: [
        "Designed for Tea Stall & Beverage Use",
        "Compact Yet Spacious Work Area",
        "Heat & Corrosion Resistant Surface",
        "Under-counter Storage & Provision for Cylinder",
        "Matt / Mirror Finish",
        "Strong & Long-lasting Construction"
      ]
    },
    "Juice stall": {
      name: "Juice Stall Counter",
      category: "Beverage & Food Service",
      grade: "SS 304 / 202 Grade",
      standard: "Hygienic & Moisture Resistant",
      dimensions: "60 × 27 × 30 inches (L×W×H)\n(Custom size available as per requirement)",
      features: [
        "Designed for Juice & Beverage Prep",
        "Hygienic & Food-safe Surface",
        "Resistant to Moisture & Fruit Acids",
        "Compact and Efficient Workspace",
        "Customizable Design & Storage Options",
        "Strong, Durable & Long-lasting Construction"
      ]
    },
    "Snacks counter": {
      name: "Snacks Counter",
      category: "Fast Food & Snacks",
      grade: "SS 304 / 202 Grade",
      standard: "Multi-Purpose Display",
      dimensions: "48 × 24 × 30 inches (L×W×H)\n(Custom size available as per requirement)",
      features: [
        "Available in SS 304 / 202 Grades",
        "Glass Display & Storage Shelves",
        "Durable Construction for Daily Use",
        "Professional Mirror / Matte Finish",
        "Optional LED Lighting Integration",
        "Easy to Clean & Maintain"
      ]
    },
    "Dining table": {
      name: "Dining Table Top SS / Granite / Glass",
      category: "Commercial Furniture",
      grade: "SS 304 / 202 Grade",
      standard: "Heavy Duty Construction",
      dimensions: "36 × 24 × 30 inches\(4-Seater Bakery Table)\n 48 × 36 × 30 inches (4-Seater Restaurant Table)\n72 × 36 × 30 inches(6-Seater Restaurant Table)\n(Custom size available as per requirement)",
      features: [
        "Premium SS 304 / 202 Grades",
        "High Load Bearing Capacity",
        "Anti-Wobble Design & Sturdy Base",
        "Rust-proof & Heat Resistant Top",
        "Smooth Edges for Safety",
        "Modern Industrial Aesthetic"
      ]
    },
    "Working table": {
      name: "SS Working Table",
      category: "Commercial Kitchen Prep",
      grade: "SS 304 / 202 Grade",
      standard: "Reinforced Work Surface",
      dimensions: "60 × 30 × 34 inches (L×W×H)\n(Custom size available as per requirement)",
      features: [
        "Heavy-duty SS 304 / 202 Construction",
        "Reinforced Under-shelf for Storage",
        "Adjustable Bullet Feet for Leveling",
        "Sound-Deadened Work Top",
        "Corrosion & Scratch Resistant",
        "Standard Kitchen Height Design"
      ]
    },
    "Hand wash Sink": {
      name: "SS Hand Wash Sink",
      category: "Sanitary & Hygiene",
      grade: "SS 304 Premium Grade",
      standard: "Deep Bowl Construction",
      dimensions: "From Single Tap to N Tap Available\n(Custom size available as per requirement)",
      features: [
        "Pure SS 304 for Superior Hygiene",
        "Deep Single Bowl Design",
        "Integrated Splash-guard Bnck",
        "Anti-clogging Drain System",
        "Mirror Finish for Professional Look",
        "Wall-mount or Floor-standing Options"
      ]
    },
    "Dosa Kal": {
      name: "SS Dosa Kal (Burner Included)",
      category: "Industrial Kitchen Equipment",
      grade: "SS Frame with MS/Cast Iron Top",
      standard: "High Heat Tolerance",
      dimensions: "60 × 30 × 30 inches\n48 × 30 × 30 inches\n36 × 30 × 30 inches\n(Custom size available as per requirement)",
      features: [
        "Industrial High-Pressure Burners",
        "Thick Polished MS / Cast Iron Plate",
        "Heavy Duty SS 304 / 202 Frame",
        "Waste Oil Collection Trough",
        "Independent Burner Controls",
        "Even Heat Distribution Design"
      ]
    },
    "Bainmarie counter": {
      name: "SS Bainmarie Counter",
      category: "Food Warmer & Serving",
      grade: "SS 304 Grade",
      standard: "Thermal Insulated Body",
      dimensions: "4 Bowl / 6 Bowl / 8 Bowl\n(Custom size available as per requirement)",
      features: [
        "SS 304 Construction for Water Tank",
        "Hot Water Bath Heating System",
        "Standard G/N Pan Compatibility",
        "Temperature Control Thermostat",
        "Insulated Body for Heat Retention"
      ]
    },
    "Oven": {
      name: "Commercial Deck Oven",
      category: "Bakery Equipment",
      grade: "SS & MS Exterior / Insulated Body",
      standard: "Precision Heating (250-400°C)",
      dimensions: "16 Tray / 12 Tray / 9 Tray \n(Custom size available as per requirement)",
      features: [
        "Advanced Heat Retention Design",
        "High-Grade Heating Elements",
        "Analog Temp Controls",
        "Stainless Steel Professional Exterior",
        "Large Baking Capacity"
      ]
    },
    "Cake machine": {
      name: "Commercial Cake Machine",
      category: "Bakery Equipment",
      grade: "SS Bowl",
      standard: "Manual & Gear(4-Speed)",
      dimensions: "10Kg and 20 Kg\n(Custom size available as per requirement)",
      features: [
        "Planetary Mixing Action",
        "SS 304 Mixing Bowl & Tools",
        "Powerful Industrial Motor",
        "Safety Guard Integration",
        "Sturdy Base for Vibration Control",
        "Easy-to-Clean Components"
      ]
    },
    "Domixer": {
      name: "SS Dough Mixer",
      category: "Bakery Equipment",
      grade: "SS Bowl",
      standard: "Heavy Duty",
      dimensions: "40kg Capacity",
      features: [
        "SS Mixing Bowl & Arms",
        "High Torque Industrial Motor",
        "Reinforced Steel Body",
        "Low Maintenance Belt/Gear Drive",
        "Designed for Intensive Kneading"
      ]
    },
    "Triple range burner": {
      name: "Triple Range Burner",
      category: "Industrial Kitchen",
      grade: "Heavy Duty SS Frame",
      standard: "High-Pressure LPG",
      dimensions: "72 × 24 × 30 inches (Standard)\n(Custom size available as per requirement)",
      features: [
        "Three High-Efficiency Burners",
        "Robust SS 304 / 202 Frame",
        "Heavy Cast Iron Pan Support",
        "Independent Gas Controls",
        "Spillage Collection Tray",
        "Adjustable Feet for Stability"
      ]
    },
    "Hotbox": {
      name: "SS & MS Hotbox",
      category: "Food Storage & Catering",
      grade: "SS 304 / 202",
      standard: "Heat Insulation",
      dimensions: "8 Tray / 6 Tray /4 Tary / 2 Tray\n(Custom size available as per requirement)",
      features: [
        "Thermal Insulation",
        "Interior for Food Safety",
        "Heavy Duty Airtight Door Gaskets",
        "Superior Heat Retention Performance",
        "Corrosion Resistant Mirror Finish"
      ]
    },
    "Folding table": {
      name: "SS Folding Table",
      category: "Catering & Events",
      grade: "SS 304 / 202 Grade",
      standard: "Portable Design",
      dimensions: "48 × 24 × 30 inches (Standard)\n(Custom size available as per requirement)",
      features: [
        "Heavy Duty Stainless Steel Top",
        "Space-Saving Folding Mechanism",
        "Reinforced Hinges & Locks",
        "Lightweight Yet Sturdy Build",
        "Rust-proof for Outdoor Use",
        "Easy to Transport & Store"
      ]
    },
    "Shawarma machine": {
      name: "SS Shawarma Machine",
      category: "Fast Food Equipment",
      grade: "SS 304 Body",
      standard: "Motorized Rotation",
      dimensions: "Single / Double Burner Options\n(Custom size available as per requirement)",
      features: [
        "Industrial Grade Ceramic Burners",
        "Motorized Meat Skewer Rotation",
        "Drip Tray for Oil Collection",
        "Heat Control Regulators",
        "Easy Cleaning SS Surfaces",
        "Compact Counter-top Design"
      ]
    },
    "Double range burner": {
      name: "Double Range Burner",
      category: "Industrial Kitchen",
      grade: "Heavy Duty SS Frame",
      standard: "High-Pressure Burners",
      dimensions: "36 × 18 × 30 inches (Standard)\n(Custom size available as per requirement)",
      features: [
        "Dual High-Efficiency Burners",
        "Heavy SS 304 / 202 Chassis",
        "Strong Cast Iron Grills",
        "Removable Spill Trays",
        "Ergonomic Control Knobs",
        "Industrial Grade Stability"
      ]
    },
    "Single range burner": {
      name: "Single Range Burner",
      category: "Industrial Kitchen",
      grade: "Heavy Duty SS Frame",
      standard: "LPG / PNG Compatible",
      dimensions: "24 × 24 × 16 inches (Standard)\n(Custom size available as per requirement)",
      features: [
        "Single High-Pressure Burner",
        "Reinforced SS Construction",
        "Large Vessel Support Design",
        "Portable and Compact Layout",
        "Easy-to-Clean SS Body",
        "Industrial Safety Standards"
      ]
    },
    "Fastfood counter": {
      name: "Fastfood Counter",
      category: "Fast Food & Restaurant",
      grade: "SS 304 / 202 Grade",
      standard: "Hygienic Prep Surface",
      dimensions: "60 × 30 × 34 inches (Standard)\n(Custom size available as per requirement)",
      features: [
        "Integrated Prep & Serving Area",
        "Multiple Storage Under-shelves",
        "Rust-proof & Heat Resistant Surface",
        "Optional Pan Integration Cuts",
        "Sleek Mirror / Brushed Finish",
        "Heavy Duty Load-Bearing Frame"
      ]
    }
  };

  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const commonDescription = categoryDescriptions[categoryName || ""] || 
    `Discover our premium range of ${categoryName} manufacturing equipment. Precisely engineered for maximum durability, commercial hygiene, and everyday operational efficiency. All products adapt perfectly to intensive industrial usage, ensuring long-lasting performance and sleek integration into your professional environment.`;

  const currentSpecs = technicalSpecs[categoryName || ""];

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
    <div className="min-h-screen bg-background text-foreground py-32 px-6 md:px-10">
      <div className="container mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12 uppercase text-[10px] font-black tracking-widest group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-4 leading-none italic font-times text-foreground">{categoryName}</h1>
            <div className="w-32 h-2 bg-primary rounded-full" />
          </motion.div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-0 bg-primary/10 blur-lg group-focus-within:bg-primary/30 transition-all duration-500 rounded-full" />
            <div className="relative flex items-center bg-secondary/50 border border-border rounded-xl px-4 py-3 focus-within:border-primary/50 transition-all backdrop-blur-sm shadow-sm">
              <Search className="w-4 h-4 text-muted-foreground mr-3 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search gallery..." 
                className="bg-transparent border-none outline-none text-foreground w-full font-bold uppercase text-[9px] tracking-widest placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 max-w-4xl overflow-hidden rounded-[2.5rem] border border-border bg-secondary shadow-sm"
        >
          <div className="p-8 md:p-12">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Category Overview</h3>
            <p className="text-foreground text-lg font-bold tracking-tight leading-relaxed italic">
              {commonDescription}
            </p>
          </div>
        </motion.div>

        <div className="flex items-center justify-between mb-10 border-b border-border pb-10">
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2 text-foreground">Product Gallery</h2>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest italic">
                {searchQuery 
                  ? `${filteredProducts.length} Results for "${searchQuery}"`
                  : `${products.length} Items Available`
                }
              </p>
           </div>
           <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary bg-secondary shadow-sm"><Activity size={16}/></div>
           </div>
        </div>

        {selectedIndex !== null && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-white/80 backdrop-blur-3xl"
              onClick={() => setSelectedIndex(null)}
            >
              <button 
                className="absolute top-4 right-4 md:top-8 md:right-8 text-black/50 hover:text-black transition-colors z-[110] p-3 md:p-4 bg-white/50 rounded-full border border-border"
                onClick={() => setSelectedIndex(null)}
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Navigation Buttons - Responsive Sizing */}
              <button 
                className={`absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors z-[110] p-3 md:p-4 bg-white/50 rounded-full border border-border ${selectedIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedIndex !== null && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
                }}
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <button 
                className={`absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors z-[110] p-3 md:p-4 bg-white/50 rounded-full border border-border ${selectedIndex === products.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
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
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-[0_0_100px_rgba(37,99,235,0.1)] border border-border transition-all duration-500" 
                  />
                </div>

                {/* Thumbnail Strip */}
                <div className="flex items-center gap-3 px-4 py-4 bg-white/30 backdrop-blur-md rounded-2xl border border-border max-w-full overflow-x-auto no-scrollbar" onClick={(e) => e.stopPropagation()}>
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
                   <p className="text-muted-foreground text-[10px] uppercase font-black tracking-[0.5em]">
                     Poorani Engineering Works • Image {selectedIndex + 1} of {products.length}
                   </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64 mb-20">
            <div className="w-12 h-12 border-4 border-border border-t-primary rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <Stories className="mb-20">
            <StoriesContent>
              {filteredProducts.map((product, idx) => (
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
                </Story>
              ))}
            </StoriesContent>
          </Stories>
        ) : (
          <div className="text-center py-32 bg-secondary/50 rounded-[3rem] border border-border border-dashed mb-20">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
            <p className="text-muted-foreground uppercase text-xs font-black tracking-widest italic">
              {products.length === 0 ? "Gallery empty for this category" : `No results for "${searchQuery}"`}
            </p>
            {products.length > 0 && (
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-8 bg-foreground text-background px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg"
              >
                Clear Search
              </button>
            )}
            {products.length === 0 && (
              <button className="mt-8 bg-foreground text-background px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-lg">
                Request Catalog
              </button>
            )}
          </div>
        )}

        {currentSpecs && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 max-w-4xl overflow-hidden rounded-[2.5rem] border border-border bg-secondary shadow-sm"
          >
            <div className="p-8 md:p-12">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-8">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  {[
                    { label: "Product Name", value: currentSpecs.name },
                    { label: "Category", value: currentSpecs.category },
                    { label: "Grade", value: currentSpecs.grade },
                    { label: "Standard", value: currentSpecs.standard },
                    { label: "Size/Dimensions", value: currentSpecs.dimensions }
                  ].map((spec, i) => (
                    <div key={i} className="border-b border-border pb-4 group">
                      <span className="text-muted-foreground text-[10px] uppercase font-black tracking-widest block mb-1 group-hover:text-primary transition-colors">{spec.label}</span>
                      <span className="text-foreground text-lg font-bold tracking-tight whitespace-pre-line">{spec.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="bg-background rounded-2xl p-8 border border-border relative overflow-hidden group shadow-inner">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Key Features
                  </h4>
                  <ul className="space-y-5">
                    {currentSpecs.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-foreground font-medium text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-background/50 via-background/10 to-transparent z-10" />
        <img 
          src="/landing_page_white.png" 
          alt="Metal Fabrication Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-20 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bebas leading-none tracking-wider mb-6 md:mb-10 mt-16 md:mt-20 text-black uppercase drop-shadow-sm">
              Wholesale and <br /> 
              <span className="text-primary">Retail</span>
            </h1>
            
            <p className="text-base md:text-xl text-black max-w-xl leading-relaxed mb-10 md:mb-12 font-medium border-l-2 border-primary/30 pl-6">
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-secondary border border-border w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/50 hover:bg-primary hover:text-white border border-border rounded-full flex items-center justify-center text-muted-foreground transition-all backdrop-blur-md shadow-sm"
          >
            <X size={20} />
          </button>

          {/* Left Side: Images */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-border">
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden relative group shrink-0">
              <img src={category.img} alt={category.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            </div>
            {/* Gallery Placeholders */}
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
               <div key={i} className="aspect-square rounded-xl bg-muted border border-border overflow-hidden flex items-center justify-center group cursor-pointer relative shadow-inner">
                  <span className="text-muted-foreground text-[10px] font-black uppercase tracking-widest z-10 px-2 text-center leading-tight">Image<br/>{i}</span>
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
               </div>
              ))}
            </div>
          </div>

          {/* Right Side: Details */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="w-16 h-16 bg-muted border border-border rounded-2xl flex items-center justify-center mb-6 shadow-sm">
               <category.icon className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tight leading-none mb-6">
              {category.title}
            </h2>
            <div className="w-20 h-1 bg-primary rounded-full mb-8" />
            
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
              Discover our premium <strong>{category.title}</strong>, precisely engineered for maximum durability, commercial hygiene, and everyday operational efficiency. All products adapt perfectly to intensive institutional usage, ensuring long-lasting performance and sleek integration into your professional environment.
            </p>
            
            <div className="space-y-4 mb-10 bg-muted/30 p-6 rounded-2xl border border-border/50">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Key Advantages</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                  <span className="text-sm font-medium leading-tight">100% Commercial Grade Stainless Steel Material</span>
                </li>
                <li className="flex items-start gap-4 text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                  <span className="text-sm font-medium leading-tight">Precision Welded & Corrosion Resistant Finish</span>
                </li>
                <li className="flex items-start gap-4 text-foreground/80">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-primary" /></div>
                  <span className="text-sm font-medium leading-tight">Fully Customizable Dimensions tailored to space</span>
                </li>
              </ul>
            </div>

            <a 
              href="#inquiry" 
              onClick={onClose}
              className="w-full bg-foreground text-background py-5 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition-all group shadow-lg"
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
  <div className="relative h-full rounded-2xl border border-border p-1 md:p-1.5 transition-all group shadow-sm hover:shadow-md">
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onExplore}
      className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background bg-metallic transition-all group-hover:bg-accent/50 cursor-pointer"
    >
      {img && (
        <div className="h-40 sm:h-52 md:h-72 lg:h-80 relative overflow-hidden rounded-t-xl transition-all duration-700 w-full shrink-0 border-b border-border">
          <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700" />
        </div>
      )}
      <div className="flex-1 py-4 px-4 md:py-6 md:px-6 flex flex-col justify-between min-h-[100px] md:min-h-[180px]">
        <div className="flex flex-col items-center justify-center flex-1">
          <h3 className="text-sm sm:text-base md:text-xl font-black mb-3 md:mb-6 text-foreground text-center uppercase tracking-tight leading-snug group-hover:text-primary transition-colors">{title}</h3>
        </div>
        {items && items.length > 0 && (
          <ul className="space-y-3 mb-8">
            {items.map(item => (
              <li key={item} className="flex items-center gap-3 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-border" />
                <span className="text-xs font-bold uppercase tracking-widest">{item}</span>
              </li>
            ))}
          </ul>
        )}
        <div 
          className="w-full py-2 md:py-4 rounded-lg md:rounded-xl border border-border text-muted-foreground font-black text-[9px] md:text-xs uppercase tracking-widest group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all text-center shadow-sm">
          Explore Category
        </div>
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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredCategories = categoriesList.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Stop body scroll when modal is open
  useEffect(() => {
    if (selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedCategory]);

  return (
    <section id="products" className="py-16 md:py-32 bg-secondary relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-20 gap-8">
          <div className="text-left max-w-5xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 md:mb-6 uppercase tracking-tight">Our Products</h2>
            <div className="space-y-4 text-muted-foreground text-sm md:text-base font-medium leading-relaxed">
              <p>
                We offer a wide range of premium stainless steel products designed for durability, hygiene, and performance. Our products include bakery equipment, food counters, commercial kitchen solutions, dining and working tables, seating systems, storage racks, trolleys, and customized fabrication items.
              </p>
              <p>
                From tea stalls, juice counters, and fast food setups to burners, ovens, sinks, and bainmarie units, every product is crafted using high-quality materials to ensure long-lasting reliability and easy maintenance. We also manufacture utility products such as water can stands, stainless steel doors, lamp cages, and specialized items like baby cradles and appam patra.
              </p>
              <p>
                Our products are ideal for bakeries, hotels, restaurants, street vendors, institutions, and industrial applications—delivering both functionality and a clean, professional finish.
              </p>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-primary/20 blur-xl group-focus-within:bg-primary/40 transition-all duration-500 rounded-full" />
            <div className="relative flex items-center bg-background border border-border rounded-2xl px-5 py-4 focus-within:border-primary/50 transition-all shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground mr-4 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="bg-transparent border-none outline-none text-foreground w-full font-bold uppercase text-[10px] tracking-widest placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mb-10">
          {searchQuery && (
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest italic">
              {filteredCategories.length > 0 
                ? `Found ${filteredCategories.length} products matching "${searchQuery}"`
                : `No products matching "${searchQuery}"`}
            </p>
          )}
        </div>

        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredCategories.map((cat, i) => (
              <CategoryCard 
                key={i}
                title={cat.title} 
                icon={cat.icon}
                img={cat.img}
                onExplore={() => navigate(`/explore/${encodeURIComponent(cat.title)}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-secondary rounded-[3rem] border border-border border-dashed">
            <Package className="w-16 h-16 text-foreground mx-auto mb-6 opacity-50" />
            <p className="text-muted-foreground uppercase text-xs font-black tracking-widest italic">We couldn't find any products matching your search</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-8 text-blue-500 uppercase text-[10px] font-black tracking-widest hover:text-blue-400 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
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
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-12">Privacy <span className="text-muted-foreground/40">Policy</span></h1>
        
        <div className="prose prose-zinc max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">Welcome to Poorani Engineering Works. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>Name, phone number, and email address</li>
              <li>Business or company details (if provided)</li>
              <li>Delivery address</li>
              <li>Any information you submit through contact forms or inquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process orders and communicate order updates</li>
              <li>Improve our products, services, and website</li>
              <li>Send important updates related to your orders or our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">4. Cookies and Tracking</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>Our website may use cookies to enhance user experience.</li>
              <li>Cookies help us understand website traffic and improve functionality.</li>
              <li>You can choose to disable cookies through your browser settings.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">5. Data Sharing</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>We do not sell, trade, or rent your personal information.</li>
              <li>Your data may be shared with trusted third parties only for business purposes such as delivery services or payment processing.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">6. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">We take appropriate measures to protect your personal information from unauthorized access, misuse, or disclosure. However, no method of online transmission is 100% secure.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-primary uppercase tracking-widest mb-4">8. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">You have the right to request access, correction, or deletion of your personal data. You may contact us at any time regarding your data.</p>
          </section>

          <section className="p-8 bg-secondary border border-border rounded-3xl">
            <h2 className="text-xl font-black text-foreground uppercase tracking-widest mb-6">9. Contact Us</h2>
            <div className="space-y-4 text-muted-foreground font-bold">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> pooraniengg@gmail.com</p>
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> +91 93845 43135</p>
                <p className="flex items-center gap-3 ml-8">+91 77088 44441</p>
              </div>
              <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> 3/60 D, Ramanujar Temple Road, Erumapalayam, Salem - 636015</p>
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
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-12">Terms & <span className="text-muted-foreground/40">Conditions</span></h1>
        
        <div className="prose prose-zinc max-w-none space-y-12">
          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">Welcome to Poorani Engineering Works. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">2. About Us</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">We are a manufacturing company specializing in stainless steel and glass products for bakeries, hostels, and commercial kitchens. Our products include (but are not limited to) storage units, display counters, racks, and custom equipment.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">3. Use of Website</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>You agree to use this website only for lawful purposes.</li>
              <li>You must not misuse this website or attempt unauthorized access.</li>
              <li>All content on this website is for general information only and may change without notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">4. Product Information</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>We strive to ensure all product details, images, and specifications are accurate.</li>
              <li>However, product images may show slight variations due to lighting, reflections (especially on stainless steel and glass surfaces), and display settings.</li>
              <li>The actual product may differ slightly from the images shown.</li>
              <li>Custom orders may also vary slightly from displayed designs.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">5. Orders and Payments</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>Orders are confirmed only after approval and payment (full or partial).</li>
              <li>Prices are subject to change without prior notice.</li>
              <li>For custom manufacturing, advance payment may be required.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">6. Delivery and Shipping</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>Delivery timelines are estimates and may vary depending on production and location.</li>
              <li>We are not responsible for delays caused by external factors such as logistics or natural events.</li>
              <li>Customers must inspect products upon delivery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">7. Returns and Refunds</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>Since most products are custom-made, returns may not be accepted unless there is a manufacturing defect.</li>
              <li>Any damage or defect must be reported within 2 days of delivery.</li>
              <li>Refunds, if applicable, will be processed based on company policy.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">8. Warranty</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 font-medium">
              <li>Warranty (if provided) applies only to manufacturing defects.</li>
              <li>It does not cover damage caused by misuse, improper installation, or normal wear and tear.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-blue-500 uppercase tracking-widest mb-4">9. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed font-medium">All content, including images, logos, and designs, are the property of Poorani Engineering Works. Unauthorized use or reproduction is strictly prohibited.</p>
          </section>

          <section className="p-8 bg-secondary border border-border rounded-3xl shadow-sm">
            <h2 className="text-xl font-black text-foreground uppercase tracking-widest mb-6">10. Contact Us</h2>
            <div className="space-y-4 text-muted-foreground font-bold">
              <p className="flex items-center gap-3"><Mail className="w-5 h-5 text-primary" /> pooraniengg@gmail.com</p>
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary" /> +91 93845 43135</p>
                <p className="flex items-center gap-3 ml-8">+91 77088 44441</p>
              </div>
              <p className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary" /> 3/60 D, Ramanujar Temple Road, Erumapalayam, Salem - 636015</p>
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
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <h1 className="text-5xl md:text-8xl font-black text-foreground uppercase tracking-tighter leading-none mb-12 italic font-times">
          About <br /> <span className="text-muted-foreground/40">Us</span>
        </h1>
        <div className="w-32 h-2 bg-primary rounded-full mb-16" />

        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-black text-foreground uppercase tracking-widest mb-6 border-l-4 border-primary pl-6">Who We Are</h2>
            <p className="text-muted-foreground text-xl leading-relaxed font-medium">
              Welcome to Poorani Engineering Works, a trusted manufacturer of high-quality stainless steel and glass products. We specialize in designing and producing durable, hygienic, and modern equipment for bakeries, hostels, and commercial kitchens.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-foreground uppercase tracking-widest mb-6 border-l-4 border-primary pl-6">What We Do</h2>
            <p className="text-muted-foreground text-lg mb-8 font-medium">At Poorani Engineering Works, we manufacture a wide range of products including:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[
                 "Bakery display counters",
                 "Stainless steel racks and storage units",
                 "Kitchen equipment and workstations",
                 "Hostel and industrial utility items",
                 "Custom-designed stainless steel and glass products"
               ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-secondary border border-border rounded-2xl shadow-sm">
                    <CheckCircle2 size={18} className="text-primary shrink-0" />
                    <span className="text-foreground font-bold uppercase text-xs tracking-widest">{item}</span>
                 </div>
               ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section className="p-10 bg-secondary border border-border rounded-[2.5rem] shadow-sm">
              <h2 className="text-xl font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-3">
                <Flame className="w-6 h-6 text-primary" /> Our Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Our mission is to deliver reliable, innovative, and cost-effective solutions that meet the needs of our customers while maintaining superior quality and craftsmanship.
              </p>
            </section>

            <section className="p-10 bg-secondary border border-border rounded-[2.5rem] shadow-sm">
              <h2 className="text-xl font-black text-foreground uppercase tracking-widest mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-primary" /> Our Vision
              </h2>
              <p className="text-muted-foreground leading-relaxed font-medium">
                To become a leading manufacturer in the stainless steel and glass industry by continuously improving our designs, technology, and customer satisfaction.
              </p>
            </section>
          </div>

          <section>
            <h2 className="text-2xl font-black text-foreground uppercase tracking-widest mb-8 border-l-4 border-primary pl-6">Why Choose Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { title: "High-quality materials", desc: "Stainless steel & glass" },
                 { title: "Strong construction", desc: "Durable and long-lasting" },
                 { title: "Custom design", desc: "Tailored to your needs" },
                 { title: "Timely delivery", desc: "Manufacturing speed" },
                 { title: "Customer focused", desc: "Your satisfaction first" }
               ].map((item, i) => (
                 <div key={i} className="p-6 bg-secondary border border-border/50 rounded-2xl hover:bg-accent/50 transition-colors group text-center shadow-sm">
                    <h3 className="text-foreground font-black uppercase text-xs tracking-widest mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-tighter">{item.desc}</p>
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

          <section className="p-12 bg-secondary rounded-[3rem] border border-border shadow-sm">
            <h2 className="text-2xl font-black text-foreground uppercase tracking-widest mb-10">Contact Us</h2>
            <p className="text-muted-foreground font-bold mb-8 uppercase text-xs tracking-widest italic">We would love to work with you and support your business needs.</p>
            <div className="space-y-6 text-foreground font-bold">
              <p className="flex items-center gap-4"><Mail className="w-6 h-6 text-primary" /> pooraniengg@gmail.com</p>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-4"><Phone className="w-6 h-6 text-primary" /> +91 93845 43135</p>
                <p className="flex items-center gap-4 ml-10">+91 77088 44441</p>
              </div>
              <p className="flex items-center gap-4"><MapPin className="w-6 h-6 text-primary" /> 3/60 D, Ramanujar Temple Road, Erumapalayam, Salem - 636015</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};


const Inquiry = () => {
  return (
    <section id="inquiry" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-10 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter mb-6">Ready to Work with Us?</h2>
        <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto italic font-medium">Get a custom quote for your industrial kitchen or commercial project today.</p>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="tel:+919384543135" className="bg-foreground text-background px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-lg">Call Now</a>
          <a href="mailto:pooraniengg@gmail.com" className="bg-secondary text-foreground border border-border px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all shadow-sm">Send Email</a>
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
    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-secondary text-foreground text-[10px] font-black uppercase tracking-widest py-2.5 px-5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none shadow-2xl backdrop-blur-md">
      Chat with us
    </span>
  </a>
);

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
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

