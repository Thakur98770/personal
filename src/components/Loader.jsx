import { useEffect } from "react";
import { motion } from "framer-motion";
import Brand from "./Brand";

export default function Loader({ onDone, reducedMotion }) {
  useEffect(() => {
    if (reducedMotion) {
      onDone();
      return;
    }
    const timeout = window.setTimeout(onDone, 700);
    return () => window.clearTimeout(timeout);
  }, [onDone, reducedMotion]);

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      <div className="loader-brand">
        <Brand />
      </div>
      <p className="loader-label">Building something thoughtful</p>
      <div className="loader-bar" aria-hidden="true"><i /></div>
    </motion.div>
  );
}
