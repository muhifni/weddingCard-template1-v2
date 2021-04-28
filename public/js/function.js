// Modal on Page Load
let myModal = new bootstrap.Modal(document.getElementById("exampleModal"), {});
document.onreadystatechange = function () {
  myModal.show();
};
//   End Modal on Page Load

// Muted / Unmute  toggle
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");
const music = document.getElementById("myMusic");
const img = document.getElementById("mutedBtn");

function mutedUnmuted() {
  volume.classList.toggle("d-none");
  mute.classList.toggle("d-none");
  if (music.muted === false) {
    music.muted = true;
    console.log("Audio muted");
  } else {
    // img.src = img1;
    music.muted = false;
    console.log("Audio unmuted");
  }
}

function playMusic() {
  music.play();
}
// End Muted / Unmuted toggle

// JS Time Counter
// Set the date we're counting down to
const countDownDate = new Date("Apr 23, 2021 08:00:00").getTime();

// Update the count down every 1 second
const x = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id :
  // Day
  document.getElementById("day").innerHTML = days;
  // Hour
  document.getElementById("hour").innerHTML = hours;
  // Minute
  document.getElementById("minute").innerHTML = minutes;
  // Second
  document.getElementById("second").innerHTML = seconds;

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("day").innerHTML = "0";
    document.getElementById("hour").innerHTML = " 0";
    document.getElementById("minute").innerHTML = " 0";
    document.getElementById("second").innerHTML = " 0";
  }
}, 1000);

// End JS Time Counter

//Menyimpan input form ke google sheets
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxAC34sYWkcRR1SJ3Pi-w-r0GHEfc8TcihKuU_kXQRUGjke7WQfVA2CAnCa_ruFyqfvnQ/exec";
const form = document.forms["reservasi-form"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const alert = document.querySelector(".alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // ketika tombol diklik
  // tampilkan tombol loading dan hilangkan tombol submit
  btnLoading.classList.toggle("d-none");
  btnKirim.classList.toggle("d-none");
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      // tampilkan tombol kirim dan hilangkan tombol loading
      btnLoading.classList.toggle("d-none");
      btnKirim.classList.toggle("d-none");

      // // menampilkan alert
      alert.classList.toggle("d-none");

      // reset isi form
      form.reset();
      console.log("Success send data to gogle sheets!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

// load komen dari database
function loadComment() {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("comments").innerHTML = "";
      console.log("Success get comment from DB :)");

      let result = this.responseText;

      let results = JSON.parse(result);

      results.forEach((db) => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        let br = document.createElement("br");
        let b = document.createElement("b");

        let textName = document.createTextNode(db.user_name);
        let textComment = document.createTextNode(db.user_comment);

        b.appendChild(textName)

        td.appendChild(b);
        td.appendChild(br);
        td.appendChild(textComment);

        tr.appendChild(td);

        document.getElementById("comments").appendChild(tr);

        // focus comment paling bawah
        let objDiv = document.querySelector(".child-comment");
        objDiv.scrollTop = objDiv.scrollHeight;
      });
    }
  };

  xhttp.open("GET", "/getComment", true);
  xhttp.send();
}

// insert komen ke database
function insertComment() {
  let xhttp = new XMLHttpRequest();
  const form = document.forms["comment-form"];

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let result = this.responseText;
      console.log("Success insert comment");
      console.log(result);
      form.reset();
      loadComment();
    }
  };

  let name = document.getElementById("user-name").value;
  let comment = document.getElementById("user-comment").value;

  xhttp.open("POST", "/insertComment", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send('{"user_name":"' + name + '", "user_comment":"' + comment + '"}');
}
