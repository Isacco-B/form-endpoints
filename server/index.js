import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import crypto from "crypto";
import { User, initDb } from "./models/user.model.js";
import { Op } from "sequelize";
import { sendFormSubmitEmail } from "./utils/emailTemplates/formSubmitEmail.js";
import { sendConfirmEmail } from "./utils/emailTemplates/confirmEmail.js";
import { validationResult } from "express-validator";
import { fileURLToPath } from "url";
import {
  errorHandler,
  loginLimiter,
  formValidator,
} from "./middleware/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const BASEURL =
  process.env.NODE_ENV === "production"
    ? `${process.env.HOST}`
    : `http://localhost:${PORT}`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

function isJsonRequest(req) {
  return req.accepts("json") && req.headers.accept.includes("application/json");
}

const createHexHash = (email) => {
  return crypto.createHash("sha256").update(email).digest("hex");
};

async function handleHtmlRequest(req, res) {
  const origin = req.headers.origin || req.headers.referer;
  const { email } = req.params;
  const { name, email: userEmail, message, _next, _success, _error } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("error", {
      origin,
      error: "Invalid fields, please check your form and try again!",
    });
  }

  if (!email) {
    return res.render("error", {
      origin,
      error: `Destination email required! Please add your destination to your form <form action="${BASEURL}/your@email.com" method="POST" />`,
    });
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { hash: email }],
      },
    });

    if (!existingUser || !existingUser.verified) {
      const hash = createHexHash(email);

      if (!existingUser) {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmail) {
          return res.render("error", {
            origin,
            error: `Invalid destination email! Please add your destination to your form <form action="${BASEURL}/your@email.com" method="POST" />`,
          });
        }
        await User.create({ email, hash });
      }

      const userHash = existingUser ? existingUser.hash : hash;
      const confirmLink = `${BASEURL}/confirm/${userHash}/${encodeURIComponent(
        origin
      )}`;
      await sendConfirmEmail(email, confirmLink, userHash, origin);

      return res.render("success", {
        origin,
        title: "Check Your Email",
        message:
          "This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be activated!",
      });
    }

    const recipientEmail = existingUser.email;
    await sendFormSubmitEmail(recipientEmail, name, userEmail, message, origin);

    if (_next) {
      return res.redirect(_next);
    }
    return res.render("success", {
      origin,
      title: "Thanks!",
      message:
        _success ||
        "Thank you for getting in touch!, We will get back in touch with you soon!Have a great day!",
    });
  } catch (error) {
    return res.render("error", {
      origin,
      error:
        _error ||
        "We're sorry but something went wrong, please try again later, thanks.",
    });
  }
}

async function handleJsonRequest(req, res, next) {
  const origin = req.headers.origin || req.headers.referer;
  const { email } = req.params;
  const { name, email: userEmail, message, _success, _error } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      errorHandler(400, "Invalid fields, please check your form and try again!")
    );
  }

  if (!email) {
    return next(
      errorHandler(
        400,
        `Destination email required! Please add your destination to your form <form action="${BASEURL}/your@email.com" method="POST" />`
      )
    );
  }

  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { hash: email }],
      },
    });

    if (!existingUser || !existingUser.verified) {
      const hash = createHexHash(email);

      if (!existingUser) {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmail) {
          return next(
            errorHandler(
              400,
              `Invalid destination email! Please add your destination to your form <form action="${BASEURL}/your@email.com" method="POST" />`
            )
          );
        }
        await User.create({ email, hash });
      }

      const userHash = existingUser ? existingUser.hash : hash;
      const confirmLink = `${BASEURL}/confirm/${userHash}/${encodeURIComponent(
        origin
      )}`;
      await sendConfirmEmail(email, confirmLink, userHash, origin);

      return res.json({
        message:
          "This form needs Activation. We've sent you an email containing an 'Activate Form' link. Just click it and your form will be activated!",
      });
    }

    const recipientEmail = existingUser.email;
    await sendFormSubmitEmail(recipientEmail, name, userEmail, message, origin);

    return res.json({
      message:
        _success ||
        "Thank you for getting in touch!, We will get back in touch with you soon!Have a great day!",
    });
  } catch (error) {
    return next(
      errorHandler(
        500,
        _error ||
          "We're sorry but something went wrong, please try again later, thanks."
      )
    );
  }
}

async function newHtmlVerification(req, res, hash, origin) {
  try {
    const user = await User.findOne({ where: { hash } });

    if (!user) {
      return res.render("error", {
        origin,
        error: "User not found, make sure you're using the correct link.",
      });
    }

    if (!user.verified) {
      user.verified = true;
      await user.save();

      return res.render("success", {
        origin,
        title: "Form Activated!",
        message:
          "Woohoo! This form is now active. The next time someone submits your form, we'll forward it to your email.",
      });
    }

    return res.render("success", {
      origin,
      title: "Form Already Activated!",
      message:
        "Woohoo! This form is already active. The next time someone submits your form, we'll forward it to your email.",
    });
  } catch (error) {
    return res.render("error", {
      origin,
      error:
        "We're sorry but something went wrong, please try again later, thanks.",
    });
  }
}

async function newJsonVerification(req, res, next, hash) {
  try {
    const user = await User.findOne({ where: { hash } });

    if (!user) {
      return next(
        errorHandler(
          404,
          "User not found, make sure you're using the correct link."
        )
      );
    }

    if (!user.verified) {
      user.verified = true;
      await user.save();

      return res.json({
        message:
          "Woohoo! This form is now active. The next time someone submits your form, we'll forward it to your email.",
      });
    }

    return res.json({
      message:
        "Woohoo! This form is already active. The next time someone submits your form, we'll forward it to your email.",
    });
  } catch (error) {
    return next(
      errorHandler(
        500,
        "We're sorry but something went wrong, please try again later, thanks."
      )
    );
  }
}

app.post("/:email", loginLimiter, formValidator, (req, res, next) => {
  if (isJsonRequest(req)) {
    return handleJsonRequest(req, res, next);
  } else {
    return handleHtmlRequest(req, res, next);
  }
});
app.get("/confirm/:link/:origin", (req, res, next) => {
  const { link, origin } = req.params;
  const newOrigin = decodeURIComponent(origin);
  if (isJsonRequest(req)) {
    return newJsonVerification(req, res, next, link);
  } else {
    return newHtmlVerification(req, res, link, newOrigin);
  }
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res
    .status(statusCode)
    .json({ success: false, statusCode, message, isError: true });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on ${BASEURL}`);
  });
});
