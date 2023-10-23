 // Import the functions we need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, onValue, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// Firebase configuration
 const firebaseConfig = {
 apiKey: "AIzaSyCIBeznpoOXpU_tJ2Eb6lc0UNwlxM-aGZ8",
 authDomain: "spondonblooddonationdb.firebaseapp.com",
 projectId: "spondonblooddonationdb",
 storageBucket: "spondonblooddonationdb.appspot.com",
 messagingSenderId: "916618952855",
 appId: "1:916618952855:web:0e9b9c6e39b5a5beb5a9d2"
 };
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 //connect to db of firebase.
 const db = getDatabase(app);
 // select the DOM elements for doner registration.
 const donerName = document.querySelector("#rgName");
 const donerAge = document.querySelector("#rgAge");
 const donerGender = document.querySelector("#rgGender");
 const donerReligion = document.querySelector("#rgReligion");
 const donerBloodGroup = document.querySelector("#rgBlood_group");
 const donerPhone = document.querySelector("#rgPhone");
 const donerLocation = document.querySelector("#rgLocation");
 const submitBtn = document.querySelector("#rgBtn");

 const donerInfotable = document.querySelector("table");

 // DOM selection for doner filter options.
 const filterGender = document.querySelector("#filter__gender");
 const filterReligion = document.querySelector("#filter__religion");
 const filterBloodGroup = document.querySelector("#filter__blood_group");
 const filterLocation = document.querySelector("#filter__location");
 const filterBtn = document.querySelector(".filter_btn");
 
// variable declaretion.
let UID = 0;    // for unique identity of donor data set.
let SID = 0;    // for the serial issue. 
//  template of table row.
const tableRowHeaderTemp = `<tr>
    <th>SL</th>
    <th>Name</th>
    <th>Age</th>
    <th>Gender</th>
    <th>Religion</th>
    <th>Blood Group</th>
    <th>Phone</th>
    <th>Address</th>
</tr>`
 // event declaretion for doner registration and filter.
 // all the select box change event on fire description.
 const changeEvents = async (thisElement) => {
    let changeValue = await thisElement.value;
    return changeValue;
 }        
 // db write code. 
 submitBtn.addEventListener("click", function (event) {        
    event.preventDefault(); 
    set(ref(db, "user/" + UID++),
     {
        donerName: donerName.value,
        donerAge: donerAge.value,
        donerGender: donerGender.value,
        donerReligion: donerReligion.value,
        donerBloodGroup: donerBloodGroup.value,
        donerPhone: donerPhone.value,
        donerLocation: donerLocation.value
    })
    alert("Thank You be a Doner!");
 })
 // db read code.
 const userRef = ref(db, "user/");
     
 onValue(userRef, (snapshot) => {
    const userSnapshots = snapshot.val();
    SID = 1;
    donerInfotable.innerHTML = tableRowHeaderTemp;
    userSnapshots?.map(data => {
        let template = `<tr>
            <td>${SID++}</td>
            <td>${data.donerName}</td>
            <td>${data.donerAge}</td>
            <td>${data.donerGender}</td>
            <td>${data.donerReligion}</td>
            <td>${data.donerBloodGroup}</td>
            <td>${data.donerPhone}</td>
            <td>${data.donerLocation}</td> 
        </tr>`
        donerInfotable.innerHTML += template;
    });
    // show filtered doner information.
    // add event listener for filtered doner.
    filterBtn.addEventListener("click", function(event){
        event.preventDefault();
        SID = 1;
        donerInfotable.innerHTML = tableRowHeaderTemp;
        userSnapshots?.filter((data) => {
            if(data.donerGender == filterGender.value || data.donerReligion == filterReligion.value || data.donerBloodGroup == filterBloodGroup.value || data.donerLocation == filterLocation.value){
                let template = `<tr>
                    <td>${SID++}</td>
                    <td>${data.donerName}</td>
                    <td>${data.donerAge}</td>
                    <td>${data.donerGender}</td>
                    <td>${data.donerReligion}</td>
                    <td>${data.donerBloodGroup}</td>
                    <td>${data.donerPhone}</td>
                    <td>${data.donerLocation}</td> 
                </tr>`
                donerInfotable.innerHTML += template;
            }else {
                return donerInfotable;
            }  
         })
     })
 });