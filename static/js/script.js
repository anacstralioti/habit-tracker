/* GET THE DATE */
let date = new Date();
console.log(date);

/* EXTRACT THE CURRENT DATE INFO */
let currentMonth = date.getMonth();
let currentDay = date.getDay();
let currentDate = date.getDate();
let currentYear = date.getFullYear();

console.log("The current month is " + currentMonth);
console.log("The current day is " + currentDay);
console.log("The current date is " + currentDate);
console.log("The current year is " + currentYear);

/* IMPORTANT DATE INFO */
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

/* SET THE CORRECT MONTH */
let title = document.getElementById("title");
title.innerHTML = months[currentMonth];

/* UPDATE THE CALENDAR INFO */ 
let habitTitle = document.getElementById("habitTitle");

habitTitle.onclick = function() {

    let habits = prompt("Whats your habit?", habitTitle.innerHTML);
    if(habits.length == 0){
        habitTitle.innerHTML = "Click to set your habit";
    }else{
        habitTitle.innerHTML = habits;
    }

}

/* SET THE TOTAL DAYS */
let daysInTheMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let daysInThisMonth = daysInTheMonthList[currentMonth];

let daysCompleted = 0;
let totalDays = document.getElementById("totalDays");
totalDays.innerHTML = "0/" + daysInThisMonth;

/* SETUP THE CALENDAR DAYS */
let dayCount = 0;
let rowCount = 0;
let days = document.getElementsByClassName("days");

for(let i=0;i<days.length;i++){
    
    let day = days[rowCount].getElementsByClassName("day");
    
    for(let j=0;j<day.length;j++){
        
        if(dayCount == currentDate - 1){
            day[j].setAttribute("style", "color: rgb(234, 1, 144);")
            day[j].setAttribute("style", "border: 2px solid black");
        }

        if(dayCount < daysInThisMonth){
            day[j].innerHTML = dayCount + 1;
            day[j].setAttribute("id", "day" + (dayCount + 1));
            dayCount++;
        }else{
            day[j].innerHTML = "";
            day[j].setAttribute("style", "background-color: white");
        }

    }
    rowCount++;
}

/* INITIALIZE COMPLETED ARRAY */
let completed = new Array(31);

for(let i=0;i< dayCount;i++){
    let tempString = "" + (currentMonth + 1) + "-" + (i+1) + "-" + currentYear;
    console.log("storing date: " + tempString);
    
    let tempDay = localStorage.getItem(tempString);
    console.log(tempDay);

    if(tempDay == null || tempDay == "false"){
        localStorage.setItem(tempString, "false");
    }else if(tempDay == "true"){
        daysCompleted++;
    }
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}

console.log("completed array: " + completed);
console.log("total days completed: " + daysCompleted);

/* CHECK STORAGE AND UPDATE COMPLETED ARRAY */
for(let i=0;i<currentDate;i++){
    let tempString = "" + (currentMonth + 1) + "-" + (i+1) + "-" + currentYear;
    console.log("storing date: " + tempString);

    let chosenDay = localStorage.getItem(tempString);
    console.log(i + 1 + ": " + chosenDay);

    let chosenDayDiv = document.getElementById("day" + (i+1));
    
    if(chosenDay === "true"){
        chosenDayDiv.style.backgroundColor = "pink";
    }else if(chosenDay === "false"){
        chosenDayDiv.style.backgroundColor = "white";
    }
}

/* UPDATE COMPLETED ON CALENDAR */
let daysDivs = document.querySelectorAll(".day");
for(let i=0; i<currentDate;i++){
    daysDivs[i].onclick = function(e){
        let num = e.target.innerText;
        let selectedDate = document.getElementById(e.target.id);
        let storageString = "" + (currentMonth + 1) + "-" + num + "-" + currentYear;
        if(localStorage.getItem(storageString) == "false"){
            selectedDate.style.backgroundColor = "pink";
            localStorage.setItem(storageString, true);
            daysCompleted++;
        }else if(localStorage.getItem(storageString) == "true"){
            selectedDate.style.backgroundColor = "white";
            localStorage.setItem(storageString, false);
            daysCompleted--;
        }

        totalDays.innerHTML = daysCompleted + "/" + dayCount;
        console.log(daysCompleted, currentDate);
        if(daysCompleted === currentDate){
            alert("great progress")
        }
    }
}

/* RESET BUTTON */
let resetButton = document.getElementById("resetButton");
resetButton.onclick = function(){
    for(let i=0;i<dayCount;i++){
        let tempStrings = "" + (currentMonth + 1) + "-" + (i+1) + "-" + currentYear;
        console.log(tempStrings);
        localStorage.setItem(tempStrings, "false");
        let curDay = document.getElementById("day" + (i+1));
        curDay.style.backgroundColor = "white";
    }
    daysCompleted = 0;
    totalDays.innerHTML = daysCompleted + "/" + daysInThisMonth;
}