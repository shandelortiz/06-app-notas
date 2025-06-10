// Seleccionamos elementos del DOM
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent')
const notesContainer = document.getElementById('notesContainer');

// Al cargar la pagina, se muestran las notas guardadas en el navegador
document.addEventListener('DOMContentLoaded', showNotes);

// Escuchamnos el evento de envio del formulario
noteForm.addEventListener('submit', e => {
    e.preventDefault(); // Evita que la pagina se recargue

    // Se crea una nota con titulo y contenido
    const title = noteTitle.value.trim();
    const content = noteContent.value.trim();

    if (title === '' || content === '') return;

    // Se crea un objeto por la nota
    const newNote = { title, content };

    // Se obtienen notas previas del almacenamiento local
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    // Se agrega la nueva nota
    savedNotes.push(newNote);

    // Guardamos en el localstorage
    localStorage.setItem('notes', JSON.stringify(savedNotes));

    // Se limpia el formulario
    noteForm.reset();

    // Se muestran las notas actualizadas
    showNotes();
});

// Funcion para mostrar las notas
function showNotes() {
    // Se limpia el contenedor de notas
    notesContainer.innerHTML = '';

    // Se obtienen las notas del localstorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Se recorre cada nota y se muestra en el contenedor
    notes.forEach((note, index) => {
        // Se crea un div para la nota
        const noteDiv =  document.createElement('div');
        noteDiv.classList.add('note');

        // Se agrega el contenido a la nota
        noteDiv.innerHTML += `
            <h3>${ note.title }</h3>
            <p>${ note.content }</p>
            <button onclick="deleteNote(${index})">Eliminar</button>
        `;

        // Se agrega la nota al contenedor
        notesContainer.appendChild(noteDiv);
    });
}

// Funcion para eliminar una nota
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Eliminar la nota por su indice
    notes.splice(index, 1);

    // Se aguarda el nuevo array sin la nota que se elimino
    localStorage.setItem('notes', JSON.stringify(notes));

    // Se actualiza la vista
    showNotes();
}