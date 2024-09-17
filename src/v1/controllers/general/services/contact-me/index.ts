import { Request, Response } from "express";
import * as nodemailer from "nodemailer";
import * as Helpers from "../../../../../helpers/index";
import { ContactMe } from "./contact-me.dto";

export const contactMe = async (req: Request, res: Response) => {
  const fields = ["email", "name", "service", "message"];

  // check data for each field in the body and validate format
  const fieldCheck = Helpers.requiredFields(req.body, fields);
  if (!fieldCheck.success)
    return res.status(400).json({ message: fieldCheck.message });

  // Validate email format
  if (!Helpers.emailRegex.test(req.body.email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  const { email, name, service, message } = req.body as ContactMe;
  try {
    //credentials for email transportation
    const transport = nodemailer.createTransport(Helpers.mailCredentials);

    //sends verification code to clients mail
    const msg = {
      from: `${Helpers.startWithCase(name)} <reventlifyhub@outlook.com>`, // sender address
      to: "edijay17@gmail.com", // list of receivers
      subject: `${Helpers.startWithCase(service)}`, // Subject line
      text: `${Helpers.startWithCase(service)} (${email}). ${message}`, // plain text body
      html: `<h3>${Helpers.startWithCase(service)} (${email})</h3>
        <p>${message}</p>`, //HTML message
    };

    // send mail with defined transport object
    await transport.sendMail(msg);
    return res.status(200).json({
      message: "Email sent successfully...",
      from: String(Helpers.startWithCase(name)),
      to: "Edidiong Obodom",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong..." });
  }
};
