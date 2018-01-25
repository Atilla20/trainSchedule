// Initializing Firebase

var config = {
    apiKey: "AIzaSyBPuvGdnzRBQ2ykd-5Pxq39_hrQ-IvG-rE",
    authDomain: "train-time-project-7dd7c.firebaseapp.com",
    databaseURL: "https://train-time-project-7dd7c.firebaseio.com",
    projectId: "train-time-project-7dd7c",
    storageBucket: "train-time-project-7dd7c.appspot.com",
    messagingSenderId: "208196312356"
  };

firebase.initializeApp(config);

//storing database in a variable
const db = firebase.database().ref('recentUserPush');

//=============================================================================================


// Submit button on click event listener. 
//On click, the user input gets stored in the firebase data and shows up in the html. 
$("#submit-button").on("click", function() {
	event.preventDefault();
   	var name = $("#train-name-input").val().trim();// This takes user input and stores it
   	var destination = $("#destination-input").val().trim();
   	var trainTime = $("#train-time-input").val().trim();
   	var frequency = $("#frequency-input").val().trim();

   	console.log(name);
    console.log(destination);
   	console.log(trainTime);
    console.log(frequency);


 

    //pushing the user input into the firebase database

    db.push({
    	name: $("#train-name-input").val().trim(),
    	destination: $("#destination-input").val().trim(),
    	trainTime: $("#train-time-input").val().trim(),
   		frequency: $("#frequency-input").val().trim(),
   		dateAdded: firebase.database.ServerValue.TIMESTAMP // this puts a date into firebase

   		


    }); //ends the db.push function

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");

    // empty input areas when user hits submit $(".form-control").empty();

 }); //ends the submit-button on click function 



//=============================================================================================
//This takes whatever is the most recent user input in firebase, and updates HTML



db.orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

	var snapshotValue = snapshot.val();
		//storing the snapshot.val() in a variable for convenience
		//displayMostRecentUser(snapshotValue);

	//console.logging the last user's data
	console.log(snapshotValue);

	//Changing HTMl to match the snapshotValue

	$("#train-name-input").text(snapshotValue.name);
	$("#destination-input").text(snapshotValue.destination);
	$("#train-time-input").text(snapshotValue.trainTime);
	$("#frequency-input").text(snapshotValue.frequency);


	//Calculations 

	const tFrequency = snapshotValue.frequency;
	console.log(tFrequency);

	const firstTime = snapshotValue.trainTime;
	console.log(firstTime);

	//first time pushed back a year to make sure it comes before current time

	const firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	//Calculates Current time

	const currentTime = moment();
	console.log("Current Time: " + moment(currentTime).format("hh:mm"));

	//Difference (in minutes) Between current time and first time

	const diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in Time:" + diffTime);

	//Time apart Remainder

	const tRemainder = diffTime % tFrequency;
	console.log("Remainder:" + tRemainder);

	//Minutes until the Train arrives

	const tMinutesTillTrain = tFrequency - tRemainder;
	console.log("Minutes Till Train:" + tMinutesTillTrain);

	//Next Train 

	const nextTrain = moment().add(tMinutesTillTrain, "minutes");
	console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));

	//Creates the table for each user

   var tableRow = $("<tr>");
    tableRow.html(
        `<td>${snapshot.val().name}</td>
        <td>${snapshot.val().destination}</td>
        <td>${snapshot.val().frequency}</td>
        <td>${nextTrain.format("hh:mm")}</td>
        <td>${tMinutesTillTrain}</td>`
   );
    $("#table-body").append(tableRow);
    var tableData = $("<td>");
    tableRow.append(tableData);
   });






	//============================================================================================


//=============================================================================================

//=============================================================================================

//This function below displays the user info up in the Current Train Schedule section

	//db.on("child_added", function(snapshot) {
    //console.log(snapshot.val().name);
    //console.log(snapshot.val().destination);
    //console.log(snapshot.val().trainTime);
    //console.log(snapshot.val().frequency);








