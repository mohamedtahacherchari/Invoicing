const asyncHandler = require("express-async-handler");
const Message = require("../../models/Chat/messageModel");
const Users = require("../../models/userModel");
const Chat = require("../../models/Chat/chatModel");

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({chat: req.params.chatId})
    .populate("sender firstName avatar email")
    .populate("chat");
    res.json(messages);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}); 

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  var newMessage = {
    sender: req.user.id,
    content: content,
    chat: chatId,
  };

  try {
   // let message =message.deliveredAt= Date.now()

    var message = await Message.create(newMessage);
    message.deliveredAt= Date()

    message = await message.populate("sender","firstName avatar").execPopulate();
    message = await message.populate("chat").execPopulate();
    //execPopulate vesion 9dima fil mongoose
    message = await Users.populate(message, {
      path: "chat.users",
      select: "firstName avatar email",
    });
    message= await message.save()
    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    
   // res.status(200).json(Date.now)
   res.status(200).json(message)


    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };