import conn_to_mon from "@/features/mongoose";
import Order from "@/models/Order";
import Products from "@/models/Products";

export default async function preTransection(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const {
        username,
        email,
        phoneNumber,
        address,
        city,
        state,
        country,
        landmark,
        pincode,
        paymentMethod,
        deliveryamount,
        totalPrice,
        cart,
        location,
    } = req.body;

    await conn_to_mon();

    try {
        // Cart and totalPrice validation
        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty or invalid." });
        }

        let calculatedTotal = 0;

        // Loop through cart and validate each product
        for (let item of cart) {
            const product = await Products.findById(item._id).lean();

            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item._id} not found.` });
            }

            const price = parseFloat(product.price);
            if (isNaN(price)) {
                return res.status(400).json({ message: `Invalid price for product ID ${item._id}.` });
            }

            calculatedTotal += price * item.quantity;
        }

        if (calculatedTotal !== totalPrice) {
            return res.status(400).json({
                message: "Total price mismatch.",
                calculatedTotal,
                sentTotal: totalPrice,
            });
        }

        // If payment method is CashOnDelivery, create the order
        if (paymentMethod === "CashOnDelivery") {
            const newOrder = new Order({
                username,
                email,
                phoneNumber,
                address,
                city,
                state,
                country,
                landmark,
                pincode,
                paymentMethod,
                deliveryamount,
                totalPrice,
                cart: cart.map(item => ({
                    product: item._id, // Make sure this matches your schema
                    quantity: item.quantity,
                    price: item.price,
                })),
                location: location?.latitude && location?.longitude ? {
                    type: "Point",
                    coordinates: [location.longitude, location.latitude] // Note: longitude first!
                } : undefined,
            });

            console.log(newOrder);
            console.log(1);
            await newOrder.save();
            console.log(2);
            return res.status(200).json({ message: "Order created successfully." });
        }

        return res.status(200).json({ message: "Total price verified successfully." });
    } catch (error) {
        console.error("Detailed error:", {
            errorMessage: error.message,
            errorStack: error.stack,
            validationErrors: error.errors
          });
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}