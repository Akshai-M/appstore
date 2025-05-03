import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProductListingPage from './pages/ProductListingPage';
import SignIn from './pages/SignIn';
import CartPage from './pages/CartPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/layout/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const isAuthPage = location.pathname === '/signin'; 

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          {!isAuthPage && <Header showHeader={showHeader} />}
          {!isAuthPage && <Navbar />}
          <main className="flex-grow">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <ProductListingPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<CartPage />} />
              <Route path="/"  />
            </Routes>
          </main>
          {!isAuthPage && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
