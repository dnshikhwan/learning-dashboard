import Nodemailer from "nodemailer";
import { configs, emailConfig } from "../configs";
import { MailtrapTransport } from "mailtrap";
import { logger } from "./log.helper";
import { IUser } from "../interfaces/user.interface";

const TOKEN = configs.MAILTRAP_TOKEN;

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3283027,
  })
);

export const sendMail = async (user: IUser, subject: string, data: any) => {
  try {
    await transport.sendMail({
      from: emailConfig.sender,
      to: user.email,
      subject: subject,
      text: data,
      sandbox: true,
    });

    logger.info("Email sent to user");
  } catch (err) {
    logger.error("Error sending email: ", err);
  }
};
