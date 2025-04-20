import conn_to_mon from "@/features/mongoose";
import Products from "@/models/Products";

export default async function getProduct(req, res) {
    conn_to_mon();
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ message: "Method not allowed" });
        }
        const {id}=req.query
        let product = await Products.findById(id);
        if (!product || product.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({
            products: product,
            message: "product fetched successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
}
