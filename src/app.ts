// Load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// routes
// import authRoute_v1 from "./v1/routes/auth-routes";
import generalRoute_v1 from "./v1/routes/general-routes";
// import usersRoute_v1 from "./v1/routes/user-routes";

// Other imports
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const port = process.env.PORT ?? 5000;
const app = express();
// Set the trust proxy setting
// app.set("trust proxy", true);
const whitelist =
  process.env.NODE_ENV !== "production"
    ? "*"
    : [
        "https://admin.socket.io",
        String(process.env.URL),
        "https://api.paystack.co",
        "https://paystack.com",
      ];

const corsOptions = {
  optionsSuccessStatus: 200,
  credentials: true,
  origin: whitelist,
};

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    message:
      "Too many login attempts from this IP, please try again after 15 minutes.",
  },
  headers: true, // Send rate limit info in the `RateLimit-*` headers
});

//middlewares// Conditional middleware for HSTS based on environment
if (process.env.NODE_ENV === "production") {
  app.use(
    helmet.hsts({
      maxAge: 31536000, // 1 year in seconds
      includeSubDomains: true,
      preload: true,
    })
  );
} else {
  console.log("HSTS is disabled in development");
}

// Other helmet configurations
app.use(
  helmet({
    frameguard: false, // APIs typically don't need this
    contentSecurityPolicy: false, // Disable CSP if not needed
    ieNoOpen: true, // Helps to prevent downloads from opening automatically
    noSniff: true, // Prevent MIME-type sniffing
    referrerPolicy: { policy: "no-referrer" }, // Control referrer information
    xssFilter: true, // Add XSS protections
  })
);
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cors(corsOptions));

//ROUTES
// app.use("/v1/auth", authRoute_v1);
app.use("/v1", generalRoute_v1);
// app.use("/v1/user", usersRoute_v1);

// Crons
// import "./cron-jobs";

app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
