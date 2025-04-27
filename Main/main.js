const express = require("express");
const app  = express();
const adminRouter = require("../routes/admin");
const userRouter = require("../routes/user");
const parser = require("body-parser");
const port =3000;

app.use(parser.json());
app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
});

