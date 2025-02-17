import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "My blog",
  description: "Veille sur le développement",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="h-full">
      <body className="flex min-h-full flex-col">
      <Navbar />
      <main className="grow">

        {children }
      </main>
        <Footer />
      </body>
    </html>
  );
}
