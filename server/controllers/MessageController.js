import MessageService from "../services/MessageService.js";

export default class MessageController {
  static async sendMessage(req, res) {
    try {
      const response = await MessageService.sendMessage(req.body);
      return res.send(response);
    } catch (error) {
      return res.send(error);
    }
  }
}
