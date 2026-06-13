import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import Craftsmanship from "./components/Craftsmanship";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { detectCurrency } from "./lib/currency";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [currencyCtx, setCurrencyCtx] = useState(null);

  useEffect(() => {
    let cancelled = false;
    detectCurrency().then((ctx) => {
      if (!cancelled) setCurrencyCtx(ctx);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div data-testid="kanha-home">
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <Navbar currencyCtx={currencyCtx} />
      <main>
        <Hero />
        <Collections currencyCtx={currencyCtx} />
        <Craftsmanship />
        <About />
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
