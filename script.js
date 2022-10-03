const shareButton = document.querySelector(".btn-light");
const modal1 = document.querySelector(".modal-1");
const modal2 = document.querySelector(".modal-2");
const inputField1 = document.querySelector(".input1");
const inputField2 = document.querySelector(".input2");
const inviteButton1 = document.querySelector(".invite-1");

inputField1.addEventListener("click", displayShareForm);
shareButton.addEventListener("click", hideShareForm);
inviteButton1.addEventListener("click", displayShareForm);

// storing the selected people and group
let accessList = {};
let mainList = {};

function displayShareForm() {
  // create a copy of multi-select dropdown "select" element
  const multiDropdownCopy = document
    .getElementById("multi-select")
    .cloneNode(true);

  // hide the displaying of previously selected items from the select-field
  $(".select-1 > a").remove();
  // remove the old multi-select dropdown with reduced number of options
  $(".select-1 > #multi-select").remove();

  // append the previously stored original dropdown with all options in place of above
  document.querySelector(".select-1").appendChild(multiDropdownCopy);

  // reset the accessList too
  for (let member in accessList) delete accessList[member];

  modal1.classList.add("hidden");
  modal2.classList.remove("hidden");
}

// Return back to the main-view
function hideShareForm() {
  modal1.classList.remove("hidden");
  modal2.classList.add("hidden");
}

// Allow adding new emails to the dropdown invite
$(".ui.dropdown").dropdown({
  allowAdditions: true,
});

// On people/group selection
$("#multi-select").dropdown("setting", "onChange", function(values) {
  console.log(...values);
  // get the permission
  let permission = document.querySelector(".select-2").value;

  // reset the accessList first
  for (let member in accessList) delete accessList[member];

  // then update the list
  values.forEach((el) => {
    accessList[el] = permission;
  });

  console.log(accessList);
});

// On the "invite (2)" button click, return to modal-1 and display the accessList with permission
document.querySelector(".invite-2").addEventListener("click", () => {
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
      let accessTexts = ["Full access", "Can edit", "Can view", "No access"];
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
        // add the selected attribute
        if (mainList[key] === accessValues[i]) {
          option.setAttribute("selected", "");
        }
        selectList.appendChild(option);
      }

      li.appendChild(div);
    }
  }
}

// use event delegation to handle onchange event on dynamically added "select-3" tag
document.getElementById("accessList").addEventListener("change", function(e) {
  if (e.target) {
    let key = e.target.parentElement.firstChild.innerText;
    let value = e.target.value;
    // update the permission for current individual/group in the mainList
    accessList[key] = value;
    // mainList[key] = value;
    console.log(key, value, mainList);

    // re-render the list
    displayList();
  }
});

// handle copy link click
document.querySelector(".copy-btn").addEventListener("click", function(e) {
    e.target.innerHTML = `<i class="fa fa-link" aria-hidden="true"></i> Copied link!`;
    let url = e.target.getAttribute("href");
    navigator.clipboard.writeText(url);
  });
  