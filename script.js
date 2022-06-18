const form = document.querySelector('form');
let infos = getInfo() || [];
const tbody = document.querySelector('tbody');
console.log(infos);

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
  const title = form.elements.title;
  const author = form.elements.author;
  const isbn = form.elements.isbn;

  e.preventDefault();
  if (!title.value || !author.value) {
    alert('You must enter a title an and ahthor');
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

  tbody.innerHTML += createInfo(title.value, author.value, isbn.value, id);

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
    const id = e.target.parentElement.getAttribute('data-id');
    infos = infos.filter((info) => info.id != id);
    setInfo();
    renderList();
  }
});

function setInfo() {
  localStorage.setItem('infos', JSON.stringify(infos));
}

function getInfo() {
  return JSON.parse(localStorage.getItem('infos'));
}
