import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

export async function getDashboardStats(req, res) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [result] = await Order.aggregate([
      {
        $facet: {
          orders: [
            { $match: {} },
            {
              $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                todayOrders: {
                  $sum: { $cond: [{ $gte: ["$createdAt", today] }, 1, 0] },
                },
                totalRevenue: {
                  $sum: {
                    $cond: [
                      { $eq: ["$paymentStatus", "Paid"] },
                      "$totalAmount",
                      0,
                    ],
                  },
                },
              },
            },
          ],
          status: [
            {
              $group: {
                _id: {
                  $switch: {
                    branches: [
                      {
                        case: { $eq: ["$status", "shipping"] },
                        then: "shipped",
                      },
                      {
                        case: { $eq: ["$status", "processing"] },
                        then: "processing",
                      },
                      {
                        case: { $eq: ["$status", "delivered"] },
                        then: "delivered",
                      },
                      {
                        case: { $eq: ["$status", "cancelled"] },
                        then: "cancelled",
                      },
                    ],
                    default: "unknown",
                  },
                },
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const orders = result.orders[0] || {};
    const statusMap = Object.fromEntries(
      (result.status || []).map((s) => [s._id, s.count])
    );

    const [productsCount, categoriesCount, usersCount] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      User.countDocuments({ role: { $ne: "admin" } }),
    ]);

    res.json({
      success: true,
      data: {
        ...orders,
        pending: statusMap.pending || 0,
        processing: statusMap.processing || 0,
        shipped: statusMap.shipped || 0,
        delivered: statusMap.delivered || 0,
        cancelled: statusMap.cancelled || 0,
        totalProducts: productsCount,
        totalCategories: categoriesCount,
        totalUsers: usersCount,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
