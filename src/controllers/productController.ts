import { Request, Response } from "express";
import Product, { IProduct } from "../models/product";

export default {
  async createProduct(req: Request, res: Response) {
    try {
      const product: IProduct = new Product(req.body);
      const savedProduct: IProduct = await product.save();
      res.status(201).json({
        success: true,
        message: "Product created successfully!",
        data: savedProduct,
      });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  },

  async getAllProducts(req: Request, res: Response) {
    try {
      const products: IProduct[] = await Product.find();
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: products,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const product: IProduct | null = await Product.findById(
        req.params.productId
      );
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });
      }
      res.status(200).json({
        success: true,
        message: "Product created successfully!",
        data: product,
      });
      res.status(500).json({ success: false });
    } catch (error) {}
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(
        req.params.productId,
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });
      }
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },

  async deleteProduct(req: Request, res: Response) {
    try {
      const deletedProduct: IProduct | null = await Product.findByIdAndDelete(
        req.params.productId
      );
      if (!deletedProduct) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });
      }
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: null,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },

  async searchProduct(req: Request, res: Response) {
    try {
      const searchTerm: string = req.query.searchTerm as string;
      const products: IProduct[] = await Product.find({
        $text: { $search: searchTerm },
      });
      res.status(200).json({
        success: true,
        message: `Products matching search term '${searchTerm}' fetched successfully!`,
        data: products,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
};
