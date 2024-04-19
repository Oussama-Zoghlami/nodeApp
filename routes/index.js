import express from "express";
import Auth from "./auth.js"
import  { Verify, VerifyRole }  from "../middleware/verify.js";
import uploadRouter from "../middleware/upload.js"
import {addSalle,allSalles,deleteSalles, findSalleById} from "../controllers/salleControlller.js";
import { bookSalle } from "../controllers/booking.js";



const app = express();


app.disable("x-powered-by")
app.use('/src/auth', Auth);


app.get("/src/user",Verify , (req, res) => {
    const user = req.user;
    const { role } = user;
    if(role !== "0x88"){
        res.render("user_interface");
    } else {
        res.redirect("/admin");
    }

});

app.get("/admin/form", Verify,VerifyRole, (req, res) => {
    res.render("form");
});

app.get("/admin", Verify, VerifyRole, (req, res) => {
    res.render("dashboard")
});

app.get("/signup" ,(req,res)=>{
    res.render("signup");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.get("/",(req,res)=>{
    res.redirect("/login");
})
app.use(uploadRouter);

app.post("/salles", addSalle);

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
};


app.get("/allsalles",allSalles);
app.delete("/delete/:id",deleteSalles);
app.get("/salles/:id",findSalleById);

app.post("/book",bookSalle);

export default app;