// <script async src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js">

//   $(window).resize(function () {
//     if ($(window).width() <= 225) $('.date-number').addClass('position-relative');
//     else $('.date-number').removeClass('position-relative');
//   });

//   $(window).resize(function () {
//     if ($(window).width() <= 225) $('.date-border').addClass('position-absolute top-50 start-50 translate-middle');
//     else $('.date-border').removeClass('position-absolute top-50 start-50 translate-middle');
//   });

// Modal on Page Load
let myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});
document.onreadystatechange = function () {
  myModal.show();
};
//   End Modal on Page Load

// Muted / Unmute  toggle
const img1 = 'https://ik.imagekit.io/ifu66naiyrt/volume_WXh7-JI_w.svg';
const img2 = 'https://ik.imagekit.io/ifu66naiyrt/mute_L0j-LDO1z.svg';
const music = document.getElementById('myMusic');
const img = document.getElementById('mutedBtn');

function mutedUnmuted() {
  if (img.src === img1) {
    img.src = img2;
    music.pause();
    // music.muted = true;
    // console.log(vid.muted);
  } else {
    img.src = img1;
    music.play();
    // music.muted = false;
    // console.log(vid.muted);
  }
}

function playMusic() {
  music.play();
}
// End Muted / Unmuted toggle

// JS Time Counter
// Set the date we're counting down to
const countDownDate = new Date('Apr 13, 2021 08:00:00').getTime();

// Update the count down every 1 second
const x = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id :
  // Day
  document.getElementById('day').innerHTML = days;
  // Hour
  document.getElementById('hour').innerHTML = hours;
  // Minute
  document.getElementById('minute').innerHTML = minutes;
  // Second
  document.getElementById('second').innerHTML = seconds;

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById('day').innerHTML = '0';
    document.getElementById('hour').innerHTML = ' 0';
    document.getElementById('minute').innerHTML = ' 0';
    document.getElementById('second').innerHTML = ' 0';
  }
}, 1000);

// End JS Time Counter
