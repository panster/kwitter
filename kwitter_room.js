var firebaseConfig = {
    apiKey: "AIzaSyCNUS4BpEPXSnwohjstboZgqd_U5eZ0i64",
    authDomain: "kwitter-6decd.firebaseapp.com",
    databaseURL: "https://kwitter-6decd-default-rtdb.firebaseio.com",
    projectId: "kwitter-6decd",
    storageBucket: "kwitter-6decd.appspot.com",
    messagingSenderId: "615088467021",
    appId: "1:615088467021:web:66503af253d80ee0b54004"
  };
  
  // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

user_name = localStoarage.getItem("user_name");
document.getElementById("user_name_lbl").innerHTML = "Welcome" + user_name + "!"


function addRoom()
{
    room_name = document.getElementById("room_input").value;

    firebase.database().ref("/").child(room_name).update({
    purpose : "adding room name"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "kwitter_page.html";
}
function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
    Room_names = childKey;
    console.log("Room Names - " + Room_names);
    row = "<div class='room_name' id="+Room_names+" onclick = 'redirectToRoomName(this.id)'> # " +Room_names+ "</div> <hr>"
     document.getElementById("output").innerHTML +=row;



});
});
}

getData();

function redirectToRoomName(clicked_name)
{
    console.log("Clicked room name = " + clicked_name);
    localStorage.setItem("room_name", clicked_name);
    window.location = "kwitter_page.html";
}

function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
