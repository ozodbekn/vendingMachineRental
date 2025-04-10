const express = require("express");
const db = require("../config/db");
const {
  addNewClient,
  findAllClients,
  findClientById,
  updateClient,
  deleteClient,
  loginClient,
  activateClient,
  logoutClient,
} = require("../controllers/clients.controller");
const adminGuard = require("../middleware/guards/admin.guard");
const roleGuard = require("../middleware/guards/role.guard"); // Role guardni import qilish

const router = require("express").Router();

// Auth routes avval yoziladi
router.post("/login", loginClient);
router.post("/logout", logoutClient);
router.get("/activate/:link", activateClient);

// CRUD routes keyin yoziladi
router.post("/", addNewClient); // Faqat adminlar qo'shishi mumkin
router.get("/", roleGuard(["admin", "client"]), findAllClients); // Admin va clientlarga ko'rish ruxsati
router.get("/:id", roleGuard(["admin", "client"]), findClientById); // Admin va clientlarga ko'rish ruxsati
router.put("/:id", roleGuard(["admin", "client"]), updateClient); // Faqat adminlar yangilashi mumkin
router.delete("/:id", roleGuard(["admin", "client"]), deleteClient); // Faqat adminlar o'chirishi mumkin

module.exports = router;
