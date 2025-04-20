import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema(
  {
    username: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    landmark: {
      type: String,
      required: false,
    },
    pincode: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        _id: false, // Prevent _id in cart subdocuments
      },
    ],
    deliveryamount: {
      type: Number,
      required: false,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: false,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: false,
      },
      coordinates: {
        type: [Number],
        required: false,
        default: [], // Handle missing coordinates
      },
    },
    deliverystatus: {
      pack: {
        type: String,
        default: 'pending',
      },
      shipped: {
        type: String,
        default: 'pending',
      },
      deliver: {
        type: String,
        default: 'pending',
      },
    },
  },
  { timestamps: true }
);

// Create a 2dsphere index for geospatial queries
OrderSchema.index({ location: '2dsphere' });

export default mongoose.models.Orders || mongoose.model('Orders', OrderSchema);