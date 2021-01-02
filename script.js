let library = [];
const display = document.querySelector(".book-list");
const form = document.querySelector(".form");

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages + " pages";
    this.hasRead = hasRead;
    this.order = null; 

}

Book.prototype.changeStatus = function () {
    if(this.hadRead === "Read") {
        this.hadRead = "Not Read";
    } else {
        this.hadRead = "Read";
    }
};

function addBookToLibrary(book) {
    library.push(book);
    book.order = library.length - 1;
}

function updateStatus(status) {
    console.log(status.textContent);
    if(status.textContent === "Read") {
        status.textContent = "Not Read";
    } else if (status.textContent === "Not Read") {
        status.textContent = "Read";
    }

}

function displayBook(item) {

    const entry = document.createElement("div");
    entry.classList.toggle("book");

    const list = document.createElement("ol");

    const titleCell = document.createElement("li");
    const authorCell = document.createElement("li");
    const pagesCell = document.createElement("li");
    const hasReadCell = document.createElement("li");

    const titleText = document.createTextNode(item.title);
    const authorText = document.createTextNode(item.author);
    const pagesText = document.createTextNode(item.pages);
    const hasReadText = document.createTextNode(item.hasRead);


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
        updateStatus(hasReadCell);
        // change book property instead later
    });

    remove.addEventListener("click", function () {
        library.splice(item.order, 1);
        // to simulate - temporary
        entry.style.display = "none";
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
    library.forEach(function (item) {
        displayBook(item);
    });
}

function updateLibrary() {
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



let b = new Book("Hunter x Hunter", "Yoshihiro Togashi", 100, "Read");
let c = new Book("Harry Potter", "JK Rowling", 600, "Not Read");
addBookToLibrary(b);
addBookToLibrary(c);

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
    updateLibrary();
    form.reset();
    modal.style.display = "none";
});

