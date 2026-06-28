const loginBtn = document.getElementById("loginBtn");

if(loginBtn){

    loginBtn.addEventListener("click", () => {

        window.location.href = "dashboard.html";

    });

}

const connectButtons = document.querySelectorAll(".connect-btn");
const joinButtons = document.querySelectorAll(".join-btn");
const exploreBtn = document.getElementById("exploreBtn");

// Connect button functionality

connectButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.textContent = "✓ Request Sent";
        button.style.backgroundColor = "#16a34a";
        button.disabled = true;

    });

});

// Join Team button functionality

joinButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.textContent = "✓ Applied";
        button.style.backgroundColor = "#16a34a";
        button.disabled = true;

    });

});

// Explore students button

exploreBtn.addEventListener("click", () => {

    document
        .getElementById("students")
        .scrollIntoView({
            behavior: "smooth"
        });

});

const searchInput = document.getElementById("searchInput");
const studentCards = document.querySelectorAll(".student-card");

searchInput.addEventListener("keyup", () => {

    const searchValue =
        searchInput.value.toLowerCase();

    studentCards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if(text.includes(searchValue)){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }

    });

});



const createBtn = document.getElementById("createTeamBtn");

if(createBtn){

    createBtn.addEventListener("click", async () => {

        const teamName =
        document.getElementById("teamName").value;
        const teamLeader =
document.getElementById("teamLeader").value;
        const teamSkills =
        document.getElementById("teamSkills").value;

        if(teamName === "" || teamSkills === ""){
            alert("Fill all fields");
            return;
        }

        const response = await fetch(
            "http://localhost:3000/teams",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
              body:JSON.stringify({
    name:teamName,
    leader:teamLeader,
    skills:teamSkills
})
            }
        );

        const data = await response.json();

        document.getElementById("teamMessage")
        .innerText = data.message;
        loadTeams();

    });

}

async function loadTeams(){

    const response =
    await fetch("https://hackmatch-albb.onrender.com/teams");

    const teams =
    await response.json();

    const teamContainer =
    document.getElementById("teamContainer");

    if(!teamContainer) return;

    teamContainer.innerHTML = "";

    teams.forEach(team => {

       teamContainer.innerHTML += `
    <div class="team-card">

        <h3>${team.name}</h3>

        <p>
            <strong>Skills Needed:</strong>
            ${team.skills}
        </p>

        <p class="member-count">
            Members: 2/4
        </p>

        <button class="join-btn">
            Join Team
        </button>

    </div>
`;

    });
    document.querySelectorAll(".join-btn").forEach(button => {

    button.addEventListener("click", () => {

        const memberText =
        button.parentElement.querySelector(".member-count");

        memberText.innerText = "Members: 3/4";

        button.innerText = "✓ Joined";
        button.style.backgroundColor = "#16a34a";
        button.disabled = true;

    });

});

}

loadTeams();
const createProfileBtn =
document.getElementById("createProfileBtn");

if(createProfileBtn){

    createProfileBtn.addEventListener("click", () => {

        const name =
        document.getElementById("studentName").value;

        const skills =
        document.getElementById("studentSkills").value;

        const lookingFor =
        document.getElementById("studentLookingFor").value;

        if(
            name === "" ||
            skills === "" ||
            lookingFor === ""
        ){
            alert("Fill all fields");
            return;
        }

        const studentContainer =
        document.querySelector(".student-container");

        const matchScore =
Math.floor(Math.random() * 21) + 80;

studentContainer.innerHTML += `
    <div class="student-card">

        <h3>${team.name}</h3>
        <p>
    <strong>Leader:</strong>
    ${team.leader || "Unknown"}
</p>

        <p>
            <strong>Skills:</strong>
            ${skills}
        </p>

        <p>
            <strong>Looking For:</strong>
            ${lookingFor}
        </p>

        <p class="match-score">
            ${matchScore}% Match
        </p>

        <button class="connect-btn">
            Connect
        </button>

    </div>
`;

       document.getElementById("profileMessage")
.innerText = "Profile created successfully";

setTimeout(() => {
    document.getElementById("profileMessage").innerText = "";
}, 2000);

document.getElementById("studentName").value = "";
document.getElementById("studentSkills").value = "";
document.getElementById("studentLookingFor").value = "";
    });

}