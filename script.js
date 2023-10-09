/**
***** modal code start...
**/

// Variable Declaration.
let modal = document.querySelector(".blood__doner_registration-modal");
let btn = document.querySelector(".doner_btn");
let span = document.querySelector(".blood__doner_registration-modal-close_btn");

// event javascript code.
// When the user clicks on the button, open the modal
let OpenModelBtn = () => {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
let CloseModelSpan = () => {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/**
***** modal code end...
**/
// ########################
// ########################
// ########################
/**
***** firebase code start...
**/

// i wanna use firebase script here.

/**
***** firebase code end...
**/