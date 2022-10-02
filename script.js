const shareButton = document.querySelector(".btn-light");
const modal1 = document.querySelector(".modal-1");
const modal2 = document.querySelector(".modal-2");
const inputField1 = document.querySelector(".input1");
const inputField2 = document.querySelector(".input2");

inputField1.addEventListener("click", displayShareForm);
shareButton.addEventListener("click", hideShareForm);

function displayShareForm() {
  // $("#multi-select").dropdown("clear");
  //   document.querySelector(".select-1"). = -1;
  modal1.classList.add("hidden");
  modal2.classList.remove("hidden");
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
  let permission = document.querySelector(".select-2");
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
  let permission = document.querySelector(".select-2");
  let value = permission.value;
  console.log(value);

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
  }

  // clear all the li->span firstly
  li.innerHTML = "";
  // loop over the people/group and append to the main view
  for (let key in mainList) {
    // if the permission has been updated to "No access" => remove entry from mainList
    if (mainList[key] == "none") {
      delete mainList[key];
    } else {
      let div = document.createElement("div");
      let span = document.createElement("span");
      span.innerText = `${key}`;
      div.appendChild(span);

      //Create array of options to be added
      let accessTexts = ["Full access", "Can edit", "view", "No access"];
      let accessValues = ["full", "edit", "view", "none"];

      //Create and append select list
      let selectList = document.createElement("select");
      selectList.classList = "form-select select-3";
      div.appendChild(selectList);

      //Create and append the options
      for (let i = 0; i < accessTexts.length; i++) {
        let option = document.createElement("option");
        option.value = accessValues[i];
        option.text = accessTexts[i];
        if (mainList[key] === accessValues[i]) {
          option.setAttribute("selected", "");
        }
        selectList.appendChild(option);
      }

      li.appendChild(div);
    }
  }
}
