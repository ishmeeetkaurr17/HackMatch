const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let teams = [
    {
        name: "AI Healthcare",
        skills: "Frontend, UI/UX"
    },
    {
        name: "Smart Campus",
        skills: "Backend, Flutter"
    }
];

app.get("/teams", (req, res) => {
    res.json(teams);
});

app.post("/teams", (req, res) => {

    const { name, leader, skills } = req.body;

    const newTeam = {
        name,
        leader,
        skills
    };

   const alreadyExists = teams.some(
    team =>
    team.name.toLowerCase() ===
    name.toLowerCase()
);

if(alreadyExists){
    return res.json({
        message: "Team already exists"
    });
}

teams.push(newTeam);

    res.json({
        message: "Team created successfully",
        team: newTeam
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});