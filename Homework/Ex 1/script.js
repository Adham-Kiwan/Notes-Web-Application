function login() {
  const nameInput = document.getElementById("name").value;

  // Check if the name is in lowercase
  if (nameInput === nameInput.toLowerCase() && nameInput !== "") {
    // Hide the login section
    document.querySelector(".log-in-section").style.display = "none";

    // Show the display section
    document.querySelector(".display").style.display = "flex";
  } else {
    document.querySelector(".invalid-username").style.display = "flex";
  }
}


function checkTextarea() {
  const textarea = document.getElementById("note-text").value;

  if (textarea.trim() === "") {
    // The textarea is empty or contains only whitespace
    return false;
  } else {
    // The textarea contains text
    return true;
  }
}

function checkRadioButtons() {
  const radioButtons = document.getElementsByName("priority");
  let isChecked = false;

  // Loop through radio buttons to check if any is selected
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      isChecked = true;
      break;
    }
  }

  return isChecked;
}

function checkCategorySelected() {
  const categorySelect = document.getElementById("category");

  // Check if the selected value is not the default empty or disabled option
  if (categorySelect.value === "") {
    return false; // No valid category selected
  } else {
    return true; // A category is selected
  }
}

function createNote() {
  // Get the note content
  if (!checkTextarea()) {
    document.querySelector(".invalid-text").style.display = "flex";
  } else {
    document.querySelector(".invalid-text").style.display = "none";
    if (!checkRadioButtons()) {
        document.querySelector(".invalid-choice").style.display = "flex";
    } else {
        document.querySelector(".invalid-choice").style.display = "none";
      if (!checkCategorySelected()) {
        document.querySelector(".invalid-category").style.display = "flex";
      } else {
        document.querySelector(".invalid-category").style.display = "none";
      }
    }
  }
}
