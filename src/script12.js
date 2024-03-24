var menuIcon=document.querySelector(".menu-icon");
var sidebar=document.querySelector(".sidebar");
var container=document.querySelector(".container");

menuIcon.onclick=function(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}



const result = await collection1.create(data);


app.post("/login", async (req, res) => {
    try {
        console.log("Login Request Body:", req.body);
        const check = await Collection1.findOne({ name: req.body.name });

        if (check) {
            console.log("User Found:", check);

            if (check.password === req.body.password) {
                console.log("Password Matched");

                // Check userType and redirect accordingly
                if (check.userType === 'student') {
                    return res.render("home");
                } else if (check.userType === 'faculty') {
                    return res.render("homef");
                }
            } else {
                console.log("Wrong Password");
                return res.send("Wrong password");
            }
        } else {
            console.log("User Not Found");
            return res.send("User not found");
        }
    } catch (error) {
        console.log("Error:", error);
        return res.send("Error: " + error.message);
    }
});

const mongoose = require("mongoose");

const LogInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['student', 'faculty'], // Enumerated values for userType
        required: true
    }
});

const collection1 = mongoose.model("Collection1", LogInSchema);

module.exports = collection1;

// mongodb.js

const mongoose = require('mongoose');

const VideoHistorySchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection1',
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video', // Assuming you have a Video model for videos
    required: true,
  },
  durationWatched: {
    type: Number,
    required: true,
  },
});

const VideoHistory = mongoose.model('VideoHistory', VideoHistorySchema);

module.exports = {
  Collection1: require('./Collection1'), // Your existing Collection1 model
  VideoHistory,
};

// Modify the route for watching a video in index.js

app.post('/watch-video', async (req, res) => {
    try {
      const { studentId, videoId, durationWatched } = req.body;
  
      // Save video watching history
      await VideoHistory.create({
        studentId,
        videoId,
        durationWatched,
      });
  
      return res.send('Video watching history recorded successfully.');
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).send('Internal Server Error');
    }
  });