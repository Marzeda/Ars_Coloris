import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import Footer from "./components/Footer";

import Cooperation from "./pages/Cooperation";


import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
				<Route path="/product/:id" element={<ProductDetails />} />
				<Route path="/Cooperation" element={<Cooperation />} />
            </Routes>
			<Footer />
        </BrowserRouter>
    );
}

export default App;