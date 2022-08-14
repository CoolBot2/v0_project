const MessageModel = require("../model/Message.model");

exports.sendMsg = async (req, res) => {
  const { content, date, author, pfp, conversationId } = req.body;
  try {
    const newMessage = new MessageModel({
      conversationId,
      content,
      author,
      date:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),

      pfp,
    });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.showMsg = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.deleteMsg = async (req, res) => {
  const { messageId } = req.params;
  try {
    await MessageModel.findByIdAndDelete(messageId);
    res.status(200).json({ msg: "message deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
