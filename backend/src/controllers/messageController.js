const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, listingId, content } = req.body;
    
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user.id, receiverId] },
      listing: listingId
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user.id, receiverId],
        listing: listingId
      });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: req.user.id,
      receiver: receiverId,
      content
    });

    conversation.lastMessage = message._id;
    conversation.lastMessageAt = Date.now();
    await conversation.save();

    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id
    })
    .populate('participants', 'name profilePicture')
    .populate('listing', 'title images')
    .populate('lastMessage')
    .sort({ lastMessageAt: -1 });

    res.json({ success: true, conversations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversation: req.params.conversationId
    }).sort({ createdAt: 1 });

    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
