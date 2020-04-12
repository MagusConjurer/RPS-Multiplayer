var firebaseConfig = {
  apiKey: "AIzaSyAEkFoE-U1ewYotpASpQdB-QU4PCm5ysMA",
  authDomain: "cdavis-4220.firebaseapp.com",
  databaseURL: "https://cdavis-4220.firebaseio.com",
  projectId: "cdavis-4220",
  storageBucket: "cdavis-4220.appspot.com",
  messagingSenderId: "396141472765",
  appId: "1:396141472765:web:26edd119f69cb6344b0794",
  measurementId: "G-XEQ2WJF30K"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var name, destination, start, frequency;

$("#submit").on("click", function(event){
  event.preventDefault();
  name = $("#trainName").val();
  destination = $("#destination").val();
  start = $("#trainStart").val();
  frequency = $("#frequency").val();

  database.ref("/trains").push({
    name : name,
    destination : destination,
    start : start,
    frequency : frequency
  });
  $("#trainName").val("");
  $("#destination").val("");
  $("#trainStart").val("");
  $("#frequency").val("");
});

database.ref("/trains").on("child_added", function(snapshot) {
  var trainName = snapshot.val().name;
  var trainDestination = snapshot.val().destination;
  var trainStart = snapshot.val().start;
  var trainFrequency = snapshot.val().frequency;

  var timeLeft = moment().diff(moment(trainStart, "HH:mm")) % trainFrequency;
  var minutesAway = trainFrequency - timeLeft;

  var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

  var newTrain = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );
  
  $("#tableBody").append(newTrain);
});