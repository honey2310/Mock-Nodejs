import express from "express";
import {
  registerAdmin,
  loginAdmin,
  createManager,
  getAllManagers,
  deleteManager,
  updateManager,
  searchManagers,
  getManagersWithPagination,
  deleteMultipleManagers
} from "../controllers/authControllers.js";
import { verifyAdminToken } from "../middlewares/auth.js";

const router = express.Router();

// ==================== ADMIN ROUTES ====================

// Step 1: Register Admin
router.post("/admin/register", registerAdmin);

// Step 2: Login Admin
router.post("/admin/login", loginAdmin);

// ==================== MANAGER ROUTES (All require Admin Token) ====================

// Step 3: Create Manager (Admin Token Required)
router.post("/manager", verifyAdminToken, createManager);

// Step 4: Get All Managers
router.get("/manager", verifyAdminToken, getAllManagers);

// Step 5: Delete Manager by ID
router.delete("/manager/:id", verifyAdminToken, deleteManager);

// Step 6: Update Manager (PUT)
router.put("/manager/:id", verifyAdminToken, updateManager);

// Step 7: Search Managers
router.get("/manager/search", verifyAdminToken, searchManagers);

// Step 8: Get Managers with Pagination
router.get("/manager/pagination", verifyAdminToken, getManagersWithPagination);

// Step 9: Delete Multiple Managers
router.delete("/manager/delete-multiple", verifyAdminToken, deleteMultipleManagers);

export default router;
