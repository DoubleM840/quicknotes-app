// --- SELECT ELEMENTS ---
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMsg = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const countDisplay = document.querySelector("#note-count");

// --- STATE MANAGEMENT ---
let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

// --- SAFE RENDER FUNCTION (No innerHTML for user data!) ---
function render(filterText = "") {
    // Clear list safely
    notesList.innerHTML = ""; 
    
    // Filter notes based on search
    const filtered = notes.filter(n => 
        n.text.toLowerCase().includes(filterText.toLowerCase())
    );
    
    // Update Count Display
    if (notes.length === 0) {
        countDisplay.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        countDisplay.textContent = "You have 1 note.";
    } else {
        countDisplay.textContent = `You have ${notes.length} notes.`;
    }

    // Handle Empty Search Results
    if (filterText && filtered.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No notes match your search.";
        li.style.color = "#777";
        li.style.padding = "10px";
        notesList.appendChild(li);
        return;
    }

    // Build Note Cards Safely
    filtered.forEach(note => {
        const li = document.createElement("li");
        li.className = `note-card category-${note.category}`;
        
        // ✅ SAFE: Use textContent for user-generated text
        const textDiv = document.createElement("div");
        textDiv.textContent = note.text; 
        
        // Meta Info Container
        const metaDiv = document.createElement("div");
        metaDiv.className = "note-meta";
        
        const span = document.createElement("span");
        span.textContent = `${note.category.toUpperCase()} • ${note.createdAt}`;
        
        // Delete Button with Data Attribute
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.dataset.id = note.id; 
        
        // Assemble Card
        metaDiv.appendChild(span);
        metaDiv.appendChild(deleteBtn);
        li.appendChild(textDiv);
        li.appendChild(metaDiv);
        notesList.appendChild(li);
    });
}

// --- ADD NOTE WITH VALIDATION ---
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    const category = categorySelect.value;
    
    // Validation Logic
    if (!text) {
        errorMsg.textContent = "Please type a note first.";
        return;
    }
    if (text.length > 200) {
        errorMsg.textContent = "Notes must be 200 characters or fewer.";
        return;
    }
    
    // Clear Error & Add Note
    errorMsg.textContent = ""; 
    notes.push({
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    });
    
    saveAndRender();
    input.value = "";
    input.focus();
});

// --- DELETE NOTE (Event Delegation) ---
notesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = Number(e.target.dataset.id);
        notes = notes.filter(n => n.id !== id);
        saveAndRender();
    }
});

// --- SEARCH FEATURE ---
searchInput.addEventListener("input", (e) => {
    render(e.target.value);
});

// --- HELPER: SAVE & REFRESH UI ---
function saveAndRender() {
    localStorage.setItem("quicknotes", JSON.stringify(notes));
    render(searchInput.value); // Maintains current search filter
}

// --- INITIAL LOAD ---
saveAndRender();