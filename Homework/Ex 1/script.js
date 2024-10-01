// Create an empty object to store users' notes
let allNotes = {};

// Save notes to localStorage
function saveNoteForUser(username, noteText) {
    // Get existing notes for the user, or create an empty array if none exist
    let userNotes = JSON.parse(localStorage.getItem(username)) || [];

    // Add the new note to the array
    userNotes.push(noteText);

    // Store the updated array back to localStorage
    localStorage.setItem(username, JSON.stringify(userNotes));
}

// Retrieve notes from localStorage
function getNotesForUser(username) {
    // Get the user's notes from localStorage, or an empty array if none exist
    return JSON.parse(localStorage.getItem(username)) || [];
}

// Display notes in the UI
function displayNotes(username) {
    // Get the container where notes will be displayed
    let notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = ''; // Clear the current notes

    // Retrieve the notes from localStorage
    let userNotes = getNotesForUser(username);

    // Loop through each note and append it to the container
    userNotes.forEach(note => {
        let noteDiv = document.createElement('div');
        noteDiv.innerHTML = `
            <div class="note">
                <div class="logo"><i class="fa-solid fa-user"></i></div>
                <div>${note}</div>
                <div class="icon"><i class="fa-solid fa-xmark"></i></div>
            </div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

// Create a note for the current user
function createNoteForUser(username) {
    const noteText = document.getElementById('note-text').value;
    
    // Check if the note content is valid (e.g., not empty)
    if (checkNote()) {
        // Save the note to localStorage
        saveNoteForUser(username, noteText);

        // Display the updated list of notes
        displayNotes(username);
        
        console.log("Note created successfully for " + username);
    } else {
        console.log("Couldn't create note");
    }
}


// Call this function when the user logs in to load their notes
function login() {
    const nameInput = document.getElementById("name").value;

    // Check if the name is in lowercase and not empty
    if (nameInput === nameInput.toLowerCase() && nameInput !== "") {
        // Hide the login section
        document.querySelector(".log-in-section").style.display = "none";

        // Show the display section
        document.querySelector(".display").style.display = "flex";

        // Load and display the user's notes
        displayNotes(nameInput);
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

function checkNote() {
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
        return false;
      } else {
        document.querySelector(".invalid-category").style.display = "none";
        return true;
      }
    }
  }
}



