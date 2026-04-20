//let lastMod = document.lastModified;
//document.getElementById('currentDate').textContent = lastMod;

//toLocateDateString
const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', options);

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide")
}