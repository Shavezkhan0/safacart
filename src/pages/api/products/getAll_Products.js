import conn_to_mon from "@/features/mongoose";
import Products from "@/models/Products";

export default async function getAll_Products(req, res) {
    conn_to_mon();
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ message: "Method not allowed" });
        }
        const { skip, limit } = req.query;
        let allProducts = await Products.find({})
            .skip(Number(skip))
            .limit(Number(limit));
        if (!allProducts || allProducts.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({
            products: allProducts,
            message: "Products fetched successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
}
