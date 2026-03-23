const { useState, useEffect } = React;

// Simple inline SVG components to replace Lucide
const TrendingUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-tradingGreen"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
);
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
const BarChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-zinc-400 group-hover:text-tradingGreen transition-colors"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
);
const BitcoinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-zinc-400 group-hover:text-tradingGreen transition-colors"><path d="M11.767 19.089c4.924.86 6.14-6.025 1.216-6.885h-1.216v6.885Z"/><path d="M11.767 12.204c4.924.86 6.14-6.025 1.216-6.885h-1.216v6.885Z"/><path d="M9.831 4v16"/><path d="M11.767 4v16"/><path d="m8.5 4.5 1-1Z"/><path d="m8.5 20.5 1-1Z"/></svg>
);
const NewsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-zinc-400 group-hover:text-tradingGreen transition-colors"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);
const BrainIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-zinc-400 group-hover:text-tradingGreen transition-colors"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
);
const WheatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-zinc-400 group-hover:text-tradingGreen transition-colors"><path d="M2 22 22 2"/><path d="M8.5 6.5a10 10 0 0 0 9 9"/><path d="M15 15a10 10 0 0 0-9-9"/><path d="M14 10a10 10 0 0 0 6 6"/><path d="M18 18a10 10 0 0 0-6-6"/><path d="M11 7a10 10 0 0 0 6 6"/><path d="M15 3a10 10 0 0 0-6-6"/><path d="M5 11a10 10 0 0 0 6 6"/><path d="M9 15a10 10 0 0 0-6-6"/><path d="M15 15 18 18"/><path d="M9 15 6 18"/><path d="M6 18 3 21"/></svg>
);
const LightningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-zinc-400 group-hover:text-tradingGreen transition-colors"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(function () {
        function handleScroll() {
            setScrolled(window.scrollY > 50);
        }
        window.addEventListener("scroll", handleScroll);
        return function () { window.removeEventListener("scroll", handleScroll); };
    }, []);

    const navClass = `fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 shadow-sm' : 'bg-transparent'}`;

    return (
        <nav className={navClass}>
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <span className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                    <div className="text-xl font-light text-white group-hover:text-tradingGreen transition-colors">
                        TradingOne
                    </div>
                    <div className="w-2 h-2 rounded-full bg-tradingGreen"></div>
                </span>
                <button onClick={() => window.location.href = 'login.html'} className="px-5 py-2 text-sm font-medium border border-zinc-800 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all">
                    Sign In
                </button>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
            
            {/* Background Architecture */}
            {/* Deep glow casting down from the top */}
            <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-tradingGreen/10 via-transparent to-transparent opacity-80 pointer-events-none mix-blend-plus-lighter"></div>
            
            {/* Fine grid pattern masked to fade out radially */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                backgroundSize: '80px 80px',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 10%, transparent 80%)'
            }}></div>
            
            {/* The sharp accent ray at the ceiling */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-tradingGreen to-transparent opacity-30 shadow-[0_0_20px_rgba(0,255,102,0.6)]"></div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 mt-8 flex flex-col items-center text-center">
                
                {/* Premium Pulse Pill */}
                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-md mb-8 shadow-2xl transition-all hover:bg-zinc-800/50 cursor-default">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tradingGreen opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-tradingGreen"></span>
                    </span>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-zinc-400 uppercase">Institutional Grade Terminal</span>
                </div>

                {/* The Brand Logo */}
                <h1 className="flex items-center justify-center gap-3 text-6xl sm:text-7xl md:text-[6rem] font-semibold tracking-tighter text-white mb-8 leading-tight drop-shadow-2xl">
                    TradingOne<div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-tradingGreen mt-2 shadow-[0_0_15px_rgba(0,255,102,0.8)]"></div>
                </h1>

                {/* Highly Typography-Focused Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-[3rem] lg:text-[3.2rem] font-medium tracking-tight text-white mb-12 drop-shadow-xl max-w-5xl mx-auto flex flex-col items-center gap-3 md:gap-4">
                    <span className="leading-tight">Everything you need to trade markets,</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-tradingGreen to-emerald-500 pb-2 leading-tight">all in one terminal.</span>
                </h2>

                {/* Sub-headline */}
                <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-16 leading-relaxed font-light tracking-wide">
                    Access global stock exchanges, cryptocurrencies, commodities, and derivatives.<br className="hidden md:block"/>
                    Powered by <span className="text-zinc-200 font-medium">AI-driven insights</span> and <span className="text-zinc-200 font-medium">real-time data aggregation.</span>
                </p>

                {/* High-End Clean CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md mx-auto">
                    <button onClick={() => window.location.href = 'login.html'} className="flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 font-medium px-8 py-4 rounded-full text-base transition-all shadow-[0_6px_20px_rgba(255,255,255,0.15)] group">
                        Launch Platform <ArrowRightIcon />
                    </button>
                    <button onClick={() => document.getElementById('features').scrollIntoView({behavior: 'smooth'})} className="flex items-center justify-center gap-2 bg-zinc-900/30 backdrop-blur-md border border-zinc-700 text-white hover:bg-zinc-800/80 hover:border-zinc-500 rounded-full px-8 py-4 text-base transition-all">
                        Explore Engine
                    </button>
                </div>
                
                {/* Abstract Data Visualization Element - Full Width Sine Wave */}
                <div className="mt-24 mb-0 w-screen relative left-1/2 -translate-x-1/2 flex items-end justify-center gap-1 sm:gap-[6px] opacity-[0.25] h-32 pointer-events-none overflow-hidden">
                    {/* Fading edges using CSS mask to gently blend out the edges */}
                    <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(90deg, #050505 0%, transparent 15%, transparent 85%, #050505 100%)' }}></div>
                    
                    {Array.from({length: 120}).map((_, i) => {
                        // Generate a smooth wave-like pattern using overlaid sine waves
                        const wave1 = Math.sin(i * 0.15) * 40;
                        const wave2 = Math.sin(i * 0.05) * 30;
                        const height = Math.abs(wave1 + wave2) + (Math.random() * 15) + 10;
                        
                        return (
                             <div key={i} className="w-1.5 bg-gradient-to-t from-tradingGreen to-transparent rounded-t flex-shrink-0 transition-opacity duration-1000" style={{ height: `${height}px` }}></div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}

function Features() {
    const featuresList = [
        { title: "Stock Exchanges", desc: "Real-time access to NYSE, NASDAQ, LSE, and 150+ global exchanges with institutional-grade data feeds.", icon: <BarChartIcon /> },
        { title: "Cryptocurrency", desc: "Trade Bitcoin, Ethereum, and thousands of digital assets across major exchanges with unified order routing.", icon: <BitcoinIcon /> },
        { title: "Global News", desc: "AI-curated news aggregation from Bloomberg, Reuters, and 1000+ sources with sentiment analysis.", icon: <NewsIcon /> },
        { title: "Predictive AI", desc: "Machine learning models analyzing millions of data points to identify trading patterns and opportunities.", icon: <BrainIcon /> },
        { title: "Commodities", desc: "Futures and spot markets for oil, gold, agriculture, and metals with transparent pricing and execution.", icon: <WheatIcon /> },
        { title: "Derivatives", desc: "Options, futures, and structured products with advanced analytics and risk management tools.", icon: <LightningIcon /> }
    ];

    return (
        <section id="features" className="relative py-32 bg-black border-t border-zinc-900 border-b border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">Everything You Need</h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
                        A comprehensive suite of trading tools designed for professionals who demand precision and performance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, idx) => (
                        <div key={idx} className="group relative p-8 bg-zinc-950/40 border border-zinc-900/80 hover:border-zinc-700 hover:bg-zinc-900/60 rounded-xl transition-all duration-300">
                            <div className="absolute top-0 left-0 w-0 h-[2px] bg-tradingGreen group-hover:w-full transition-all duration-500 rounded-t-xl opacity-0 group-hover:opacity-100"></div>
                            
                            <div className="flex items-start gap-5">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-950 group-hover:border-tradingGreen transition-colors shadow-inner">
                                        {feature.icon}
                                    </div>
                                </div>
                                
                                <div className="flex-1">
                                    <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed font-light">{feature.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p className="text-zinc-600 mb-6 text-sm uppercase tracking-widest font-semibold">Trusted by institutional professional traders</p>
                    <div className="flex items-center justify-center gap-6 sm:gap-12 flex-wrap">
                        <div className="h-10 w-28 bg-zinc-900 rounded opacity-60"></div>
                        <div className="h-10 w-28 bg-zinc-900 rounded opacity-60"></div>
                        <div className="h-10 w-28 bg-zinc-900 rounded opacity-60"></div>
                        <div className="h-10 w-28 bg-zinc-900 rounded opacity-60"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTA() {
    return (
        <section className="py-24 bg-[#0a0a0a] border-b border-zinc-900 text-center">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-light text-white mb-8">Ready to dominate the markets?</h2>
                <button onClick={() => window.location.href = 'login.html'} className="bg-tradingGreen text-black hover:bg-[#00e65c] px-10 py-4 rounded font-medium text-lg transition-colors shadow-[0_0_15px_rgba(0,255,102,0.15)] inline-flex items-center gap-2">
                    Create Account <ArrowRightIcon />
                </button>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="bg-black py-16 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <span className="flex items-center gap-2 mb-6">
                            <span className="text-xl font-medium text-white tracking-tight">TradingOne</span>
                            <div className="w-2 h-2 rounded-full bg-tradingGreen"></div>
                        </span>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-xs font-light">
                            The institutional-grade terminal tailored for the modern algorithmic and discretionary trader. Global markets, unified.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-6 text-sm tracking-wide">Products</h4>
                        <ul className="space-y-4 text-sm text-zinc-500 font-light">
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Pro Terminal</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">API Access</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Market Data</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Algorithms</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-6 text-sm tracking-wide">Company</h4>
                        <ul className="space-y-4 text-sm text-zinc-500 font-light">
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Press</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-medium mb-6 text-sm tracking-wide">Legal</h4>
                        <ul className="space-y-4 text-sm text-zinc-500 font-light">
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Risk Disclosure</a></li>
                            <li><a href="#" className="hover:text-tradingGreen transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-zinc-600 text-sm font-light">
                        &copy; 2026 TradingOne Systems LLC. All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors" title="Twitter"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors" title="GitHub"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
                        <a href="#" className="text-zinc-600 hover:text-white transition-colors" title="LinkedIn"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <Hero />
            <Features />
            <CTA />
            <Footer />
        </React.Fragment>
    );
}

// ——— Render ———
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
