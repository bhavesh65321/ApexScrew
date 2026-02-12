import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import FloatingCTA from './components/common/FloatingCTA';
import MobileStickyCTA from './components/common/MobileStickyCTA';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MeetingRequestPage from './pages/MeetingRequestPage';
import AdminPage from './pages/AdminPage';
import { initAnalytics } from './utils/analytics';
import { trackPageView } from './services/visitorTracking';

// Initialize analytics on app load
initAnalytics();

// Layout wrapper to conditionally show header/footer
const Layout = ({ children }) => {
  const location = useLocation();
  // Hide header/footer on admin page
  const isAdminPage = location.pathname.includes('apex-admin');
  
  // Track page views (except admin page)
  useEffect(() => {
    if (!isAdminPage) {
      trackPageView(location.pathname);
    }
  }, [location.pathname, isAdminPage]);
  
  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingCTA />
      <MobileStickyCTA />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/request-meeting" element={<MeetingRequestPage />} />
          {/* Hidden Admin Route - Complex URL, not linked anywhere */}
          <Route path="/apex-admin" element={<AdminPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
