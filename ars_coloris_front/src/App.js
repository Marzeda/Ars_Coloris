import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Process from "./pages/Process";
import Projects from "./pages/Projects";
import Cooperation from "./pages/Cooperation";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Artist from "./pages/Artist";

import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/ProtectedRoute";

import ForgotPassword from "./pages/ForgotPassword";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/process" element={<Process />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/cooperation" element={<Cooperation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute allowedRole="admin">
                            <Admin />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/artist"
                    element={
                        <ProtectedRoute allowedRole="artist">
                            <Artist />
                        </ProtectedRoute>
                    }
                />
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