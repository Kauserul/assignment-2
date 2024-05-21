import { Request, Response } from "express";
import Joi from "joi";
import Order, { IOrder } from "../models/order";
import Product from "../models/product";

const orderSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().integer().min(1).required(),
});

export default {
  async createOrder(req: Request, res: Response) {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const { email, productId, price, quantity } = req.body;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      if (product.inventory.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient quantity available in inventory",
        });
      }

      product.inventory.quantity -= quantity;
      product.inventory.inStock = product.inventory.quantity > 0;

      await product.save();

      const order: IOrder = new Order({ email, productId, price, quantity });
      const savedOrder = await order.save();

      res.status(201).json({
        success: true,
        message: "Order created successfully!",
        data: savedOrder,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await Order.find();
      res.status(200).json({
        success: true,
        message: "Orders created successfully!",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },

  async getOrdersByEmail(req: Request, res: Response) {
    const email = req.query.email as string;

    try {
      const orders = await Order.find({ email });
      res.status(200).json({
        success: true,
        message: "Orders created successfully for user email!",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
};
