import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { MyThemeContextProvider } from "../contexts/theme.jsx";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI prompts",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <MyThemeContextProvider>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </MyThemeContextProvider>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
