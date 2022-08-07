const ConversationModel = require("../model/Conversation.model");

exports.convo = async (req, res) => {
  const { authorId, receiverId } = req.body;
  try {
    const newConversation = new ConversationModel({
      members: [authorId, receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getConvo = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversations = await ConversationModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
