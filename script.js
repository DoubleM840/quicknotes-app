// Select Elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMsg = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const countDisplay = document.querySelector("#note-count");

// State
let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

// Render Function
function render(filterText = "") {
    notesList.innerHTML = "";
    const filtered = notes.filter(n => n.text.toLowerCase().includes(filterText.toLowerCase()));
    
    // Update Count
    if (notes.length === 0) countDisplay.textContent = "You have no notes yet.";
    else if (notes.length === 1) countDisplay.textContent = "You have 1 note.";
    else countDisplay.textContent = `You have ${notes.length} notes.`;

    // Show empty search message
    if (filterText && filtered.length === 0) {
        notesList.innerHTML = "<li style='color:#777; padding:10px;'>No notes match your search.</li>";
        return;
    }

    // Build Cards
    filtered.forEach(note => {
        const li = document.createElement("li");
        li.className = `note-card category-${note.category}`;
        
        li.innerHTML = `
            <div>${note.text}</div>
            <div class="note-meta">
                <span>${note.category.toUpperCase()} • ${note.createdAt}</span>
                <button class="delete-btn" data-id="${note.id}">Delete</button>
            </div>
        `;
        notesList.appendChild(li);
    });
}

// Add Note
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    const category = categorySelect.value;
    
    // Validation
    if (!text) {
        errorMsg.textContent = "Please type a note first.";
        return;
    }
    if (text.length > 200) {
        errorMsg.textContent = "Notes must be 200 characters or fewer.";
        return;
    }
    
    errorMsg.textContent = ""; // Clear error
    notes.push({
        id: Date.now(),
        text,
        category,
        createdAt: new Date().toLocaleString()
    });
    
    saveAndRender();
    input.value = "";
    input.focus();
});

// Delete Note (Event Delegation)
notesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        notes = notes.filter(n => n.id !== id);
        saveAndRender();
    }
});

// Helper
function saveAndRender() {
    localStorage.setItem("quicknotes", JSON.stringify(notes));
    render(searchInput.value);
}

// Initial Load
saveAndRender();