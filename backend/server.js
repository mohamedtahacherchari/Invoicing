require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
//const fileUpload = require('express-fileupload')
const chatRoutes = require("./routes/Chat/chatRoutes");
const messageRoutes = require("./routes/Chat/messageRoutes");
const clientfRoutes = require("./routes/zervant/clientfRoutes");
const productRoutes = require("./routes/zervant/productRoutes");
const factureRoutes = require("./routes/zervant/factureRoutes");
const devisRoutes = require("./routes/zervant/devisRoutes");
const candidatRoutes = require("./routes/Candidat/candidatRoutes");
const  path = require('path')
//const upload = require('./routes/zervant/upload');




const colors = require('colors')
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000;
  
const app = express()
app.use(express.json({limit: '10mb'}))
app.use(express.urlencoded({ extended: false }))

//app.use(cors({}))
app.use(cors());

app.use(cookieParser())
//app.use(fileUpload({
  //  useTempFiles: true
//}))

//routes
app.use('/user', require('./routes/userRoutes'))
//app.use('/api/upload', uploadRoutes)
// Le préfixe '/api' peut être modifié selon vos besoins
//app.use('/api/softskills', require('./routes/Candidat/softskillsRoutes'))
//app.use('/api/hardskills', require('./routes/Candidat/hardskillsRoutes'))
app.use('/api/candidat', require('./routes/Candidat/candidatRoutes'))
{/*app.use('/api/client', require('./routes/clientRoutes'))
*/}
//app.use('/api/recrutement', require('./routes/Candidat/recrutementRoutes'))
//app.use('/api/processrecrutement', require('./routes/Candidat/processRoutes'))
{/*app.use('/api/recrutementstep', require('./routes/recrutementstepRoutes'))
*/}//app.use('/api/permission', require('./routes/permissionRoutes'))
//app.use('/api/role', require('./routes/roleRoutes'))
//app.use('/api/businessunit', require('./routes/businessunitRoutes'))
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/clientf", clientfRoutes);
app.use("/api/product", productRoutes);
app.use("/api/facture", factureRoutes);
app.use("/api/devis", devisRoutes);
//app.use('/api/upload', upload); 
//app.use("/api/upload", uploadRoutes)
//const __dirname = path.resolve()
//app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(errorHandler)
connectDB();
//Serve Static assets if in production 
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('frontend/build'));
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend', 'build','index.html'))
  })
}
server =app.listen(port, () => console.log(`Server started on port ${port}`));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    }, 
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });     
    });  
   socket.off("setup", () => {
      console.log("USER DISCONNECTED");  
     socket.leave(userData._id);
    });

  });