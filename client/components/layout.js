import React from "react";
import { node } from "prop-types";

const Layout = ({ children }) => (
  <div className="App">
    {children}
    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
        background-color: #282c34;
      }

      .App {
        text-align: center;
      }
    `}</style>
  </div>
);

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
