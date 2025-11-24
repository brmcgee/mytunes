// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var openBtn = document.getElementById("openModalBtn");

// Get the <span> element that closes the modal
var closeSpan = document.getElementsByClassName("close-button")[0];

// Get the close button inside the modal
var closeButton = document.getElementsByClassName("modal-close-btn")[0];

// When the user clicks the button, open the modal
openBtn.onclick = function() {
  modal.style.display = "flex"; // Use flex to center the content
}

// When the user clicks on <span> (x), close the modal
closeSpan.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on the close button, close the modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let modalBodyHtml = `

<form action="http://localhost:8080/main.html" method="post">
  <div class="imgcontainer">
    <img src="https://music.brmnow.com/favico.ico" alt="Avatar" class="avatar">
  </div>

  <div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>

    <button class="modal-ok-btn" type="submit">Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn">Cancel</button>
    <span class="psw">Forgot <a href="#">password?</a></span>
  </div>
</form>
`
document.getElementById('modalBody').innerHTML = modalBodyHtml