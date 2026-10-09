
const BACKEND_URL = "https://ars-coloris-api.onrender.com";

module.exports = async function handler(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");

        return res.status(405).json({
            success: false,
            message: "Method not allowed",
        });
    }

    try {
        const response = await fetch(
            `${BACKEND_URL}/api/products`
        );

        if (!response.ok) {
            throw new Error(
                `Backend returned HTTP ${response.status}`
            );
        }

        const products = await response.json();

        // Cache CDN: 5 minut świeżych danych,
        // następnie do 24 godzin nieaktualnej wersji
        // podczas odświeżania w tle.
        res.setHeader(
            "Vercel-CDN-Cache-Control",
            "public, s-maxage=300, stale-while-revalidate=86400"
        );

        res.setHeader(
            "Cache-Control",
            "public, max-age=0, must-revalidate"
        );

        return res.status(200).json(products);
    } catch (error) {
        console.error("Products API error:", error.message);

        return res.status(502).json({
            success: false,
            message: "Nie udalo się pobrac produktow.",
        });
    }
};
