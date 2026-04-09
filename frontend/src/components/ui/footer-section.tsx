'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Factory, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
    isProducts?: boolean;
}

const allCategories = [
    "Display counter", "Snacks counter", "Dining table", "Chair", "Tea stall", 
    "Juice stall", "Working table", "Hand wash Sink", "Dosa Kal", "Bainmarie counter", 
    "Oven", "Cake machine", "Domixer", "Triple range burner", "Hotbox", 
    "Folding table", "Shawarma machine", "Double range burner", "Single range burner", "Fastfood counter", 
    "Watercan stand", "Design pcs", "Standing table", "Trolly", "Racks", 
    "Panipuri stall", "Roadside stall", "Lamp cage", "Baby cradle", "Appam Patra", 
    "Tandoori Adupu", "Uruli Stove", "BBQ", "SS Door", "Stool", "school desk & bench"
];

const footerLinks: FooterSection[] = [
	{
		label: 'Our Products',
        isProducts: true,
		links: allCategories.map(cat => ({
            title: cat,
            href: `/explore/${encodeURIComponent(cat)}`
        })),
	},
	{
		label: 'Company',
		links: [
			{ title: 'Our Mission', href: '#mission' },
			{ title: 'Inquiry', href: '#inquiry' },
			{ title: 'Browse Gallery', href: '#products' },
			{ title: 'Privacy Policy', href: '#' },
			{ title: 'Terms of Service', href: '#' },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative w-full border-t border-zinc-900 bg-black px-6 py-12 lg:py-24">
			<div className="container mx-auto max-w-7xl">
				<div className="grid w-full gap-12 lg:grid-cols-4 xl:gap-16">
                    {/* Brand Section */}
					<AnimatedContainer className="space-y-6 lg:col-span-1">
						<div className="flex items-center gap-2">
                            <span className="text-2xl font-times font-bold tracking-tight text-white italic">
                                Poorani Engineering
                            </span>
                        </div>
						<p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
							Leading manufacturer of premium stainless steel equipment for commercial kitchens, bakeries, and industrial institutions since 2004.
						</p>
                        
                        <div className="space-y-4 pt-4">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Contact Details</h4>
                            <div className="flex items-start gap-4 text-zinc-400 group">
                                <Phone size={16} className="text-blue-500 mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 mb-1">Call Us</span>
                                    <a href="tel:+919384543135" className="text-sm font-bold hover:text-white transition-colors">+91 93845 43135</a>
                                    <a href="tel:+917708844441" className="text-sm font-bold hover:text-white transition-colors">+91 77088 44441</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 text-zinc-400 group">
                                <Mail size={16} className="text-blue-500 mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 mb-1">Email Us</span>
                                    <a href="mailto:pooraniengineering@gmail.com" className="text-sm font-bold hover:text-white transition-colors">pooraniengg@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 text-zinc-400">
                                <MapPin size={16} className="text-blue-500 mt-1 shrink-0" />
                                <div className="flex flex-col flex-1">
                                     <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 mb-1">Visit Factory</span>
                                     <p className="text-sm font-bold leading-snug mb-4">
                                         3/60 D, Ramanujar Temple Road,<br/>
                                         Kalapparai Thottam, Erumapalayam,<br/>
                                         Salem - 636015, Tamil Nadu
                                     </p>
                                     <div className="relative w-full h-32 rounded-xl overflow-hidden border border-zinc-800 group/fmap">
                                         <a 
                                             href="https://maps.app.goo.gl/wmPiQdxLTjX22Maj7"
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="absolute inset-0 z-10 block"
                                         >
                                             <div className="absolute inset-0 bg-blue-600/0 group-hover/fmap:bg-blue-600/10 transition-colors flex items-center justify-center opacity-0 group-hover/fmap:opacity-100">
                                                 <span className="bg-white text-black text-[8px] font-black uppercase px-3 py-1.5 rounded-full shadow-2xl">View Map</span>
                                             </div>
                                         </a>
                                         <iframe 
                                             title="Footer Map"
                                             width="100%" 
                                             height="100%" 
                                             style={{ border: 0 }} 
                                             src={`https://maps.google.com/maps?q=${encodeURIComponent("3/60 D, Ramanujar Temple Road, Erumapalayam, Salem")}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                         />
                                     </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 text-zinc-400">
                                <Clock size={16} className="text-blue-500 mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600 mb-1">Business Hours</span>
                                    <p className="text-sm font-bold leading-tight">Mon - Sat: 09:00 AM - 07:30 PM</p>
                                    <p className="text-[11px] font-bold text-red-400 uppercase tracking-widest mt-1">Sunday: Holiday</p>
                                </div>
                            </div>
                        </div>
					</AnimatedContainer>

                    {/* Products Grid */}
                    <div className="lg:col-span-2">
                        <AnimatedContainer delay={0.2}>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8 border-l-2 border-blue-600 pl-4">Full Product List</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                                {allCategories.map((cat) => (
                                    <a
                                        key={cat}
                                        href={`/explore/${encodeURIComponent(cat)}`}
                                        className="text-muted-foreground hover:text-blue-500 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 hover:translate-x-1"
                                    >
                                        {cat}
                                    </a>
                                ))}
                            </div>
                        </AnimatedContainer>
                    </div>

                    {/* Company Links */}
                    <div className="lg:col-span-1">
                        <AnimatedContainer delay={0.3}>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-8 border-l-2 border-zinc-800 pl-4">Company</h3>
                            <ul className="space-y-4">
                                {footerLinks[1].links.map((link) => (
                                    <li key={link.title}>
                                        <a
                                            href={link.href}
                                            className="text-muted-foreground hover:text-white text-xs font-black uppercase tracking-widest transition-all duration-300 inline-block"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </AnimatedContainer>
                    </div>
				</div>

                <div className="mt-20 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">
                        © {new Date().getFullYear()} Poorani Engineering Works. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.3em]">Pure SS 304 Grade Quality</span>
                    </div>
                </div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ translateY: 20, opacity: 0 }}
			whileInView={{ translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8, ease: "easeOut" }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
