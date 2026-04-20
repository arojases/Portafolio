const tempNum = parseFloat(document.getElementById("temp").textContent);

const speedNum = parseFloat(document.getElementById("speed").textContent);

let windChill = 35.74 + (0.6215 * tempNum) - (35.75 * Math.pow(speedNum, 0.16)) + (0.4275 * tempNum * Math.pow(speedNum, 0.16));
windChill = Math.round(windChill);

if (tempNum <= 50 && speedNum > 3) {
    document.getElementById("chill").textContent = windChill + "\xB0F";
} else {
    document.getElementById("chill").textContent = "No Wind Chill today";
}