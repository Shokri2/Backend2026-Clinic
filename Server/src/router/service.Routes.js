import express from "express";
import Service from "../model/service.Model.js";

const router = express.Router();

// ================= ADD SERVICE =================

router.post("/services", async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET ALL SERVICES =================

router.get("/services", async (req, res) => {
  try {
    const services = await Service.find();

    res.json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET SERVICE BY ID =================

router.get("/services/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= UPDATE SERVICE =================

router.put("/services/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= DELETE SERVICE =================

router.delete("/services/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Service deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
