
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";
import PolishTypography from "./components/PolishTypography";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Archive from "./pages/Archive";
import Process from "./pages/Process";
import Projects from "./pages/Projects";
import Cooperation from "./pages/Cooperation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Artist from "./pages/Artist";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

// Dokumenty prawne Ars Coloris
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import Terms from "./pages/Terms";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <PolishTypography />

            <Navbar />

            <Routes>
                {/* Strony publiczne */}
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/archive" element={<Archive />} />
                <Route path="/process" element={<Process />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/cooperation" element={<Cooperation />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                {/* Dokumenty prawne */}
                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy />}
                />
                <Route
                    path="/cookies"
                    element={<CookiesPolicy />}
                />
                <Route
                    path="/terms"
                    element={<Terms />}
                />

                {/* Logowanie */}
                <Route
                    path="/agnieszka"
                    element={<Login />}
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />}
                />

                {/* Panel administratora */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                {/* Panel artysty */}
                <Route
                    path="/artist"
                    element={
                        <ProtectedRoute allowedRole="artist">
                            <Artist />
                        </ProtectedRoute>
                    }
                />

                {/* Resetowanie hasła */}
                <Route
                    path="/reset-password/:token"
                    element={<ResetPassword />}
                />
            </Routes>

            <Footer />
            <ScrollToTopButton />
        </BrowserRouter>
    );
}

export default App;
