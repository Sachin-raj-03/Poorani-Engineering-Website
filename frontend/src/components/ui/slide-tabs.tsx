import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TabItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

interface SlideTabsProps {
  tabs: TabItem[];
  onTabClick?: (tab: TabItem) => void;
}

export const SlideTabs = ({ tabs, onTabClick }: SlideTabsProps) => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  // State to track the currently selected tab, defaulting to the first tab (index 0)
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);

  // This effect runs when the component mounts or when the selected tab changes.
  // It calculates the position of the selected tab and sets the cursor.
  useEffect(() => {
    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width, height } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        height,
        opacity: 1,
      });
    }
  }, [selected, tabs]);


  return (
    <ul
      onMouseLeave={() => {
        // When the mouse leaves the container, reset the cursor
        // to the position of the currently selected tab.
        const selectedTab = tabsRef.current[selected];
        if (selectedTab) {
            const { width, height } = selectedTab.getBoundingClientRect();
            setPosition({
                left: selectedTab.offsetLeft,
                width,
                height,
                opacity: 1,
            });
        }
      }}
      className="relative mx-auto flex w-fit rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-md"
    >
      {tabs.map((tab, i) => (
         <Tab
            key={tab.name}
            ref={(el) => (tabsRef.current[i] = el)}
            setPosition={setPosition}
            onClick={() => {
                setSelected(i);
                if (onTabClick) onTabClick(tab);
            }}
          >
            {tab.name}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<{ left: number; width: number; height: number; opacity: number }>>;
  onClick: () => void;
}

// The Tab component is wrapped in forwardRef to accept a ref from its parent.
const Tab = React.forwardRef<HTMLLIElement, TabProps>(({ children, setPosition, onClick }, ref) => {
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        if (!ref || typeof ref === "function" || !ref.current) return;

        const { width, height } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          height,
          opacity: 1,
        });
      }}
      className="relative z-10 flex cursor-pointer items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white mix-blend-difference md:px-6 md:py-3"
    >
      {children}
    </li>
  );
});

Tab.displayName = "Tab";

const Cursor = ({ position }: { position: { left: number; width: number; height: number; opacity: number } }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 rounded-full bg-white"
    />
  );
};
