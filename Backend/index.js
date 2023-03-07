const express=require("express");
require("dotenv").config();
const {connection}=require("./config/db");
const {authenticate} =require("./middleware/authenticate.middleware")
const {productRoute}=require("./routes/Product.Route");
const {userRouter}=require("./routes/User.Route");
const {cartRoute}=require("./routes/Cart.Route");
const {wishlistRoute}=require("./routes/Wishlist.Route")
const cors=require("cors");
const app=express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
    res.send("Home Page");
  });

app.use("/users", userRouter);
app.use("/admin", adminRoute)
app.get("/usersdata", async (req, res) => {
    try {
        let users = await userModel.find()
        res.send(users)
    } catch (err) {
        res.send({ "msg": "Users not found" })
    }
})
app.use(authenticate)
app.use("/products",productRoute);
app.use("/carts",cartRoute);
app.use("/wishlists",wishlistRoute)



app.listen(process.env.port,async()=>{
    try {       
        await connection
        console.log("Connected yo DB!!");
    } catch (error) {
        console.log(error.message);
    }
   console.log(`sever running at port ${process.env.port}`)
})
