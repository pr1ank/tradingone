const { useState, useEffect, useRef } = React;

// --- Vanilla SVG Icons ---
const HomeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const LineChartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>;
const BitcoinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.767 19.089c4.924.86 6.14-6.025 1.216-6.885h-1.216v6.885Z"/><path d="M11.767 12.204c4.924.86 6.14-6.025 1.216-6.885h-1.216v6.885Z"/><path d="M9.831 4v16"/><path d="M11.767 4v16"/><path d="m8.5 4.5 1-1Z"/><path d="m8.5 20.5 1-1Z"/></svg>;
const LayersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const BoxIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const BriefcaseIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
const NewspaperIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>;
const LogOutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;

// --- API Helpers ---
const API_BASE = 'http://localhost:3000/api';
const getToken = () => localStorage.getItem('tradingone_jwt');

// --- Components ---

function Sidebar({ activeTab, setActiveTab }) {
    const navItems = [
        { id: 'equities', label: 'Equities', icon: <LineChartIcon /> },
        { id: 'crypto', label: 'Crypto', icon: <BitcoinIcon /> },
        { id: 'options', label: 'Options & Futures', icon: <LayersIcon /> },
        { id: 'commodities', label: 'Commodities', icon: <BoxIcon /> },
        { id: 'funds', label: 'MFs & ETFs', icon: <BriefcaseIcon /> },
        { id: 'news', label: 'Market News', icon: <NewspaperIcon /> },
    ];

    const handleLogout = () => {
        localStorage.removeItem('tradingone_jwt');
        window.location.href = 'index.html';
    };

    return (
        <div className="w-64 bg-panelBg border-r border-zinc-900 flex flex-col h-full flex-shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-zinc-900">
                <span className="flex items-center gap-2">
                    <span className="text-xl font-medium text-white tracking-tight">TradingOne</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-tradingGreen shadow-[0_0_8px_#00ff66]"></div>
                </span>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-600">Markets</div>
                {navItems.map(item => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${activeTab === item.id ? 'bg-zinc-900 text-tradingGreen font-medium' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200'}`}
                    >
                        <span className={activeTab === item.id ? 'text-tradingGreen' : 'text-zinc-500'}>{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="p-4 border-t border-zinc-900">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 text-sm font-medium">
                        TR
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-sm font-medium text-zinc-200 truncate">Institutional User</div>
                        <div className="text-xs text-zinc-500 truncate">Pro Tier</div>
                    </div>
                </div>
                <button onClick={handleLogout} className="mt-2 w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-500 hover:text-red-400 transition-colors rounded hover:bg-zinc-900">
                    <LogOutIcon /> Sign Out
                </button>
            </div>
        </div>
    );
}

function TopHeader({ activeTabTitle }) {
    return (
        <header className="h-16 bg-panelBg border-b border-zinc-900 flex items-center justify-between px-6 flex-shrink-0">
            <h1 className="text-lg font-medium text-zinc-100">{activeTabTitle}</h1>
            <div className="flex items-center gap-4">
                {/* Global connection status */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-tradingGreen animate-pulse"></div>
                    SYS.OP TICK OK
                </div>
            </div>
        </header>
    );
}

// ----- VIEWS -----

// --- TradingView Chart Component ---
function LightweightChart({ data }) {
    const chartContainerRef = useRef();
    const chartRef = useRef();

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth, height: chartContainerRef.current.clientHeight });
            }
        };

        const chart = LightweightCharts.createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                background: { type: 'solid', color: 'transparent' },
                textColor: '#71717a',
            },
            grid: {
                vertLines: { color: '#18181b', style: 1 },
                horzLines: { color: '#18181b', style: 1 },
            },
            timeScale: {
                borderColor: '#27272a',
                timeVisible: true,
            },
            rightPriceScale: {
                borderColor: '#27272a',
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
                vertLine: { width: 1, color: '#00ff66', style: 3 },
                horzLine: { width: 1, color: '#00ff66', style: 3 },
            }
        });

        const areaSeries = chart.addAreaSeries({
            lineColor: '#00ff66',
            topColor: 'rgba(0, 255, 102, 0.4)',
            bottomColor: 'rgba(0, 255, 102, 0.0)',
            lineWidth: 2,
            crosshairMarkerRadius: 4,
        });

        const mappedData = data.map(d => ({
            time: d.time,
            value: d.close
        }));
        areaSeries.setData(mappedData);
        chartRef.current = chart;

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data]);

    return <div ref={chartContainerRef} className="w-full h-full" />;
}

// Generate realistic looking dummy candle data
function generateDummyData(seedString) {
    let date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    let currentPrice = 150 + (seedString.charCodeAt(0) % 50);
    const data = [];
    
    for (let i = 0; i < 252; i++) { // ~252 trading days
        const open = currentPrice;
        const high = open + Math.random() * 5;
        const low = open - Math.random() * 5;
        const close = Math.random() > 0.48 ? high - Math.random() * 2 : low + Math.random() * 2;
        currentPrice = close;
        
        data.push({
            time: date.toISOString().split('T')[0],
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2))
        });
        date.setDate(date.getDate() + 1);
        if (date.getDay() === 0 || date.getDay() === 6) date.setDate(date.getDate() + (date.getDay() === 0 ? 1 : 2));
    }
    return data;
}

// ----- VIEWS -----

function EquitiesView() {
    const [ticker, setTicker] = useState('AAPL');
    const [searchInput, setSearchInput] = useState('');
    const [exchange, setExchange] = useState('NASDAQ');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        // Here we would fetch from API_BASE + `/finance/history?ticker=${ticker}`
        // But since keys aren't added by the user yet, we use simulated data.
        setChartData(generateDummyData(ticker));
    }, [ticker, exchange]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setTicker(searchInput.toUpperCase().trim());
        }
    };

    const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].close : 0;
    const prevPrice = chartData.length > 1 ? chartData[chartData.length - 2].close : 0;
    const isUp = currentPrice >= prevPrice;
    const change = (currentPrice - prevPrice).toFixed(2);
    const pctChange = ((change / prevPrice) * 100).toFixed(2);

    return (
        <div className="h-full flex flex-col">
            {/* Top Command Bar */}
            <div className="p-3 border-b border-zinc-900 flex items-center gap-4 bg-[#080808] flex-shrink-0">
                <select 
                    value={exchange} 
                    onChange={e => setExchange(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-md focus:ring-1 focus:ring-tradingGreen focus:border-tradingGreen block p-2 outline-none"
                >
                    <option value="NASDAQ">NASDAQ</option>
                    <option value="NYSE">NYSE</option>
                    <option value="NSE">NSE (India)</option>
                    <option value="LSE">LSE (London)</option>
                </select>
                
                <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                        <SearchIcon />
                    </div>
                    <input 
                        type="text" 
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder="Search ticker (e.g., AAPL)..." 
                        className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-md focus:ring-1 focus:ring-tradingGreen focus:border-tradingGreen block pl-10 pt-2 pb-2 outline-none font-mono placeholder:font-sans uppercase" 
                    />
                </form>
                
                <button onClick={handleSearch} className="bg-tradingGreen/10 text-tradingGreen hover:bg-tradingGreen/20 px-4 py-2 rounded-md text-sm font-medium transition-colors border border-tradingGreen/20">
                    Load Asset
                </button>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left Side: Chart Section */}
                <div className="flex-1 flex flex-col border-r border-zinc-900">
                    <div className="p-4 border-b border-zinc-900 flex justify-between items-end bg-[#050505]">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-bold tracking-tight">{ticker}</h2>
                                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase">{exchange}</span>
                            </div>
                            <div className="text-sm text-zinc-500">Historical 1D Chart</div>
                        </div>
                        <div className="text-right">
                            <div className={`text-3xl font-mono font-medium ${isUp ? 'text-tradingGreen' : 'text-red-500'}`}>
                                ${currentPrice.toFixed(2)}
                            </div>
                            <div className={`text-sm font-mono ${isUp ? 'text-tradingGreen/80' : 'text-red-500/80'} flex items-center justify-end gap-1`}>
                                {isUp ? '▲' : '▼'} {Math.abs(change)} ({Math.abs(pctChange)}%)
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#0a0a0b] relative">
                        {chartData.length > 0 && <LightweightChart data={chartData} />}
                    </div>
                </div>

                {/* Right Side: Key Financials Sidebar */}
                <div className="w-80 bg-panelBg overflow-y-auto hidden md:block">
                    <div className="p-4 border-b border-zinc-900">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Key Financials</h3>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                        <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                            <span className="text-sm text-zinc-500">Market Cap</span>
                            <span className="text-sm font-mono text-zinc-200">2.45T</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                            <span className="text-sm text-zinc-500">P/E Ratio</span>
                            <span className="text-sm font-mono text-zinc-200">28.4</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                            <span className="text-sm text-zinc-500">52W High</span>
                            <span className="text-sm font-mono text-zinc-200">${((currentPrice) + 12.4).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                            <span className="text-sm text-zinc-500">52W Low</span>
                            <span className="text-sm font-mono text-zinc-200">${((currentPrice) - 45.2).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                            <span className="text-sm text-zinc-500">Volume</span>
                            <span className="text-sm font-mono text-zinc-200">45.2M</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-zinc-900/50">
                            <span className="text-sm text-zinc-500">Avg Vol (3m)</span>
                            <span className="text-sm font-mono text-zinc-200">52.1M</span>
                        </div>
                        
                        <div className="mt-8">
                            <button className="w-full bg-tradingGreen text-black font-semibold py-3 rounded hover:bg-[#00e65c] transition-colors mb-2">Buy {ticker}</button>
                            <button className="w-full bg-red-500 text-white font-semibold py-3 rounded hover:bg-red-600 transition-colors">Sell {ticker}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ComingSoonView({ title, icon, description }) {
    return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 mb-6 shadow-xl">
                {icon}
            </div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-3">{title}</h2>
            <p className="text-zinc-500 max-w-md leading-relaxed">{description}</p>
            <div className="mt-8 px-4 py-1.5 rounded-full border border-tradingGreen/30 bg-tradingGreen/5 text-tradingGreen text-xs font-mono uppercase tracking-widest">
                Module in Development
            </div>
        </div>
    );
}

function CryptoCard({ symbol, name }) {
    const [data, setData] = useState({ price: '...', change: '...', pct: '...', isUp: true });
    
    useEffect(() => {
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@ticker`);
        ws.onmessage = (e) => {
            const res = JSON.parse(e.data);
            setData({
                price: parseFloat(res.c).toFixed(2),
                change: parseFloat(res.p).toFixed(2),
                pct: parseFloat(res.P).toFixed(2),
                isUp: parseFloat(res.p) >= 0
            });
        };
        return () => ws.close();
    }, [symbol]);

    return (
        <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 shadow-lg shadow-black/50 hover:border-zinc-700 transition-colors">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white">{symbol}/USDT</h3>
                    <div className="text-sm text-zinc-500">{name}</div>
                </div>
                <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${data.isUp ? 'bg-tradingGreen shadow-[0_0_8px_#00ff66]' : 'bg-red-500 shadow-[0_0_8px_#ef4444]'}`}></div>
            </div>
            <div className="mt-2">
                <div className={`text-4xl font-mono font-bold mb-2 ${data.isUp ? 'text-tradingGreen' : 'text-red-500'}`}>
                    ${data.price !== '...' ? parseFloat(data.price).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '...'}
                </div>
                <div className={`text-sm font-mono flex items-center gap-2 ${data.isUp ? 'text-tradingGreen/80' : 'text-red-500/80'}`}>
                    {data.isUp ? '▲' : '▼'} {Math.abs(data.change)} ({Math.abs(data.pct)}%)
                </div>
            </div>
        </div>
    );
}

function CryptoView() {
    const pairs = [
        { sym: 'BTC', name: 'Bitcoin' },
        { sym: 'ETH', name: 'Ethereum' },
        { sym: 'SOL', name: 'Solana' },
        { sym: 'BNB', name: 'Binance Coin' },
        { sym: 'XRP', name: 'Ripple' },
        { sym: 'ADA', name: 'Cardano' }
    ];

    return (
        <div className="h-full overflow-y-auto p-8">
            <div className="mb-8">
                <h2 className="text-3xl font-light text-white mb-2">Live Cryptocurrency Markets</h2>
                <p className="text-zinc-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-tradingGreen inline-block"></span> WebSockets streaming real-time from Binance.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
                {pairs.map(p => <CryptoCard key={p.sym} symbol={p.sym} name={p.name} />)}
            </div>
        </div>
    );
}

function NewsView() {
    const news = [
        { time: '10m ago', source: 'Bloomberg', title: 'Federal Reserve Signals Potential Rate Cuts Later This Year Amid Cooling Inflation Data', tag: 'MACRO' },
        { time: '45m ago', source: 'Reuters', title: 'Tech Giants Rally as AI Infrastructure Investments Reach Record Highs in Q3', tag: 'TECH' },
        { time: '2h ago', source: 'WSJ', title: 'Oil Prices Surge on Geopolitical Tensions in the Middle East, Equities Briefly Dip', tag: 'COMMODITIES' },
        { time: '4h ago', source: 'Financial Times', title: 'European Central Bank Maintains Rates, Citing Strong Domestic Labor Market', tag: 'FOREX' },
        { time: '5h ago', source: 'CoinDesk', title: 'Institutional Inflows to Bitcoin ETFs Cross $50 Billion Milestone', tag: 'CRYPTO' },
        { time: '6h ago', source: 'CNBC', title: 'Retail Consumer Spending Surprises to the Upside, Boosting Retail Sector Stocks', tag: 'EQUITIES' },
        { time: '8h ago', source: 'MarketWatch', title: 'Treasury Yields Flatten as Bond Traders Price in Softer Landing Scenario', tag: 'BONDS' }
    ];

    return (
        <div className="h-full overflow-y-auto p-8 max-w-4xl mx-auto">
            <div className="mb-8 border-b border-zinc-900 pb-6">
                <h2 className="text-3xl font-light text-white mb-2">Global Market Intelligence</h2>
                <p className="text-zinc-500">Curated financial news streams filtered for high-impact market events.</p>
            </div>
            <div className="flex flex-col gap-4">
                {news.map((item, i) => (
                    <div key={i} className="bg-[#0a0a0b] border border-zinc-900 p-6 rounded-lg hover:border-zinc-700 transition-colors cursor-pointer group flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-mono text-zinc-500">{item.time} &bull; {item.source}</span>
                            <span className="text-xs font-semibold px-2 py-1 bg-zinc-900 text-tradingGreen/80 rounded uppercase tracking-wider">{item.tag}</span>
                        </div>
                        <h3 className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors">{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OptionsView() {
    const chain = [
        { strike: 190.0, callBid: 12.4, callAsk: 12.6, putBid: 2.1, putAsk: 2.2, vol: '14.2K' },
        { strike: 195.0, callBid: 8.7, callAsk: 8.9, putBid: 3.5, putAsk: 3.6, vol: '28.5K' },
        { strike: 200.0, callBid: 5.2, callAsk: 5.4, putBid: 5.1, putAsk: 5.3, vol: '45.1K' },
        { strike: 205.0, callBid: 2.8, callAsk: 2.9, putBid: 8.4, putAsk: 8.6, vol: '32.0K' },
        { strike: 210.0, callBid: 1.1, callAsk: 1.2, putBid: 12.7, putAsk: 13.0, vol: '18.4K' }
    ];

    return (
        <div className="h-full overflow-y-auto p-8 max-w-6xl mx-auto">
            <div className="mb-8 border-b border-zinc-900 pb-6">
                <h2 className="text-3xl font-light text-white mb-2">Options Chain & Derivatives</h2>
                <div className="flex gap-4 mt-4">
                    <select className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-md p-2 outline-none">
                        <option>AAPL - Apple Inc.</option>
                        <option>TSLA - Tesla Inc.</option>
                    </select>
                    <select className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-md p-2 outline-none">
                        <option>Exp: 21 Jun 2026</option>
                        <option>Exp: 18 Sep 2026</option>
                    </select>
                </div>
            </div>
            
            <div className="bg-[#0a0a0b] border border-zinc-900 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-950 text-zinc-400 font-mono text-xs uppercase border-b border-zinc-900">
                        <tr>
                            <th colSpan="2" className="px-6 py-3 text-center border-r border-zinc-900 text-tradingGreen/80">CALLS</th>
                            <th className="px-6 py-3 text-center bg-zinc-900/50">STRIKE</th>
                            <th colSpan="2" className="px-6 py-3 text-center border-l border-zinc-900 text-red-500/80">PUTS</th>
                            <th className="px-6 py-3 text-right">VOLUME</th>
                        </tr>
                        <tr className="border-t border-zinc-900">
                            <th className="px-6 py-2 text-center border-r border-zinc-900">Bid</th>
                            <th className="px-6 py-2 text-center border-r border-zinc-900">Ask</th>
                            <th className="px-6 py-2 text-center bg-zinc-900/50">Price</th>
                            <th className="px-6 py-2 text-center border-r border-zinc-900 border-l border-zinc-900">Bid</th>
                            <th className="px-6 py-2 text-center border-r border-zinc-900">Ask</th>
                            <th className="px-6 py-2 text-right">Contracts</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono">
                        {chain.map((row, i) => (
                            <tr key={i} className="border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors">
                                <td className="px-6 py-4 text-center border-r border-zinc-900/50 text-white">{row.callBid.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center border-r border-zinc-900/50 text-white">{row.callAsk.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center bg-zinc-900/20 font-bold text-white border-r border-zinc-900/50">${row.strike.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center border-r border-zinc-900/50 text-white">{row.putBid.toFixed(2)}</td>
                                <td className="px-6 py-4 text-center border-r border-zinc-900/50 text-white">{row.putAsk.toFixed(2)}</td>
                                <td className="px-6 py-4 text-right text-zinc-500">{row.vol}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function CommoditiesView() {
    const assets = [
        { name: 'Crude Oil (WTI)', price: 78.45, change: 1.2, unit: 'USD/bbl' },
        { name: 'Gold (COMEX)', price: 2341.10, change: -5.4, unit: 'USD/oz' },
        { name: 'Silver', price: 28.50, change: 0.15, unit: 'USD/oz' },
        { name: 'Natural Gas', price: 2.85, change: -0.05, unit: 'USD/MMBtu' },
        { name: 'Copper', price: 4.12, change: 0.08, unit: 'USD/lb' },
        { name: 'Wheat', price: 620.50, change: 12.0, unit: 'USd/bu' }
    ];

    return (
        <div className="h-full overflow-y-auto p-8 max-w-7xl mx-auto">
            <div className="mb-8 border-b border-zinc-900 pb-6">
                <h2 className="text-3xl font-light text-white mb-2">Global Commodities Spot</h2>
                <p className="text-zinc-500">Live metals, energy, and agriculture futures.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset, i) => {
                    const isUp = asset.change >= 0;
                    return (
                        <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 hover:border-zinc-700 transition">
                            <div className="text-zinc-400 font-medium mb-4">{asset.name}</div>
                            <div className={`text-4xl font-mono font-bold mb-1 ${isUp ? 'text-tradingGreen' : 'text-red-500'}`}>
                                {asset.price.toFixed(2)}
                            </div>
                            <div className="flex justify-between items-end">
                                <div className={`text-sm font-mono ${isUp ? 'text-tradingGreen/80' : 'text-red-500/80'}`}>
                                    {isUp ? '▲' : '▼'} {Math.abs(asset.change).toFixed(2)}
                                </div>
                                <div className="text-xs text-zinc-600 font-mono">{asset.unit}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function FundsView() {
    const funds = [
        { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust', nav: 512.45, ytd: '+10.4%' },
        { ticker: 'QQQ', name: 'Invesco QQQ Trust', nav: 445.20, ytd: '+12.1%' },
        { ticker: 'VTI', name: 'Vanguard Total Stock Market', nav: 256.80, ytd: '+9.8%' },
        { ticker: 'ARKK', name: 'ARK Innovation ETF', nav: 48.30, ytd: '-2.4%' }
    ];

    return (
        <div className="h-full overflow-y-auto p-8 max-w-6xl mx-auto">
            <div className="mb-8 border-b border-zinc-900 pb-6">
                <h2 className="text-3xl font-light text-white mb-2">Mutual Funds & ETFs</h2>
                <p className="text-zinc-500">Track performance of index funds and managed portfolios.</p>
            </div>
            
            <div className="bg-[#0a0a0b] border border-zinc-900 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-950 text-zinc-400 font-mono text-xs uppercase border-b border-zinc-900">
                        <tr>
                            <th className="px-6 py-4">TICKER</th>
                            <th className="px-6 py-4">FUND NAME</th>
                            <th className="px-6 py-4 text-right">NAV (PRICE)</th>
                            <th className="px-6 py-4 text-right">YTD P&L</th>
                        </tr>
                    </thead>
                    <tbody>
                        {funds.map((f, i) => (
                            <tr key={i} className="border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors">
                                <td className="px-6 py-4 font-mono font-bold text-white">{f.ticker}</td>
                                <td className="px-6 py-4 text-zinc-300">{f.name}</td>
                                <td className="px-6 py-4 text-right font-mono text-white">${f.nav.toFixed(2)}</td>
                                <td className={`px-6 py-4 text-right font-mono ${f.ytd.startsWith('+') ? 'text-tradingGreen' : 'text-red-500'}`}>{f.ytd}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// --- Main Application Shell ---

function TerminalApp() {
    const [activeTab, setActiveTab] = useState('equities');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Authenticate via token on load
        const token = getToken();
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        fetch(API_BASE + '/user/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) throw new Error('Unauthorized');
            setLoading(false);
        })
        .catch(() => {
            localStorage.removeItem('tradingone_jwt');
            window.location.href = 'login.html';
        });
    }, []);

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center bg-terminalBg text-tradingGreen font-mono">INITIALIZING TERMINAL KERNEL...</div>;
    }

    const titles = {
        'equities': 'Global Equities Market',
        'crypto': 'Cryptocurrency Orderbook',
        'options': 'Derivatives & Options Flow',
        'commodities': 'Commodities Spot & Futures',
        'funds': 'Mutual Funds & ETFs',
        'news': 'Live Market Intelligence'
    };

    return (
        <div className="flex h-full w-full overflow-hidden">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col bg-terminalBg">
                <TopHeader activeTabTitle={titles[activeTab]} />
                <main className="flex-1 overflow-hidden relative">
                    {activeTab === 'equities' && <EquitiesView />}
                    {activeTab === 'crypto' && <CryptoView />}
                    {activeTab === 'options' && <OptionsView />}
                    {activeTab === 'commodities' && <CommoditiesView />}
                    {activeTab === 'funds' && <FundsView />}
                    {activeTab === 'news' && <NewsView />}
                </main>
            </div>
        </div>
    );
}

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<TerminalApp />);
