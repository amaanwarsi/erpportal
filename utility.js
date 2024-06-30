// Selecting elements
const accordion = document.querySelectorAll(".accordion-toggle"),
  sidebar = document.querySelector(".sidebar"),
  containerFluid = document.querySelector(".container-fluid"),
  header = document.querySelector("header"),
  resetSearchInput = document.querySelector("#resetField"),
  searchInput = document.querySelector("#search-input"),
  resultsContainer = document.getElementById("results"),
  menuUL = document.querySelector(".sidebar ul"),
  menuItems = document.querySelectorAll(".sidebar li"),
  originalMenuItems = Array.from(menuItems);

// SVG icons
const downArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M6 9l6 6l6 -6"></path> </svg>`,
  upArrow = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"></path> <path d="M6 15l6 -6l-6 -6"></path> </svg>`;

const openTab = (evt, tabName) => {
  const tabContent = document.querySelectorAll(".tab-content");
  tabContent.forEach((content) => {
    content.style.display = "none";
  });

  const tabLinks = document.querySelectorAll(".tab-btn");
  tabLinks.forEach((link) => {
    if (link.classList.contains("active")) {
      link.classList.remove("active");
    }
  });
  evt.currentTarget.classList.toggle("active");

  document.getElementById(tabName).style.display = "block";
};

// Focus input field on input-group click
document.querySelectorAll(".input-group").forEach((element) => {
  var inputField = element.querySelector(".input-field");
  element.addEventListener("click", () => {
    inputField.focus();
  });
});

// Toggle menu visibility on menu-toggle click
document.querySelectorAll(".menu-toggle").forEach((el) => {
  el.onclick = () => {
    sidebar.classList.toggle("hide-md");
  };
});

// Toggle dark/light theme
document.querySelector("#toggleTheme").onclick = () => {
  document.querySelector("body").classList.toggle("dark");

  const isDarkTheme = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDarkTheme ? "dark" : "light");
};

// Retrieve theme from local storage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.body.classList.toggle("dark", savedTheme === "dark");
}

// Setup accordion functionality
accordion.forEach((accordionItem) => {
  const iconSpan = document.createElement("span");
  iconSpan.classList.add("accordion-icon");
  iconSpan.innerHTML = downArrow;

  accordionItem.querySelector("a").appendChild(iconSpan);

  accordionItem.addEventListener("click", function () {
    // closeOtherPanels(this);
    // var svg = this.querySelector('.accordion-icon');

    // if (svg.innerHTML.trim() === downArrow) {
    //     svg.innerHTML = upArrow;
    // } else {
    //     svg.innerHTML = downArrow;
    // }

    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.classList.toggle("hide");
    panel.style.maxHeight = panel.classList.contains("hide")
      ? null
      : panel.scrollHeight + "px";
  });
});

// Function to close other accordion panels
// const closeOtherPanels = (clickedAccordion) => {
//     accordion.forEach((accordionItem) => {
//         if (accordionItem !== clickedAccordion) {
//             accordionItem.classList.remove("active");
//             const panel = accordionItem.nextElementSibling;
//             panel.classList.add("hide");
//             panel.style.maxHeight = null;
//             accordionItem.querySelector('.accordion-icon').innerHTML = downArrow;
//         }
//     });
// }

// Dropdown menu functionality
document.querySelector("#dropbtn").addEventListener("click", (event) => {
  document.getElementById("myDropdown").classList.toggle("hide");
  event.stopPropagation();
});

// Hide dropdown menu when clicking outside
window.addEventListener("click", () => {
  document.getElementById("myDropdown").classList.add("hide");
});

// Search functionality
searchInput.addEventListener("input", function (event) {
  const query = event.target.value.trim().toLowerCase();

  menuItems.forEach(function (item) {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  menuUL.innerHTML = "";

  if (query === "") {
    originalMenuItems.forEach(function (item) {
      menuUL.appendChild(item.cloneNode(true));
    });
  } else {
    menuItems.forEach(function (item) {
      if (item.style.display !== "none") {
        var clonedItem = item.cloneNode(true);
        var spanElements = clonedItem.querySelectorAll("span");

        spanElements.forEach(function (spanElement) {
          spanElement.parentNode.removeChild(spanElement);
        });
        menuUL.appendChild(clonedItem);
      }
    });
  }

  if (menuUL.children.length > 0) {
    resultsContainer.style.display = "block";
  } else {
    resultsContainer.style.display = "none";
  }
});

// Get all select-dropdown elements
const selectDropdowns = document.querySelectorAll(".select-dropdown");

// Loop through each select-dropdown
selectDropdowns.forEach((selectDropdown) => {
  // Get input and list elements within each select-dropdown
  const input = selectDropdown.querySelector(".select-group .input-field");
  const list = selectDropdown.querySelector(".list");

  // Add click event listener to select-group
  selectDropdown
    .querySelector(".select-group")
    .addEventListener("click", () => {
      // Toggle 'open' class on input
      input.classList.toggle("open");

      // Toggle max height and box shadow on list
      if (list.style.maxHeight) {
        list.style.maxHeight = null;
        list.style.boxShadow = null;
      } else {
        list.style.maxHeight = list.scrollHeight + "px";
        list.style.boxShadow =
          "0 1px 2px 0 rgba(0, 0, 0, 0.15),0 1px 3px 1px rgba(0, 0, 0, 0.1)";
      }
    });

  // Add change event listener to radio buttons
  const radios = selectDropdown.querySelectorAll(".radio");
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      // Update input value with selected option
      input.value = radio.nextElementSibling.textContent.trim();
      // Close the dropdown
      input.classList.remove("open");
      list.style.maxHeight = null;
      list.style.boxShadow = null;
    });
  });

  // Hide the list when clicked outside
  document.addEventListener("click", (event) => {
    if (!selectDropdown.contains(event.target)) {
      input.classList.remove("open");
      list.style.maxHeight = null;
      list.style.boxShadow = null;
    }
  });
});
