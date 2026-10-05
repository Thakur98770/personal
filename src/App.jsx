import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import { useReducedMotion } from "./hooks";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const finishLoading = useCallback(() => setLoading(false), []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", loading);
    return () => document.body.classList.remove("is-locked");
  }, [loading]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Background />

      <AnimatePresence>
        {loading && <Loader key="loader" onDone={finishLoading} reducedMotion={reducedMotion} />}
      </AnimatePresence>

      <Navbar />

      <main id="main">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home ready={!loading} />} />
              <Route path="/work/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<Home ready={!loading} />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
