import React from "react";
import { node } from "prop-types";

const Hero = ({ children }) => (
  <div className="hero">
    {children}
    <style jsx>{`
      .hero {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
      }
    `}</style>
  </div>
);

Hero.propTypes = {
  children: node.isRequired,
};

export default Hero;
