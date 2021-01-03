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


    const options = document.createElement("ol");
    const changeCell = document.createElement("li");
    const removeCell = document.createElement("li");
    const changeStatus = document.createElement("button");
    const remove = document.createElement("button");
    const changeText = document.createTextNode("Change Status");
    const removeText = document.createTextNode("Remove");

    changeCell.classList.toggle("option");
    removeCell.classList.toggle("option");
    changeStatus.classList.toggle("book-options");
    remove.classList.toggle("book-options");


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
    options.appendChild(changeCell);
    options.appendChild(removeCell);

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

    entry.appendChild(list);
    entry.appendChild(options);
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
displayLibrary();


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


