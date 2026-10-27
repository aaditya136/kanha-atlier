import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import Craftsmanship from "./components/Craftsmanship";
import InstagramStrip from "./components/InstagramStrip";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { detectCurrency } from "./lib/currency";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currencyCtx, setCurrencyCtx] = useState(null);
  const [currencyResolved, setCurrencyResolved] = useState(false);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    detectCurrency().then((ctx) => {
      if (!cancelled) {
        setCurrencyCtx(ctx);
        setCurrencyResolved(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [reloadTick]);

  return (
    <div data-testid="kanha-home">
      {loading && (
        <LoadingScreen
          ready={currencyResolved}
          onDone={() => setLoading(false)}
        />
      )}
      <Navbar
        currencyCtx={currencyCtx}
        onCurrencyChange={() => setReloadTick((t) => t + 1)}
      />
      <main>
        <Hero />
        <Collections currencyCtx={currencyCtx} />
        <Craftsmanship />
        <InstagramStrip />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
