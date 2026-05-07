import NavMenu from "@/components/ui/menu-hover-effects";

const DemoOne = () => {
  const mockTabs = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Portfolio', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <div className="flex w-full h-screen justify-center items-center bg-background">
      <NavMenu tabs={mockTabs} />
    </div>
  );
};

export { DemoOne };
