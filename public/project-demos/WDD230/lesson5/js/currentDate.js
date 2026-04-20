//let lastMod = document.lastModified;
//document.getElementById('currentDate').textContent = lastMod;

//toLocateDateString
const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', options);

function toggleMenu() {
    document.getElementById("primaryNav").classList.toggle("hide");
}

const today = new Date()
console.log(today)

const dayNumber = today.getDay();
console.log(dayNumber)

const element = document.getElementById("message");
if (dayNumber == 5){
    element.classList.add("showme")
}else{
    element.classList.add("hideme")
}
