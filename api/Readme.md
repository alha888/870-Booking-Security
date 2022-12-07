file structure:
(Root)870Booking
     |-api
        |-controller
          auth.js
            register
            login
          hotel.js
            countByCity,
            countByType,
            createHotel,
            deleteHotel,
            getHotel,
            getHotelRooms,
            getHotels,
            updateHotel,
          room.js
            createRoom,
            deleteRoom,
            getRoom,
            getRooms,
            updateRoom,
            updateRoomAvailability,
          user.js
            updateUser,
            deleteUser,
            getUser,
            getUsers,
        |-models
          Hotels.js
          Rooms.js
          User.js
        |-node_modules
        |-routes
          hotels.js
            hotelsRouter
          rooms.js
            roomsRouter
          auth.js
            authRouter
          users.js
            usersRouter
        |-utils
          error.js
          verifyToken.js 
            verifyAdmin
        .env
        index.js
        package.json
        Readme.md


> npm init -y
> yarn add express //install express package

In package.json, "type":"module" then we can use const app = express();
In package.json, "scripts": 修改 "start": "node index.js"

> yarn add nodemon //install nodemon package
In package.json file, Then we can use "start": "nodemon index.js". By using nodemon, changes reflect immediately

Initialize the Database:

Create a MongoDB account and use the free version
create the free version admin account, setup the IP address allowed as 0.0.0.0;
Connect to this database cluster;
修改 MongoDB URL with password and DB name parts;
To protect the secret of DBURL, save the connection string (MongoDB URL) into .ENV file;

To reach that data:
> yarn add dotenv
import dotenv from "dotenv";
detenv.config();

Instead of using MongoDB JS library directly, we can use Mongoose. We can create Connection Schema with Mongoose.http://mongoosejs.com
> yarn add mongoose
import mongoose from "mongoose";
......
//建立数据库链接
//为了避免程序崩溃，使用async()定义一个connect()函数，每次访问服务器可以调用这个connect()

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

//我们可以用类似下边的语句：数据库事件触发器
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

为了不把所有模块都写在index.js里，在api/routes中可以定义多个模块，每个都引入express.router()
create auth.js:
  const router = express.Router();
    router.post
  export default router //把router作为该模块的返回对象
index.js:
  import authRoute from "./routes/auth.js";
  app.use("/api/auth", authRoute);  
  //创建 middleware <= app.use(),所有对auth有关的操作都托付给authRoute这个中间件调用auth.js里边的代码执行。

Do the same thing for:
  hotels
  rooms
  users

本系统采用MVC设计模式，Model - View - Controller

1. 各个Routers调用Controllers里的函数（方法）完成具体操作
2. Models负责数据库创建

以Models > Hotels.js这个model为例，使用mongoose.schema()创建数据库表，最后export default("Hotel", mongoose.schema)导出该表。
在routes > hotels.js里，import Hotel from "../models/Hotel.js"; 进一步调用controllers > hotels.js里的createHotel函数，利用已经定义好的Hotel schema,创建新的数据库信息。
在controllers > hotels.js里，import Hotel/Room 作为schema模板，使用Hotel(req.body)完成创建。其他函数类似。


在index.js中，最后位置的Middleware可以用来接收err处理代码。Router的Catch里插入next(err)统一转入。例如：

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

41:00: 
//Create utils dir and under it the file error.js
export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

46:00
In this part, import packages:
  bcryptjs
  jsonwebtoken

> yarn add bcryptjs 

Create users and authentication rules:
(routes/auth.js ——> controllers/auth.js ——> models/User.js)

//In models/User.js, define data schema
//In controllers/auth.js, import User from "../models/User.js, and create user with function Register:
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

Next, the Login function:
52:18

> yarn add jsonwebtoken  //在controllers/auth.js中引入该包
> yarn add cookie-parser //在index.js中import该包，并在middleware部分用app.use声明

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    //JWT常量用 > openssl rand -base64 32命令生成，并保存在.env文件中
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    //把user._doc的内容解析为左边三部分，只希望显示除了password和isAdmin的其余部分
    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

In the login function, import the library jsonwebtoken
import jwt from jsonwebtoken;
Jwt的作用是判断用户是否为Admin，并返回一个token，然后打包成cookie;
这一操作是为了隐藏user的信息，用cookie的方式返回信息

1:00:40 
routes/users.js ——> controllers/user.js

How to identify JWT:utils/verifyToken.js
函数verifyToken:
jwt.sign({id:user._id,isAdmin:user.isAdmin}, process.env.JWT)
jwt.verify(token,process.env.JWT, (err.user))
函数verifyUser:
1:08:00

controllers/room.js
函数createroom:  
  newRoom = new Room(req.body)
  newRoom.Save()
  await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: savedRoom._id },})
这里的函数是Mongoose提供的。

=====================================================================
Let's create the React APP

(Root)870Booking
     |-api
     |-client
        |-public
        |-src
          |-component
            |-featured
              Featured.jsx
              featured.css
            |-propertyList
              PropertyList.jsx
              propertyList.css  
            |-featuredProperties
              FeaturedProperties.jsx
              featuredProperties.css
            |-navbar
              Navbar.jsx
              navbar.css
            |-searchItem
              SearchItem.jsx
              searchItem.css
          |-pages  
            |-List
              List.jsx
              list.css  
          |-hooks
            useFetch.js
          |-context
            AuthContext.js
            SearchContext.js    
        .gitignore
        package.json


client (folder):

client/src/components/featured
featured.jsx,featured.css 配合api/controllers/hotels.js中的countByCity(),countByType()函数

在client 
> yarn add axios
> yarn add react
> yarn add cors 

创建client/src/hooks/useFetch.js
import {useState} from "React";
完成client/src/components下边的各个功能模块，见树状图
  主要思路就是调用useFetch.js,载入对应url，对主页的不同区域进行data loading
  这里用到了useState方法，定义一对对象，如[data, setData],当调用setData时会自动修改data的值，并同时引发也面对引用的data进行渲染。
  useEffect()函数的作用是根据条件变化时，完成逻辑执行（往往把setData()放在useEffect()里）。
  每个区域都有一个.css样式表文件

完成client/src/pages 下的各个“页面” 
//第一个页面是返回的搜索结果的list ——>
List/List.js:
  	react <—— useState,useEffect,
  	react-router-dom <—— useLocation,useNavigate,Link
	  react-data-range <—— Data Range
	  data-fns <—— format

> yarn create react-app my-app //创建react app框架(Skelton)

Back-end:
1. models>user.js:修改user schema，加入secret字段，保存用来生成token的信息；
2. Auth.js ——> Register
3. index.js, import session;

Front-end:
1. authContext.js
2. Pages>register>Register.jsx，credential里加入secret字段

,"proxy":"http://localhost:8800/api"

>yarn add nodemailer nodemailer-smtp-transport

路有Router关系：
    index.js：mailRoute (/api/mail)
——> routes>mail.js:sendMail(/api/mail/sendMail)
——> controllers>mail.js: sendMail()