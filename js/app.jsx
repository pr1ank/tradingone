const { useState, useEffect, useRef } = React;

// ——— Data ———

const stocksData = [
    { symbol: "AAPL", name: "Apple Inc.", price: 198.45, change: 2.34, changePercent: 1.19, marketCap: "3.09T", color: "#555555" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 452.78, change: -1.56, changePercent: -0.34, marketCap: "3.37T", color: "#00a4ef" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 176.23, change: 3.12, changePercent: 1.80, marketCap: "2.18T", color: "#4285f4" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 213.67, change: -0.89, changePercent: -0.41, marketCap: "2.21T", color: "#ff9900" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 287.54, change: 8.76, changePercent: 3.14, marketCap: "913B", color: "#cc0000" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 924.56, change: 15.23, changePercent: 1.67, marketCap: "2.28T", color: "#76b900" },
    { symbol: "META", name: "Meta Platforms", price: 567.89, change: -4.32, changePercent: -0.76, marketCap: "1.44T", color: "#1877f2" },
    { symbol: "JPM", name: "JPMorgan Chase", price: 198.34, change: 1.45, changePercent: 0.74, marketCap: "571B", color: "#003087" },
];

const cryptoData = [
    { name: "Bitcoin", symbol: "BTC", price: 97432.56, change: 2.45, rank: 1, marketCap: "1.91T", volume: "42.3B", supply: "19.8M", color: "#f7931a" },
    { name: "Ethereum", symbol: "ETH", price: 3847.23, change: -1.12, rank: 2, marketCap: "462B", volume: "18.7B", supply: "120.2M", color: "#627eea" },
    { name: "BNB", symbol: "BNB", price: 712.45, change: 0.87, rank: 3, marketCap: "106B", volume: "2.1B", supply: "149M", color: "#f3ba2f" },
    { name: "Solana", symbol: "SOL", price: 214.67, change: 5.23, rank: 4, marketCap: "98B", volume: "4.5B", supply: "441M", color: "#9945ff" },
    { name: "XRP", symbol: "XRP", price: 2.34, change: -0.56, rank: 5, marketCap: "134B", volume: "3.2B", supply: "57.2B", color: "#00aae4" },
    { name: "Cardano", symbol: "ADA", price: 1.12, change: 3.78, rank: 6, marketCap: "39.5B", volume: "1.8B", supply: "35.4B", color: "#0033ad" },
    { name: "Dogecoin", symbol: "DOGE", price: 0.4523, change: -2.14, rank: 7, marketCap: "65B", volume: "5.1B", supply: "143B", color: "#c2a633" },
    { name: "Polkadot", symbol: "DOT", price: 12.87, change: 1.92, rank: 8, marketCap: "18.2B", volume: "890M", supply: "1.42B", color: "#e6007a" },
];

const newsData = [
    { title: "Bitcoin Surges Past $97,000 as Institutional Demand Grows", excerpt: "Bitcoin has reached new highs as major financial institutions continue to increase their crypto holdings. Analysts predict further growth driven by ETF inflows and regulatory clarity.", tag: "crypto", tagLabel: "Crypto", source: "CryptoNews", date: "Mar 7, 2026", icon: "\u{1F4C8}" },
    { title: "Federal Reserve Signals Potential Rate Cuts in Q2 2026", excerpt: "The Federal Reserve has indicated it may lower interest rates in the coming months, citing improved inflation data and a stable labor market. Markets rallied on the news.", tag: "market", tagLabel: "Market", source: "MarketWatch", date: "Mar 6, 2026", icon: "\u{1F3E2}" },
    { title: "Solana Ecosystem Sees Record Developer Activity", excerpt: "The Solana blockchain has recorded its highest-ever developer activity, with over 2,500 active projects. DeFi and NFT applications continue to drive growth on the network.", tag: "crypto", tagLabel: "Crypto", source: "BlockchainDaily", date: "Mar 6, 2026", icon: "\u{1F4BB}" },
    { title: "EU Approves New Digital Asset Regulation Framework", excerpt: "The European Union has passed comprehensive legislation to regulate digital assets, providing clear guidelines for exchanges, stablecoins, and DeFi protocols operating within the EU.", tag: "regulation", tagLabel: "Regulation", source: "Reuters", date: "Mar 5, 2026", icon: "\u2696" },
    { title: "NVIDIA Reports Record Revenue Driven by AI Chip Demand", excerpt: "NVIDIA's quarterly earnings exceeded expectations with record revenue of $38 billion, fueled by unprecedented demand for AI training and inference chips from tech companies.", tag: "market", tagLabel: "Market", source: "TechCrunch", date: "Mar 5, 2026", icon: "\u{1F6E0}" },
    { title: "Ethereum Layer 2 Networks Process More Transactions Than Mainnet", excerpt: "For the first time, Ethereum Layer 2 solutions collectively processed more daily transactions than the Ethereum mainnet, signaling the success of the scaling roadmap.", tag: "analysis", tagLabel: "Analysis", source: "The Block", date: "Mar 4, 2026", icon: "\u{1F4CA}" },
];

// ——— Helper ———

function formatCryptoPrice(price) {
    if (price >= 1000) return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 1) return "$" + price.toFixed(2);
    return "$" + price.toFixed(4);
}

// ——— Components ———

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(function () {
        function handleScroll() {
            setScrolled(window.scrollY > 50);

            var sections = document.querySelectorAll("section[id]");
            var scrollY = window.scrollY + 100;
            for (var i = 0; i < sections.length; i++) {
                var section = sections[i];
                if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
                    setActiveSection(section.id);
                }
            }
        }
        window.addEventListener("scroll", handleScroll);
        return function () { window.removeEventListener("scroll", handleScroll); };
    }, []);

    function scrollTo(e, id) {
        e.preventDefault();
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
    }

    var navStyle = {
        borderBottomColor: scrolled ? "#222222" : "#1a1a1a",
        backgroundColor: scrolled ? "rgba(0, 0, 0, 0.95)" : "rgba(0, 0, 0, 0.9)"
    };

    var mobileStyle = mobileOpen ? {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "60px",
        left: "0",
        right: "0",
        backgroundColor: "#111111",
        padding: "20px",
        borderBottom: "1px solid #1a1a1a"
    } : {};

    return (
        <nav className="navbar" style={navStyle}>
            <div className="container">
                <span className="navbar-logo">TradingOne</span>

                <div className="nav-links" style={mobileStyle}>
                    <a href="#markets" className={activeSection === "markets" ? "active" : ""} onClick={function (e) { scrollTo(e, "markets"); }}>Markets</a>
                    <a href="#crypto" className={activeSection === "crypto" ? "active" : ""} onClick={function (e) { scrollTo(e, "crypto"); }}>Crypto</a>
                    <a href="#news" className={activeSection === "news" ? "active" : ""} onClick={function (e) { scrollTo(e, "news"); }}>News</a>
                </div>

                <div className="nav-right">
                    <button className="btn-get-started">Get Started</button>
                </div>

                <button className="mobile-menu-toggle" onClick={function () { setMobileOpen(!mobileOpen); }}>&#9776;</button>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Trade with Precision.</h1>
                <p>The ultimate tools for market analysis, advanced charting, and real-time data to edge out the competition.</p>
                <div className="hero-buttons">
                    <button className="btn-primary">Start Free Trial</button>
                    <button className="btn-secondary">Explore Features</button>
                </div>
                <p className="hero-note">No credit card required. Cancel anytime.</p>
            </div>
        </section>
    );
}

function Markets() {
    return (
        <section id="markets">
            <div className="container">
                <h2 className="section-title">Markets</h2>
                <p className="section-subtitle">Track stocks and indices in real-time</p>

                <div className="markets-header">
                    <div className="market-tabs">
                        <button className="market-tab active">Stocks</button>
                    </div>
                </div>

                <table className="market-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Change</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocksData.map(function (stock) {
                            var isPositive = stock.change >= 0;
                            var changeClass = isPositive ? "change-positive" : "change-negative";
                            var changeSign = isPositive ? "+" : "";

                            return (
                                <tr key={stock.symbol}>
                                    <td>
                                        <div className="asset-name">
                                            <div className="asset-icon" style={{ backgroundColor: stock.color }}>{stock.symbol.charAt(0)}</div>
                                            <div>
                                                <div className="asset-symbol">{stock.symbol}</div>
                                                <div className="asset-fullname">{stock.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${stock.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className={changeClass}>{changeSign}{stock.changePercent.toFixed(2)}%</td>
                                    <td>${stock.marketCap}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

function CryptoCard({ coin }) {
    var isPositive = coin.change >= 0;
    var changeClass = isPositive ? "change-positive" : "change-negative";
    var changeSign = isPositive ? "+" : "";
    var arrow = isPositive ? "\u25B2" : "\u25BC";

    return (
        <div className="crypto-card">
            <div className="crypto-card-header">
                <div className="crypto-card-left">
                    <div className="crypto-icon" style={{ backgroundColor: coin.color }}>{coin.symbol.charAt(0)}</div>
                    <div>
                        <div className="crypto-name">{coin.name}</div>
                        <div className="crypto-symbol">{coin.symbol}</div>
                    </div>
                </div>
                <span className="crypto-rank">#{coin.rank}</span>
            </div>
            <div className="crypto-price">{formatCryptoPrice(coin.price)}</div>
            <div className={"crypto-change " + changeClass}>{arrow} {changeSign}{coin.change.toFixed(2)}%</div>
            <div className="crypto-details">
                <div className="crypto-detail-item">
                    <div className="crypto-detail-label">Market Cap</div>
                    <div className="crypto-detail-value">${coin.marketCap}</div>
                </div>
                <div className="crypto-detail-item">
                    <div className="crypto-detail-label">Volume 24h</div>
                    <div className="crypto-detail-value">${coin.volume}</div>
                </div>
                <div className="crypto-detail-item">
                    <div className="crypto-detail-label">Supply</div>
                    <div className="crypto-detail-value">{coin.supply}</div>
                </div>
            </div>
        </div>
    );
}

function Crypto() {
    return (
        <section id="crypto">
            <div className="container">
                <h2 className="section-title">Cryptocurrency</h2>
                <p className="section-subtitle">Live crypto prices and market data</p>
                <div className="crypto-grid">
                    {cryptoData.map(function (coin) {
                        return <CryptoCard key={coin.symbol} coin={coin} />;
                    })}
                </div>
            </div>
        </section>
    );
}

function NewsCard({ article }) {
    return (
        <div className="news-card">
            <div className="news-image">
                <span className="news-icon">{article.icon}</span>
            </div>
            <div className="news-body">
                <span className={"news-tag " + article.tag}>{article.tagLabel}</span>
                <h3 className="news-title">{article.title}</h3>
                <p className="news-excerpt">{article.excerpt}</p>
                <div className="news-footer">
                    <span className="news-source">{article.source}</span>
                    <span className="news-date">{article.date}</span>
                </div>
            </div>
        </div>
    );
}

function News() {
    return (
        <section id="news">
            <div className="container">
                <h2 className="section-title">Latest News</h2>
                <p className="section-subtitle">Stay informed with the latest market and crypto news</p>
                <div className="news-grid">
                    {newsData.map(function (article, index) {
                        return <NewsCard key={index} article={article} />;
                    })}
                </div>
            </div>
        </section>
    );
}

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <Hero />
            <Markets />
            <Crypto />
            <News />
        </React.Fragment>
    );
}

// ——— Render ———

var root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
