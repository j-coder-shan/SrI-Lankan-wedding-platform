import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VendorAdPage from './pages/VendorAdPage';

export default function App() {
  return (
    <Router>
      <div className="font-sans">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  WeddingConnect
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-600 hover:text-pink-600 font-medium transition-colors">
                  Vendor Dashboard
                </Link>
                <Link to="/add-ad" className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors shadow-md text-sm font-semibold">
                  + Post Ad
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<VendorAdPage />} />
          <Route path="/add-ad" element={<VendorAdPage />} />
        </Routes>
      </div>
    </Router>
  );
}
