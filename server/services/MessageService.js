import EmailService from "./EmailService.js";
import dotenv from "dotenv";

dotenv.config();

export default class MessageService {
  static async sendMessage(data) {
    try {
      const { name, msg, email, phone } = data;
      new EmailService.Builder(process.env.MAIL_USERNAME)
        .setReceiver(email)
        .setHTML(
          `
        <div>
        <h2>From: ${name}</h2>
        <div>${msg}</div>
        <span>Contacts: ${phone}</span>
        </div>
        `
        )
        .setSubject("Internal Message")
        .build();
    } catch (error) {
      return error;
    }
  }
}
