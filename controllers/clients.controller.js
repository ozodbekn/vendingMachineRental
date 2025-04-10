const { errorHandler } = require("../helpers/error_handler");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("config");
const jwtService = require("../services/jwt.service");
const mailService = require("../services/mail.service");
const { ClientValidation } = require("../validations/clients.validation");
const {
  LoginClientValidation,
} = require("../validations/login.client.validation");
const Clients = require("../models/clients.model");

// ADD NEW CLIENT
const addNewClient = async (req, res) => {
  try {
    const validateClientData = (data) => ClientValidation(data);
    const { error, value } = validateClientData(req.body);

    if (error) return errorHandler(error, res);

    const {
      full_name,
      phone,
      email,
      password,
      confirm_password,
      address,
      passport,
      verify_img,
    } = value;

    if (password !== confirm_password) {
      return res
        .status(400)
        .send({ message: "Parol va tasdiqlovchi parol mos emas" });
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const activation_link = uuid.v4();

    const newClient = await Clients.create({
      full_name,
      phone,
      email,
      password: hashedPassword,
      address,
      passport,
      verify_img,
      activation_link,
      is_active: false,
    });

    await mailService.sendActivationMail(
      newClient.email,
      `${config.get("api_url")}/api/clients/activate/${activation_link}`
    );

    res.status(201).send({
      message:
        "Yangi Client qo'shildi. Akkountni faollashtirish uchun emailingizni tekshiring.",
      newClient,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

// LOGIN CLIENT
const loginClient = async (req, res) => {
  try {
    const { error, value } = LoginClientValidation(req.body); // Validation
    if (error) return errorHandler(error, res);

    const { email, password } = value;

    const client = await Clients.findOne({ where: { email } });
    if (!client)
      return res.status(400).send({ message: "Email yoki parol noto‘g‘ri" });

    const validPassword = await bcrypt.compare(password, client.password);
    if (!validPassword)
      return res.status(400).send({ message: "Email yoki parol noto‘g‘ri" });

    const payload = {
      id: client.id,
      email: client.email,
      role: "client",
    };

    const tokens = jwtService.generateTokens(payload);
    client.refresh_token = tokens.refreshToken;
    await client.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Tizimga xush kelibsiz",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

// LOGOUT CLIENT
const logoutClient = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(400).send({ message: "Refresh token topilmadi" });

    const client = await Clients.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!client)
      return res
        .status(400)
        .send({ message: "Bunday foydalanuvchi topilmadi" });

    client.refresh_token = "";
    await client.save();
    res.clearCookie("refreshToken");
    res.send({ message: "Client tizimdan chiqdi" });
  } catch (error) {
    errorHandler(error, res);
  }
};

// REFRESH TOKEN
const refreshTokenClient = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken)
      return res.status(400).send({ message: "Refresh token topilmadi" });

    const decoded = jwtService.verifyRefreshToken(refreshToken);
    const client = await Clients.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!client) return res.status(400).send({ message: "Client topilmadi" });

    const payload = {
      id: client.id,
      email: client.email,
      role: "client",
    };

    const tokens = jwtService.generateTokens(payload);
    client.refresh_token = tokens.refreshToken;
    await client.save();

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

// AKKOUNTNI AKTIVATSIYA QILISH
const activateClient = async (req, res) => {
  try {
    const client = await Clients.findOne({
      where: { activation_link: req.params.link },
    });

    if (!client) return res.status(404).send({ message: "Client topilmadi" });

    client.is_active = true;
    await client.save();

    res.send({
      message: "Client faollashtirildi",
      status: client.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

// BOSHQA FUNCTIONLAR
const findAllClients = async (req, res) => {
  try {
    const clients = await Clients.findAll();
    res.status(200).send({ clients });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Clients.findByPk(id);
    res.status(200).send({ client });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Clients.update(req.body, { where: { id } });
    res.status(200).send({ message: "Client yangilandi", updated });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Clients.destroy({ where: { id } });
    res.status(200).send({ message: "Client o'chirildi", deleted });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewClient,
  loginClient,
  logoutClient,
  refreshTokenClient,
  activateClient,
  findAllClients,
  findClientById,
  updateClient,
  deleteClient,
};
