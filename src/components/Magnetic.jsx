import { cloneElement } from "react";
import { useMagnetic } from "../hooks";

/** Wraps a single child and gives it magnetic pull. */
export default function Magnetic({ children, strength = 0.3 }) {
  const ref = useMagnetic(strength);
  return cloneElement(children, { ref });
}
