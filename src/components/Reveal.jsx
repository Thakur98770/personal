import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks";

/**
 * One reveal primitive for the whole site, so timings stay consistent.
 * Set `delay` to stagger siblings; it does nothing under reduced motion.
 */
export default function Reveal({ children, delay = 0, y = 26, as = "div", className, ...rest }) {
  const reduced = useReducedMotion();
  const M = motion[as] || motion.div;
  if (reduced) {
    const Tag = as;
    return <Tag className={className} {...rest}>{children}</Tag>;
  }
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </M>
  );
}
