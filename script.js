let library = [];
const display = document.querySelector(".book-list");
const form = document.querySelector(".form");

function updateLocalStorage() {
    window.localStorage.setItem("books", JSON.stringify(library));
}

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages + " pages";
    this.hasRead = hasRead;

}

function updateStatus(book, hasReadCell) {
    if (book.hasRead === "Read") {
        book.hasRead = "Not Read";
    } else {
        book.hasRead = "Read";
    }
    updateLocalStorage();
    hasReadCell.textContent = book.hasRead;
    
};

function addBookToLibrary(book) {
    library.push(book);
    updateLocalStorage();
}

function removeBookFromLibrary(book, entry) {
    let index = library.indexOf(book);
    library.splice(index, 1);
    updateLocalStorage();
    entry.style.display = "none";
}

function displayBook(book) {

    const entry = document.createElement("div");
    entry.classList.toggle("book");

    const list = document.createElement("ol");

    const titleCell = document.createElement("li");
    const authorCell = document.createElement("li");
    const pagesCell = document.createElement("li");
    const hasReadCell = document.createElement("li");

    const titleText = document.createTextNode(book.title);
    const authorText = document.createTextNode(book.author);
    const pagesText = document.createTextNode(book.pages);
    const hasReadText = document.createTextNode(book.hasRead);


    const changeCell = document.createElement("div");
    const removeCell = document.createElement("div");
    const changeStatus = document.createElement("button");
    const remove = document.createElement("button");
    const changeText = document.createTextNode("Change Status");
    const removeText = document.createTextNode("x");

    changeStatus.classList.toggle("change-status");
    remove.classList.toggle("remove-btn");


    changeStatus.addEventListener("click", function () {
        updateStatus(book, hasReadCell);
    });

    remove.addEventListener("click", function () {
        removeBookFromLibrary(book, entry);
    });

    changeStatus.appendChild(changeText);
    remove.appendChild(removeText);

    changeCell.appendChild(changeStatus);
    removeCell.appendChild(remove);

    titleCell.appendChild(titleText);
    authorCell.appendChild(authorText);
    pagesCell.appendChild(pagesText);
    hasReadCell.appendChild(hasReadText);

    titleCell.classList.toggle("title");
    authorCell.classList.toggle("author");
    pagesCell.classList.toggle("pages");
    hasReadCell.classList.toggle("read");

    list.appendChild(titleCell);
    list.appendChild(authorCell);
    list.appendChild(pagesCell);
    list.appendChild(hasReadCell);

    entry.appendChild(removeCell);
    entry.appendChild(list);
    entry.appendChild(changeCell);
    display.appendChild(entry);

}

function displayLibrary() {

    library.forEach(function (book) {
        displayBook(book);
    });


}

function createBook() {
    let progress;
    if (form.hasRead.checked) {
        progress = "Read";
    } else {
        progress = "Not Read";
    }
    let newBook = new Book(form.title.value, form.author.value, form.pages.value, progress);
    addBookToLibrary(newBook);
    displayBook(newBook);
}


library = JSON.parse(window.localStorage.getItem('books'));
if (library !== null) {
    displayLibrary();
} else {
    library = [];
}


const addBtn = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");

addBtn.addEventListener("click", () => {
    modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", function () {
    createBook();
    form.reset();
    modal.style.display = "none";
});


