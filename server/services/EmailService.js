import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export default class Email {
  constructor(build) {
    this.sender = build.sender;
    this.receiver = build.receiver;
    this.response = build.response;
    this.subject = build.subject;
  }

  static get Builder() {
    class Builder {
      constructor(sender) {
        this.sender = sender;
      }

      setReceiver(receiver) {
        this.receiver = receiver;
        return this;
      }

      setHTML(html) {
        this.html = html;
        return this;
      }

      setSubject(subject) {
        this.subject = subject;
        return this;
      }

      async createMailOptions(from, to, subject, html) {
        return {
          from,
          to,
          subject,
          html,
        };
      }

      setResponse(data) {
        this.response = data;
      }

      async build() {
        if (!this.sender) {
          this.sender = process.env.FALLBACKMAIL;
        }

        if (!this.receiver) {
          this.receiver = process.env.FALLBACKMAIL;
        }

        if (!this.html) {
          this.html = process.env.FALLBACKMSG;
        }

        const mailOptions = await this.createMailOptions(
          this.sender,
          this.receiver,
          this.subject,
          this.html
        );

        const transporter = await nodemailer.createTransport({
          service: process.env.MAIL_SERVICE,
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          },
        });

        const info = await transporter.sendMail(mailOptions);
        await this.setResponse(info);

        return new Email(this);
      }
    }
    return Builder;
  }
}
