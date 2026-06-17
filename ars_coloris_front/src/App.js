import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Process from "./pages/Process";
import Projects from "./pages/Projects";
import Cooperation from "./pages/Cooperation";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/process" element={<Process />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/cooperation" element={<Cooperation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>

            <Footer />
            <ScrollToTopButton />
        </BrowserRouter>
    );
}

export default App;