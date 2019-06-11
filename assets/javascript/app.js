var config = {
    apiKey: "AIzaSyBPgbt8VE6gJiRBV5B843U3sj_K9Pb2BZE",
    authDomain: "derek-s-project.firebaseapp.com",
    databaseURL: "https://derek-s-project.firebaseio.com",
    projectId: "derek-s-project",
    storageBucket: "derek-s-project.appspot.com",
    messagingSenderId: "998895681133",
    appId: "1:998895681133:web:c5c94cf966efc973"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrainTime = $("#first-train-input").val().trim();
      var frequency = $("#frequency-input").val().trim();

      var newTrain = {
          trainName: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency
      };
      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#first-train-input").val("");
      $("#frequency-input").val("");
      database.ref().push(newTrain);
  });

  database.ref().on("child_added", function(snapshot) {
      var child = snapshot.val();
      var newRow = $("<tr>");
      var trainNameData = $("<td>").text(child.trainName);
      var destinationData = $("<td>").text(child.destination);
      var firstTrainTimeData = $("<td>").text(child.firstTrainTime);
      var frequencyData = $("<td>").text(child.frequency);
      var timestamp = moment(child.firstTrainTime,'HHmm');
      var minutesAway = $("<td>").text(timestamp.diff(moment(),"minutes"));
      if (timestamp.diff(moment(),"minutes") <= 0) {
        destinationData.clear();
        firstTrainTimeData.clear();
        frequencyData.clear();
        trainNameData.clear();
        minutesAway.clear();
      }; 
      $("#table").append(newRow, trainNameData, destinationData, frequencyData,firstTrainTimeData, minutesAway); }, function (errorObject) {
          console.log("Errors handled: " + errorObject.code);
  });