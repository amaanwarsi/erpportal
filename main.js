const passInput = document.querySelector("#txtpassword");
const idInput = document.querySelector("#txtUserid");
const showPassBtn = document.querySelector("#showPass");
const loginBtn = document.querySelector("#ImgBttn_Login");

document.querySelectorAll(".input-group").forEach((element) => {
  var inputField = element.querySelector(".input-field");
  element.addEventListener("click", () => {
    inputField.focus();
  });
});

showPassBtn.addEventListener("click", function () {
  showPassBtn.innerHTML = "";
  if (passInput.type === "password") {
    passInput.type = "text";
    // Change SVG path to the new set of paths when showing the password
    showPassBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                    <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                    <path d="M3 3l18 18" />
                </svg>
            `;
  } else {
    passInput.type = "password";
    // Change SVG path back to the original when hiding the password
    showPassBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path
                        d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                </svg>
            `;
  }
});

loginBtn.addEventListener("click", function (e) {
  if (passInput.value == "") {
    e.preventDefault();
    document.querySelector("#validate-pass").classList.toggle("hide");
    passInput.parentNode.classList.toggle("invalid-input");
  } else {
    document.querySelector("#validate-pass").classList.add("hide");
    passInput.parentNode.classList.remove("invalid-input");
  }

  if (idInput.value === "") {
    e.preventDefault();
    document.querySelector("#validate-id").classList.toggle("hide");
    idInput.parentNode.classList.toggle("invalid-input");
  } else {
    document.querySelector("#validate-id").classList.add("hide");
    idInput.parentNode.classList.remove("invalid-input");
  }

  if (passInput.value !== "" && idInput.value !== "") {
    // this.disabled = true;

    this.innerHTML = "";
    this.classList.add("loader");
    setTimeout(() => {
      this.innerHTML = "Log in";
      this.classList.remove("loader");
    }, 10000);
  }
});
