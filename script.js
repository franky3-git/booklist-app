const form = document.querySelector('form');
let books = getBooks() || [];
const tbody = document.querySelector('tbody');
const modal = document.querySelector('.modal');

//single book class
class Book {
  constructor(title, author, isbn, id) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.id = id;
  }
}

function renderBooks() {
  tbody.innerHTML = books
    .map((book) => {
      return createUIBook(book.title, book.author, book.isbn, book.id);
    })
    .join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  renderBooks();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.elements.title;
  const author = form.elements.author;
  const isbn = form.elements.isbn;
  if (!title.value || !author.value) {
    displayModal('failed', 'You must enter a title an and author');
    return;
  }

  const id = Date.now();

  books.push(new Book(title.value, author.value, isbn.value, id));

  rerender('book added successfully');

  title.value = '';
  author.value = '';
  isbn.value = '';
});

function createUIBook(title, author, isbn, id) {
  return `
   <tr>
      <td>${title}</td>
      <td>${author}</td>
      <td>${isbn}</td>
      <td data-id=${id}><i class=" btn-delete fas fa-times"></i></td>  
    </tr>
  `;
}

tbody.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn-delete')) {
    if (confirm('Are you sure you want to delete this info?')) {
      const id = e.target.parentElement.getAttribute('data-id');
      books = books.filter((book) => book.id != id);

      rerender('book removed successfully');
    }
  }
});

function setBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function getBooks() {
  return JSON.parse(localStorage.getItem('books'));
}

function displayModal(type, message) {
  modal.classList.add('open', type);
  modal.textContent = message;
  setTimeout(() => {
    modal.classList.remove('open', type);
  }, 2000);
}

function rerender(message) {
  setBooks();
  renderBooks();
  displayModal('success', message);
}
