const shareButton = document.querySelector(".btn-light");
const modal1 = document.querySelector(".modal-1");
const modal2 = document.querySelector(".modal-2");
const inputField1 = document.querySelector(".input1");
const inputField2 = document.querySelector(".input2");

inputField1.addEventListener("click", displayShareForm);
shareButton.addEventListener("click", hideShareForm);

function displayShareForm() {
  //   $("#multi-select").dropdown("clear");
  //   $(".ui.dropdown").dropdown("restore");
  modal1.classList.add("hidden");
  modal2.classList.remove("hidden");
  //   document.querySelector(".select-1").classList.add("active");
  //   document.querySelector(".select-1").classList.add("visible");
  document.querySelector(".menu.transition").classList.toggle("hidden");
  document.querySelector(".menu.transition").classList.toggle("visible");
  if (
    document.querySelector(".menu.transition").classList.contains("visible")
  ) {
    document.querySelector(".menu.transition").style.display =
      "block !important";
  }

  //   textbox.scrollIntoView();
}

// hide the people/group list for click anywhere on the screen

function hideShareForm() {
  modal1.classList.remove("hidden");
  modal2.classList.add("hidden");
}

// Allow adding new emails to the dropdown invite
$(".ui.dropdown").dropdown({
  allowAdditions: true,
});

// storing the selected people and group in an array
let accessList = {};
let mainList = {};
$("#multi-select").dropdown("setting", "onChange", function(values) {
  console.log(...values);
  // get the permission
  let permission = document.querySelector(".select-2 > select");
  let value = permission.value;

  // if people are added and then removed, then update the accessList accordingly
  if (value.length === 0) {
    accessList = {};
  } else {
    // reset the accessList first
    accessList = {};
    // then update the list
    values.forEach((el) => {
      accessList[el] = value;
    });
  }

  console.log(accessList);
});

// On the "invite (2)" button click, return to modal-1 and display the accessList with permission
document.querySelector(".invite2").addEventListener("click", () => {
  // get the permission
  let permission = document.querySelector(".select-2 > select");
  let value = permission.value;

  // update the permission for people/group
  for (let key in accessList) {
    accessList[key] = value;
  }

  // append the list to initial page
  displayList();

  // return to initial-page
  hideShareForm();
});

function displayList() {
  let li = document.getElementById("accessList");
  for (let key in accessList) {
    mainList[key] = accessList[key];
    // // check if the current value has already been appended to the main view
    // if (mainList[key]) {
    // 	// update the permission
    // 	mainList[key] = accessList[key];
    // }
    // else {
    // 	// add the new people/group
    // 	mainList[key] =
    // }
  }

  // clear all the li->span firstly
  li.innerHTML = "";
  // loop over the people/group and append to the main view
  for (let key in mainList) {
    let span = document.createElement("span");
    span.innerText = `${key} -> ${mainList[key]}`;
    li.appendChild(span);
  }
}
