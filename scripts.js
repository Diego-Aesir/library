const table = document.getElementById("table");
const dialog = document.querySelector("dialog");
const btn = document.querySelector("#button");
const sendForm = document.querySelector("#sendForm");

let myLibrary = [];
let title;
let author;
let pages;
let readed;


function Book(title, author, pages, readed) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readed = readed;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + ", " + this.readed;
    }
}

function addTableItem(book) {
    let tr = document.createElement("tr");
    let btn_delete = document.createElement("button");
    let btn_change_read_status = document.createElement("button");

    btn_delete.innerText = "Delete Book";
    btn_change_read_status.innerText = "Change Read Status";
    
    tr.innerHTML = book.info();

    table.appendChild(tr);
    tr.appendChild(btn_change_read_status);
    tr.appendChild(btn_delete);

    btn_change_read_status.addEventListener("click", () => {
        book.readed = book.readed === "Readed" ? "Not Readed" : "Readed";
        tr.innerHTML = book.info();
        tr.appendChild(btn_change_read_status);
        tr.appendChild(btn_delete);
    });

    btn_delete.addEventListener("click", () => {
        table.removeChild(tr);
        let position = myLibrary.indexOf(book);
        myLibrary.splice(position,1);
    });
}

function openDialog() {
    dialog.showModal();
}

function isEmpty(txtInput, inputName) {
    if(txtInput.value === "" || txtInput.value === null) {
        window.alert("There are some missing information on " + inputName + " !");
        return false;
    } else return true;
}

function checkAllInputs() {
    title = document.querySelector("#title");
    author = document.querySelector("#author");
    pages = document.querySelector("#pages");
    readed = document.querySelector("#readed");
    return isEmpty(title, "Book Name Label") &&
           isEmpty(author, "Author Label") &&
           isEmpty(pages, "Pages Label") &&
           isEmpty(readed, "Readed Label");
}

function getDialogInfo() {
    if(checkAllInputs()) {
        dialog.close();
        addBookToLibrary();
    }
}

function addBookToLibrary() {
    myLibrary[myLibrary.length-1] = new Book(title.value, author.value, pages.value, readed.value);
    addTableItem(myLibrary[myLibrary.length-1]);
}

btn.addEventListener("click", openDialog);
sendForm.addEventListener("click", getDialogInfo);