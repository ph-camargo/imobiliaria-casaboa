/* ===================== PRINCIPAIS OBJETOS  =================================*/

let addNote = document.querySelector('#add-note'); // Botão para adicionar nota
let btnCloseModal = document.querySelector('#btn-close-modal'); // Fechar janela modal com os detalhes da nota
let modal = document.querySelector('#modal'); // Modal para edição das notas
let modalView = document.querySelector('#modal-view'); // Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes'); // Lista de divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); // Ícone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note"); // Ícone para fechar modal de edição de nota
let inputImageFile = document.querySelector("#input-image-file"); // Input para upload de imagem

/* ===================== EVENTOS  =================================*/

addNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.style.display = "block";
    addNote.style.display = "none";
    notes.style.display = "none";
});

btnCloseModal.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.style.display = "none";
    addNote.style.display = "block";
    notes.style.display = "flex";
});

btnSaveNote.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let imageUrl = await uploadImage(inputImageFile.files[0]); // Processa a imagem carregada
    data = {
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value,
        imageUrl: imageUrl || document.querySelector("#input-image").value // Salva URL ou mantém o anterior
    }
    saveNote(data);
});

btnCloseNote.addEventListener("click", (evt) => {
    evt.preventDefault();
    modal.style.display = "none";
    modalView.style.display = "none";
    notes.style.display = "flex";
    addNote.style.display = "block";
});

/* ===================== FUNÇÕES  =================================*/

// Função para processar o arquivo de imagem
const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve(""); // Se nenhum arquivo foi carregado, retorna vazio
            return;
        }

        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // Retorna a URL base64 da imagem
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const saveNote = (note) => {
    let notes = loadNotes();
    note.lastTime = new Date().getTime();

    if (note.id.trim().length < 1) { // Para remover espaços (sujeiras) usa-se o trim()
        note.id = new Date().getTime();
        notes.push(note);
        document.querySelector('#input-id').value = note.id;
    } else {
        notes.forEach((item, i) => {
            if (item.id == note.id) {
                notes[i] = note;
            }
        });
    }
    notes = JSON.stringify(notes); // Transformar objeto em texto novamente

    localStorage.setItem('notes', notes); // Colocar o texto no local storage

    listNotes();
};

// O restante do código permanece o mesmo...