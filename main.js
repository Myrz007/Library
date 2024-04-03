const books   = document.querySelector('#books');
const dialog  = document.querySelector('dialog');
const newBook = document.getElementById('newbook');
const form    = document.querySelector('form');
const title   = document.querySelector('#title');
const author  = document.querySelector('#author');
const pages   = document.querySelector('#pages');
const read    = document.querySelector('#read');
const submit  = document.querySelector('input[type=submit]');
const cancel  = document.querySelector('input[type=button]');

class Book {
    constructor(title, author, pages, read = false) {
        this.title  = title;
        this.author = author;
        this.pages  = pages;
        this.read   = read;
    }
}

const myLibrary = [
    new Book('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', 223, true),
    new Book('The Lord Of The Rings - The Fellowship of the Ring', 'J. R. R. Tolkien', 423),
    new Book('Hunger Games', 'Suzanne Collins', 399, true)
];

const addBookToLibrary = (title, author, pages, readStatus) => {
    myLibrary.push(new Book(title, author, pages, readStatus));
    return;
}

const changeReadStatus = (bookObject) => {
    return `${bookObject.read ? 'R' : 'Not r'}ead`;
}

const changeButtonBackgroundColor = (button, bookObject) => {
    return `rgb(${bookObject.read ? '35, 220, 21' : '239, 239, 239'})`;
}

const createBookElement = (bookObject) => {
    const bookElement     = document.createElement('div');
    const title           = document.createElement('h3');
    const author          = document.createElement('h4');
    const pages           = document.createElement('p');
    const buttonContainer = document.createElement('div');
    const readButton      = document.createElement('button');
    const deleteButton    = document.createElement('button');

    title.textContent  = bookObject.title || 'Unknown title';
    author.textContent = bookObject.author || 'Unknown author';
    pages.textContent  = `${bookObject.pages || 0} page${bookObject.pages === '1' ? '' : 's'}`;

    readButton.className             = 'read';
    readButton.textContent           = changeReadStatus(bookObject);
    readButton.style.backgroundColor = changeButtonBackgroundColor(readButton, bookObject);

    readButton.addEventListener('click', () => {
        myLibrary[bookObject.index].read = !myLibrary[bookObject.index].read;
        readButton.textContent           = changeReadStatus(bookObject);
        readButton.style.backgroundColor = changeButtonBackgroundColor(readButton, bookObject);
    });

    deleteButton.className   = 'delete';
    deleteButton.textContent = 'X';

    deleteButton.addEventListener('click', () => {
        myLibrary.splice(bookObject.index, 1);
        displayBook();
    });

    buttonContainer.className = 'buttoncontainer';
    buttonContainer.append(readButton, deleteButton);

    bookElement.className = 'book';
    bookElement.append(title, author, pages, buttonContainer);

    return bookElement;
}

const displayBook= () => {
    const myLibraryLength = myLibrary.length;

    if (books.childElementCount) books.innerHTML = '';
 
    for (let i = 0; i < myLibraryLength; i++) {
        const book = myLibrary[i];

        book['index'] = i;
        books.appendChild(createBookElement(book));
    }

    return;
}

displayBook();

newBook.addEventListener('click', () => dialog.showModal());

submit.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary(title.value, author.value, Number(pages.value), read.checked);
    form.reset();
    dialog.close();
    displayBook();
});

cancel.addEventListener('click', () => dialog.close());
