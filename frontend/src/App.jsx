import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WhatsAppFloat from "./components/WhatsAppFloat";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import Cuenta from "./pages/Cuenta";
import MisPedidos from "./pages/MisPedidos";
import Seguimiento from "./pages/Seguimiento";
import Admin from "./pages/Admin";
import Nosotros from "./pages/Nosotros";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <CartDrawer />
      <main key={location.pathname} className="page-transition">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/cuenta" element={<Cuenta />} />
          <Route path="/mis-pedidos" element={<MisPedidos />} />
          <Route path="/seguimiento" element={<Seguimiento />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
