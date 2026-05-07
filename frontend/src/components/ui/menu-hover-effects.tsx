import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface TabItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface NavMenuProps {
  tabs: TabItem[];
  onTabClick?: (tab: TabItem) => void;
}

export default function NavMenu({ tabs, onTabClick }: NavMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (tab: TabItem) => {
    setIsMenuOpen(false);
    if (onTabClick) {
      onTabClick(tab);
    } else {
      if (tab.isExternal) {
        navigate(tab.href);
      } else {
        window.location.href = tab.href;
      }
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-white/40 backdrop-blur-md z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu toggle button (Hamburger) */}
      {!isMenuOpen && (
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 relative z-[60]"
          aria-label="Open menu"
        >
          <div className="w-6 h-0.5 bg-foreground mb-1.5 transition-all duration-300"></div>
          <div className="w-6 h-0.5 bg-foreground mb-1.5 transition-all duration-300"></div>
          <div className="w-6 h-0.5 bg-foreground transition-all duration-300"></div>
        </button>
      )}
      
      {/* Menu container */}
      <div className={`
        ${isMenuOpen ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[280px] h-auto py-10 bg-secondary/95 backdrop-blur-2xl z-50 flex flex-col items-center justify-center rounded-[2rem] border border-border shadow-2xl transition-all duration-500 scale-100 opacity-100' : 'hidden md:block'}
      `}>
        {/* Close button inside the card */}
        {isMenuOpen && (
           <button 
             onClick={() => setIsMenuOpen(false)}
             className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        )}

        <ul className={`
          flex flex-col items-center space-y-4
          md:flex-row md:space-y-0 md:space-x-1 md:justify-center
          lg:space-x-2
        `}>
          {tabs.map((tab) => (
            <li key={tab.name} className="list-none">
              <button
                onClick={() => handleLinkClick(tab)}
                className="relative inline-block group overflow-hidden"
              >
                {/* Link text */}
                <span className="
                  relative z-10 block uppercase text-foreground
                  font-sans font-black tracking-widest transition-colors duration-300 
                  group-hover:text-background
                  text-lg py-2 px-4
                  md:text-[10px] md:py-2 md:px-4
                ">
                  {tab.name}
                </span>
                
                {/* Top & bottom border animation */}
                <span className="
                  absolute inset-0
                  transform scale-y-[2] opacity-0 
                  transition-all duration-500 origin-center
                  group-hover:scale-y-100 group-hover:opacity-100
                " />
                
                {/* Background fill animation */}
                <span className="
                  absolute inset-0 bg-foreground
                  transform -translate-y-full
                  transition-transform duration-300 ease-out
                  group-hover:translate-y-0
                " />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
