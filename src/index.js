const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const Collection1 = require("./mongodb");
const collection1 = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, "public"))); 
// Assuming your script.js is in a "public" folder

// Define a route for rendering the home.hbs file



app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/login", async (req, res) => {
    
    const { name, password, userType } = req.body;

    if (!name || !password || !userType) {
        return res.send("Invalid signup data");
    }

    const data = {
        name,
        password,
        userType
    };

    await Collection1.insertMany([data]);

    // Redirect based on userType
    if (userType === 'student') {
        return res.render("home");
    } else if (userType === 'faculty') {
        return res.render("homef");
    } else {
        return res.send("Invalid userType");
    }


    try{
        const check=await collection1.findOne({name:req.body.name})

        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong pasword")
        }

    }
    catch{
        res.send("wrong details")

    }



    
});









app.post("/signup", async (req, res) => {
    const { name, password, userType } = req.body;

    if (!name || !password || !userType) {
        return res.send("Invalid signup data");
    }

    const data = {
        name,
        password,
        userType
    };

    await Collection1.insertMany([data]);

    // Redirect based on userType
    if (userType === 'student') {
        return res.render("home");
    } else if (userType === 'faculty') {
        return res.render("homef");
    } else {
        return res.send("Invalid userType");
    }
});




// index.js

// ... (other imports)



// ... (other route handling code)



const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
