const form = document.querySelector('form');
let infos = getInfo() || [];
const tbody = document.querySelector('tbody');
const modal = document.querySelector('.modal');

function renderList() {
  tbody.innerHTML = infos
    .map((info) => {
      return createInfo(info.title, info.author, info.isbn, info.id);
    })
    .join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  renderList();
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
  const info = {
    title: title.value,
    author: author.value,
    isbn: isbn.value,
    id: id,
  };
  infos.push(info);
  setInfo();
  renderList();
  displayModal('success', 'some info added successfully');

  title.value = '';
  author.value = '';
  isbn.value = '';
});

function createInfo(title, author, isbn, id) {
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
      infos = infos.filter((info) => info.id != id);
      setInfo();
      renderList();
      displayModal('success', 'info removed successfully');
    }
  }
});

function setInfo() {
  localStorage.setItem('infos', JSON.stringify(infos));
}

function getInfo() {
  return JSON.parse(localStorage.getItem('infos'));
}

function displayModal(type, message) {
  modal.classList.add('open', type);
  modal.textContent = message;
  setTimeout(() => {
    modal.classList.remove('open', type);
  }, 2000);
}
