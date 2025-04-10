const { errorHandler } = require("../helpers/error_handler");
const Admins = require("../models/admins.model");
const mailService = require("../services/mail.service");
const { AdminValidation } = require("../validations/admins.validation");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const config = require("config");

const addNewAdmin = async (req, res) => {
  try {
    const { error, value } = AdminValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      is_active,
      is_creator,
    } = value;
    const hashedPassword = bcrypt.hashSync(password, 7);
    const activation_link = uuid.v4();

    const newAdmin = await Admins.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone,
      is_active,
      is_creator,
      activation_link,
    });
    await mailService.sendActivationMail(
      newAdmin.email,
      `${config.get("api_url")}/api/admins/activate/${activation_link}`
    );
    res.status(201).send({
      message:
        "Yangi Admin qo'shildi. Akkuntini Faolashtirish uchun pochtaga oting",
      newAdmin,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const logoutAdmin = async (req, res) => {
  try {
    const { refreshtoken } = req.cookies;
    if (refreshtoken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }
    const admin = await Admins.findOneAndUpdate(
      { refresh_token: refreshtoken },
      { refresh_token: "" },
      { new: true }
    );
    if (!admin) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli  admin topilmadi", admin });
    }
    res.clearCookie("refreshToken");
    res.send({ message: "Admin logged out" });
  } catch (error) {
    errorHandler(error, res);
  }
};
const refreshTokenAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookieda refresh token topilmadi" });
    }

    const decodedRefreshToken = await jwtService.verifyRefreshToken(
      refreshToken
    );
    console.log(decodedRefreshToken);

    const admin = await Admins.findOne({ refresh_token: refreshToken });
    if (!admin) {
      return res
        .status(400)
        .send({ message: "Bunday tokenli foydalanuvchi topilmadi", admin });
    }
    const payload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };
    const tokens = jwtService.generateTokens(payload);
    console.log(tokens);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    res.send({
      message: "Tokenlar Yangilandi",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllAdmins = async (req, res) => {
  try {
    const admins = await Admins.findAll();
    res.status(200).send({ admins });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.findByPk(id);
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.update(req.body, { where: { id } });
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admins.destroy({ where: { id } });
    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //identification
    const admin = await Admins.findOne({ email });
    if (!admin) {
      return res.status(400).send({ message: "Email yoki password noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, admin.password);
    //autentifikatsiya
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki password noto'g'ri" });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
    };
    const tokens = jwtService.generateTokens(payload);
    admin.refresh_token = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });
    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenTime"),
    // });
    res.send({
      message: "Tizimga xush kelibsiz",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const activateAdmin = async (req, res) => {
  try {
    console.log(activation_link);

    const admin = await Admins.findOne({ activation_link: req.params.link });
    if (!admin) {
      return res.status(404).send({ message: "Not Found Admin" });
    }
    (admin.is_active = true), await admin.save();
    res.send({
      message: "Admin foalashtirildi",
      status: admin.is_active,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewAdmin,
  findAllAdmins,
  findAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin,
  activateAdmin,
};
