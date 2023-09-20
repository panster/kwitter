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

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");


function send(){
msg = document.getElementById("msg").value;


  firebase.database().ref(room_name).push({
    Name:user_name,
    Message :msg,
    Like:0
  });
  document.getElementById("msg").value="";
}








function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
         console.log(firebase_message_id);
         console.log(message_data);
         names = message_data['Name'];
         message = message_data['Message'];
         like = message_data['Like'];
         name_with_tag = "<h4> "+ names +"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value=" +like+" onclick= 'updateLike(this.id)'>"
         span_tag= "<span class='glyphicon glyphicon-thumbs-up'>LIKE : "+like+" </span></button><hr>"


        row = name_with_tag + message_with_tag +like_button + span_tag;      
        document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();


function updateLike(message_id)
{
  console.log("clicked on like button : " + message_id);
  // we will create a new variable for button id , coming from message_id
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  // we will convert the likes into a NUMBER using Number()
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);


  firebase.database().ref(room_name).child(message_id).update({
    Like : updated_likes  
   });


}


function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location="index.html";
}
