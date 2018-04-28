//Firebase

var config = {
    apiKey: "AIzaSyDvu6Yw3wOb5dH5qKkUiHte4Oc-Ee_fm6Y",
    authDomain: "traintime-17f38.firebaseapp.com",
    databaseURL: "https://traintime-17f38.firebaseio.com",
    projectId: "traintime-17f38",
    storageBucket: "traintime-17f38.appspot.com",
    messagingSenderId: "166939202256"
};

firebase.initializeApp(config);

var database = firebase.database();


// 2. Button for adding train
$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var userTrain = $("#trainName").val().trim();
    console.log(userTrain)

    var userDest = $("#destination").val().trim();
    console.log(userDest)

    var userFirstTrain = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(1, "years").format("X");
    console.log(userFirstTrain)

    var frequency = $("#frequency").val().trim();
    console.log(userFreq)

    
    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: userTrain,
        destination: userDest,
        firstTrain: userFirstTrain,
        frequency: frequency,

    };

    // Uploads train data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // Alert
    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

    return false;
});


database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var newTrainName = childSnapshot.val().name;
    var newTrainDest = childSnapshot.val().destination;
    var newFirstTrain = childSnapshot.val().firstTrain;
    var newTrainFreq = childSnapshot.val().frequency;

    // Employee Info
    console.log(newTrainName);
    console.log(newTrainDest);
    console.log(newTrainFreq);

    

    var diffTime = moment().diff(moment.unix(newFirstTrain), "mm");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "mm").format("HH:mm a");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDest + "</td><td>" +
        newTrainFreq + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});   
