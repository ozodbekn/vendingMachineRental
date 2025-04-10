const { errorHandler } = require("../helpers/error_handler");
const Owners = require("../models/owners.model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { OwnerValidation } = require("../validations/owners.validation");
const config = require("config");
const mailService = require("../services/mail.service");
const jwtService = require("../services/jwt.service");

// ADD NEW OWNER
const addNewOwner = async (req, res) => {
  try {
    const { error, value } = OwnerValidation(req.body);
    if (error) return errorHandler(error, res);

    const { first_name, last_name, email, password, phone, company_name } =
      value;

    const hashedPassword = await bcrypt.hash(password, 7);
    const activation_link = uuid.v4();

    const newOwner = await Owners.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
      company_name,
      activation_link,
      is_active: false,
    });

    await mailService.sendActivationMail(
      newOwner.email,
      `${config.get("api_url")}/api/owners/activate/${activation_link}`
    );

    res.status(201).send({
      message:
        "Yangi Owner qo'shildi. Faollashtirish uchun pochtani tekshiring",
      newOwner,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

// FIND ALL OWNERS
const findAllOwners = async (req, res) => {
  try {
    const owners = await Owners.findAll();
    res.status(200).send({ owners });
  } catch (error) {
    errorHandler(error, res);
  }
};

// FIND OWNER BY ID
const findOwnerById = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owners.findByPk(id);
    res.status(200).send({ owner });
  } catch (error) {
    errorHandler(error, res);
  }
};

// UPDATE OWNER
const updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Owners.update(req.body, { where: { id } });
    res.status(200).send({ message: "Owner updated", updated });
  } catch (error) {
    errorHandler(error, res);
  }
};

// DELETE OWNER
const deleteOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Owners.destroy({ where: { id } });
    res.status(200).send({ message: "Owner deleted", deleted });
  } catch (error) {
    errorHandler(error, res);
  }
};

// ACTIVATE OWNER
const activateOwner = async (req, res) => {
  try {
    const owner = await Owners.findOne({
      where: { activation_link: req.params.link },
    });
    if (!owner) {
      return res.status(404).send({ message: "Owner topilmadi" });
    }

    owner.is_active = true;
    await owner.save();

    res.send({
      message: "Owner faollashtirildi",
      status: owner.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

// LOGIN OWNER
const loginOwner = async (req, res) => {
  try {
    const { error, value } = LoginOwnerValidation(req.body);
    if (error) return errorHandler(error, res);

    const { email, password } = value;
    const owner = await Owners.findOne({ where: { email } });
    if (!owner)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });

    const payload = { id: owner.id, role: "owner", email: owner.email };
    const tokens = jwtService.generateTokens(payload);

    owner.refresh_token = tokens.refreshToken;
    await owner.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Owner tizimga kirdi",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

// LOGOUT OWNER
const logoutOwner = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(400).send({ message: "Token topilmadi" });

    const owner = await Owners.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!owner) return res.status(400).send({ message: "Owner topilmadi" });

    owner.refresh_token = "";
    await owner.save();
    res.clearCookie("refreshToken");
    res.send({ message: "Owner tizimdan chiqdi" });
  } catch (error) {
    errorHandler(error, res);
  }
};

// REFRESH TOKEN
const refreshTokenOwner = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(400).send({ message: "Token topilmadi" });

    const decoded = jwtService.verifyRefreshToken(refreshToken);
    const owner = await Owners.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!owner) return res.status(400).send({ message: "Owner topilmadi" });

    const payload = { id: owner.id, role: "owner", email: owner.email };
    const tokens = jwtService.generateTokens(payload);

    owner.refresh_token = tokens.refreshToken;
    await owner.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Tokenlar yangilandi",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewOwner,
  findAllOwners,
  findOwnerById,
  updateOwner,
  deleteOwner,
  activateOwner,
  loginOwner,
  logoutOwner,
  refreshTokenOwner,
};
