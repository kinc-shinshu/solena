import React from "react";

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

export default Layout;
