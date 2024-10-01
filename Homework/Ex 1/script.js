// Save notes to localStorage
function saveNoteForUser(username, noteText) {
    let userNotes = JSON.parse(localStorage.getItem(username)) || [];
    userNotes.push(noteText);
    localStorage.setItem(username, JSON.stringify(userNotes));
}

// Retrieve notes from localStorage
function getNotesForUser(username) {
    return JSON.parse(localStorage.getItem(username)) || [];
}

// Display notes in the UI with delete functionality
function displayNotes(username) {
    let notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = ''; // Clear the current notes

    let userNotes = getNotesForUser(username);

    userNotes.forEach((note, index) => {
        let noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <div class="logo"><i class="fa-solid fa-user"></i></div>
            <div>${note}</div>
            <div class="icon" onclick="removeNoteForUser('${username}', ${index})"><i class="fa-solid fa-xmark"></i></div>
        `;
        notesContainer.appendChild(noteDiv);
    });
}

// Create a note for the current user
function createNoteForUser(username) {
    const noteText = document.getElementById('note-text').value;

    if (checkNote()) {
        saveNoteForUser(username, noteText);
        displayNotes(username);  // Refresh the notes displayed
        console.log("Note created successfully for " + username);
    } else {
        console.log("Couldn't create note");
    }
}

// Remove a note for the user
function removeNoteForUser(username, noteIndex) {
    let userNotes = getNotesForUser(username);

    // Remove the note at the specified index
    userNotes.splice(noteIndex, 1);

    // Save the updated notes back to localStorage
    localStorage.setItem(username, JSON.stringify(userNotes));

    // Refresh the displayed notes
    displayNotes(username);
}

// Check if the note content is valid (e.g., non-empty)
function checkNote() {
    const noteText = document.getElementById('note-text').value;
    if (noteText.trim() === "") {
        document.querySelector(".invalid-text").style.display = "flex";
        return false;
    } else {
        document.querySelector(".invalid-text").style.display = "none";
        return true;
    }
}

// Call this function when the user logs in to load their notes
function login() {
    const nameInput = document.getElementById("name").value;

    if (nameInput === nameInput.toLowerCase() && nameInput !== "") {
        document.querySelector(".log-in-section").style.display = "none";
        document.querySelector(".display").style.display = "flex";
        displayNotes(nameInput);  // Load and display the user's notes
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



