import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authCollection } from "../models/authModels.js";
import { managerCollection } from "../models/mangerModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// ADMIN CONTROLLERS 

// Step 1: Register Admin
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, confirm_password, status } = req.body;

    // Validation
    if (!username || !email || !password || !confirm_password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if password matches
    if (password !== confirm_password) {
      return res.status(400).json({ success: false, message: "Password and confirm password do not match" });
    }

    // Check if email already exists
    const existingAdmin = await authCollection.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Email is already registered" });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate timestamps
    const now = new Date().toISOString();

    // Create new admin
    const newAdmin = new authCollection({
      username,
      email,
      password: hashedPassword,
      status: status !== undefined ? status : true,
      created_date: now,
      updated_date: now
    });

    await newAdmin.save();

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        status: newAdmin.status,
        created_date: newAdmin.created_date
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Step 2: Login Admin & Generate JWT Token
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Find admin by email
    const admin = await authCollection.findOne({ email });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, email: admin.email, username: admin.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      token,
      data: {
        adminId: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// MANAGER CONTROLLERS

// Step 3: Insert Manager Information by Admin (requires valid token)
export const createManager = async (req, res) => {
  try {
    const { name, email, salary, designation, phone, status } = req.body;

    // Validation
    if (!name || !email || !salary || !designation) {
      return res.status(400).json({ success: false, message: "Name, email, salary, and designation are required" });
    }

    // Check if email already exists
    const existingManager = await managerCollection.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ success: false, message: "Manager with this email already exists" });
    }

    // Generate timestamps
    const now = new Date().toISOString();

    // Create new manager
    const newManager = new managerCollection({
      name,
      email,
      salary,
      designation,
      phone: phone || "",
      status: status !== undefined ? status : true,
      created_date: now,
      updated_date: now
    });

    await newManager.save();

    return res.status(201).json({
      success: true,
      message: "Manager created successfully",
      data: {
        id: newManager._id,
        name: newManager.name,
        email: newManager.email,
        salary: newManager.salary,
        designation: newManager.designation,
        phone: newManager.phone,
        status: newManager.status,
        created_date: newManager.created_date
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Step 4: Get All Managers
export const getAllManagers = async (req, res) => {
  try {
    const managers = await managerCollection.find();

    return res.status(200).json({
      success: true,
      message: "Managers retrieved successfully",
      count: managers.length,
      data: managers
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Step 5: Delete Manager by ID
export const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Manager ID is required" });
    }

    const deletedManager = await managerCollection.findByIdAndDelete(id);

    if (!deletedManager) {
      return res.status(404).json({ success: false, message: "Manager not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Manager deleted successfully",
      data: deletedManager
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Step 6: Update Manager (PUT)
export const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, salary, designation, phone, status } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Manager ID is required" });
    }

    // Check if email is being updated and if it's already in use
    if (email) {
      const existingManager = await managerCollection.findOne({ email, _id: { $ne: id } });
      if (existingManager) {
        return res.status(400).json({ success: false, message: "Email already in use by another manager" });
      }
    }

    // Generate updated timestamp
    const now = new Date().toISOString();

    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (salary) updatedData.salary = salary;
    if (designation) updatedData.designation = designation;
    if (phone !== undefined) updatedData.phone = phone;
    if (status !== undefined) updatedData.status = status;
    updatedData.updated_date = now;

    const updatedManager = await managerCollection.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedManager) {
      return res.status(404).json({ success: false, message: "Manager not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Manager updated successfully",
      data: updatedManager
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Step 7: Search Managers (by name, email, or phone)
export const searchManagers = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({ success: false, message: "Search query is required" });
    }

    const managers = await managerCollection.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } }
      ]
    });

    return res.status(200).json({
      success: true,
      message: "Search results",
      count: managers.length,
      data: managers
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Step 8: Get Managers with Pagination
export const getManagersWithPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({ success: false, message: "Page and limit must be positive numbers" });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const managers = await managerCollection.find().skip(skip).limit(limitNumber);
    const totalCount = await managerCollection.countDocuments();
    const totalPages = Math.ceil(totalCount / limitNumber);

    return res.status(200).json({
      success: true,
      message: "Managers retrieved with pagination",
      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
        totalRecords: totalCount,
        totalPages
      },
      data: managers
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Step 9: Delete Multiple Managers
export const deleteMultipleManagers = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, message: "Array of manager IDs is required" });
    }

    const result = await managerCollection.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} managers deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
