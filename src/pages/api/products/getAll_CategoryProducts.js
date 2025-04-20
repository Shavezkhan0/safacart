import conn_to_mon from "@/features/mongoose";
import Products from "@/models/Products";

export default async function getAll_CategoryProducts(req, res) {
    conn_to_mon();
    try {
        if (req.method !== "GET") {
            return res.status(405).json({ message: "Method not allowed" });
        }

        const { skip = 0, limit = 10, category } = req.query;

        // Convert category to array if it exists and is not already an array
        const categoryArray = category
            ? Array.isArray(category)
                ? category
                : [category]
            : []; // default to empty array if no category is passed

        // Build the query object
        const query = categoryArray.length > 0
            ? { category: { $in: categoryArray } }
            : {}; // no category filter if none is provided

        const allProducts = await Products.find(query)
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
