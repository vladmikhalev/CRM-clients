
// Глобальные переменные
const formAdd = document.getElementById('form__add');
const formEdit = document.getElementById('form__edit');
const btnAddContact = document.getElementById('btn-addContact');
const contactsConatiner = document.getElementById('contacts-conatiner');
const tbody = document.getElementById('tbody');
const inputSurnameValue = document.getElementById('clientSurname')
const inputNameValue = document.getElementById('clientName')
const inputLastNameValue = document.getElementById('clientLastName')
const modalTitle = document.querySelector('.modal-title');
const spiner = document.getElementById("spiner");
spiner.style.color = "#9873FF";

let clientObj = {};
let countAInputContact = 0;
let countInputContact = 0;
let contactArr = [];










// Создать импут добавления контакта
function createInputContact() {
  const contactsWrapper = document.createElement('div');
  contactsWrapper.classList.add('contact-wrapper', 'contact');

  const contactSelect = document.createElement('select');
  contactSelect.classList.add('form-select', 'contact__select');
  contactSelect.setAttribute('aria-label', 'Пример выбора по умолчанию')
  // contactSelect.setAttribute('name', 'contactType');

  const contactOption1 = document.createElement('option');
  contactOption1.classList.add('contact__option');
  contactOption1.setAttribute('value', 'Телефон');
  contactOption1.textContent = 'Телефон';
  // contactOption1.setAttribute('name', 'type');

  const contactOption2 = document.createElement('option');
  contactOption2.classList.add('contact__option');
  contactOption2.setAttribute('value', 'Доп. телефон');
  contactOption2.textContent = 'Доп. телефон';
  // contactOption2.setAttribute('name', 'type');

  const contactOption3 = document.createElement('option');
  contactOption3.classList.add('contact__option');
  contactOption3.setAttribute('value', 'Email');
  contactOption3.textContent = 'Email';
  // contactOption3.setAttribute('name', 'type');

  const contactOption4 = document.createElement('option');
  contactOption4.classList.add('contact__option');
  contactOption4.setAttribute('value', 'Vk');
  contactOption4.textContent = 'Vk';
  // contactOption4.setAttribute('name', 'type');

  const contactOption5 = document.createElement('option');
  contactOption5.classList.add('contact__option');
  contactOption5.setAttribute('value', 'Facebook');
  contactOption5.textContent = 'Facebook';
  // contactOption5.setAttribute('name', 'type');

  const contactInput = document.createElement('input');
  contactInput.classList.add('contact__input');
  contactInput.setAttribute('placeholder', 'Введите данные контакта');
  contactInput.setAttribute('type', 'text');
  // contactInput.setAttribute('name', 'contactValue');

  const contactBtnCancel = document.createElement('button');
  contactBtnCancel.classList.add('btn-reset', 'contact__btn-cancel');
  contactBtnCancel.setAttribute('type', 'button');
  contactBtnCancel.addEventListener('click', function () {
    btnAddContact.style.display = "flex";
    contactsWrapper.remove();
  })

  const contactSVG = document.createElement('svg')
  contactSVG.setAttribute('width', '12');
  contactSVG.setAttribute('height', '12');
  contactSVG.setAttribute('viewBox', '0 0 12 12');
  contactSVG.setAttribute('fill', 'none');
  contactSVG.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const contactPath = document.createElement('path')
  contactPath.setAttribute('d', 'M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z');
  contactPath.setAttribute('fill', '#B0B0B0');


  contactSVG.append(contactPath);
  contactBtnCancel.append(contactSVG);
  contactSelect.append(contactOption1);
  contactSelect.append(contactOption2);
  contactSelect.append(contactOption3);
  contactSelect.append(contactOption4);
  contactSelect.append(contactOption5);
  contactsWrapper.append(contactSelect);
  contactsWrapper.append(contactInput);
  contactsWrapper.append(contactBtnCancel);

  return {
    contactsWrapper,
    contactSelect,
    contactInput,
    contactBtnCancel
  };
}

// Создать объект ФИО нового студента из формы
function createClientObj(form) {
  clientObj = {};
  const { elements } = form

  Array.from(elements)
    .filter((item) => !!item.name)
    .forEach((element) => {
      clientObj[element.name] = element.value
    })
  console.log(clientObj)
  return clientObj
}


// Создает массив объектов по контактам с валидацией
function getContactArr() {
  let contactArr = [];
  const contactWrapper = formAdd.querySelectorAll('.contact-wrapper')
  contactWrapper.forEach(e => {
    const contactType = e.querySelector('.contact__select')
    const contactValue = e.querySelector('.contact__input')
    const contactObj = {
      type: contactType.value,
      value: contactValue.value,
    }

    contactArr.push(contactObj)
  })
  return contactArr
}


// Отправить данные студента на сервер
async function pushClient(contact, clientObj) {
  spiner.style.display = "block";
  const response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({

      name: clientObj.name,
      surname: clientObj.surname,
      lastName: clientObj.lastName,
      contacts: contact,

    })
  });
  spiner.style.display = "none";
  return response


}

// Отправить изменения студента на сервер
async function editClient(contact, clientObj, id) {
  spiner.style.display = "block";
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({

      name: clientObj.name,
      surname: clientObj.surname,
      lastName: clientObj.lastName,
      contacts: contact,

    })
  });
  spiner.style.display = "none";
  // let data = await response.json();

  // console.log(data)
  return response


}




// Запрос на сервер для получения данных по клиентам
async function getData() {
  spiner.style.display = "block";
  const response = await fetch('http://localhost:3000/api/clients/');
  spiner.style.display = "none";
  let data = await response.json();
  // console.log(data)
  return data
}
let data = await getData()
// console.log(data)





// Запрос на сервер для получения данных по id
async function getDataID(id) {
  spiner.style.display = "block";
  const response = await fetch(`http://localhost:3000/api/clients/${id}`);
  spiner.style.display = "none";
  let data = await response.json();
  // console.log(data)
  return data
}
// getData()


// async function searchhh(string) {
//   spiner.style.display = "block";
//   const response = await fetch(`http://localhost:3000/api/clients?search=${string}`);
//   spiner.style.display = "none";
//   let data = await response.json();
//   console.log(data)
//   // return data
// }
// searchhh()
// let ppp = await searchhh()
// console.log(ppp)






// Порядок сортировки
let ordASC = -1;

// Сортируемое поле
let ordField = '';

// Сортировка столбца id
function sorterID(a, b) {
  console.log(ordASC)
  // console.log(b.id)
  return a.id.localeCompare(b.id) * ordASC;
}

// Сортировка столбца фио
function sorterFullName(a, b) {
  return getFIO(a).localeCompare(getFIO(b)) * ordASC;
}

// Сортировка стлбца дата создания
function sorterDateCreate(a, b) {
  return (new Date(a.createdAt) - new Date(b.createdAt)) * ordASC;
}

// Сортировка стлбца дата редактирвоания
function sorterDateEdit(a, b) {
  return (new Date(a.updatedAt) - new Date(b.updatedAt)) * ordASC;
}


// Выбор порядка сорировки
function selectOrd(id) {
  if (id === ordField) {
    ordASC *= -1;
  } else {
    ordField = id;
    ordASC = 1;
  }
}

// Функция сортировки 
async function order(data, e) {
  // console.log(e)
  // console.log(data)
  if (e && e.id) {
    switch (e.id) {
      case 'id':
        selectOrd(e.id);
        data = data.sort(sorterID);
        break;
      case 'fio':
        selectOrd(e.id);
        data = data.sort(sorterFullName);
        break;
      case 'dateCreate':
        selectOrd(e.id);
        data = data.sort(sorterDateCreate);
        break;
      case 'dateEdit':
        selectOrd(e.id);
        data = data.sort(sorterDateEdit);
        break;
    }
    renderClients(data)
  }
}

// сортировка по клику на заголовок столбца
const header = document.getElementsByTagName('th');
for (let i = 0; i < header.length; i++) {
  // header[i].classList.add('th-pointer')
  header[i].addEventListener('click', () => {
    console.log(event.currentTarget)
    const arrowSort = event.currentTarget.querySelector('.head__arrow');
    arrowSort.classList.toggle('head__arrow-rotate');
    console.log(arrowSort)
    order(data, event.currentTarget)
  });
}










//Поиск по студентам


let searchRow = document.getElementById('search');


// Фильтрация по ФИО
function filterRow(arr, input) {

  let filterArray = [];
  let clientsArrCopy = [...arr];

  for (let item of clientsArrCopy) {

    if (getFIO(item).toLowerCase().trim().includes(input.toLowerCase().trim())) {
      filterArray.push(item);
    } else if (item.id.toLowerCase().trim().includes(input.toLowerCase().trim())) {
      filterArray.push(item);
    }

  }

  return filterArray
}






// Вызов функции фильтрации
function filter(array) {
  console.log('ПОИСК')
  console.log(data)
  let clientsArrCopy = [...array]
  clientsArrCopy = filterRow(clientsArrCopy, searchRow.value)

  // data = clientsArrCopy;
  console.log(clientsArrCopy)
  renderClients(clientsArrCopy);
}

// Функции по задерке ввода данных в строку поиска и отмена перезагрузки по сабмиту
headerForm.addEventListener('submit', e => {
  e.preventDefault();
})
let timerId;
headerForm.addEventListener('input', e => {
  if (searchRow.value !== 0) {
    e.preventDefault();
    clearTimeout(timerId);
    timerId = setTimeout(filter, 300, data);
  }
})













// Добавляем элемент и стили для вывода ошибки валидации 
let error = document.createElement('div')
error.classList.add('error');

// Валидация ФИО
function validateInput(inputValue) {

  formAdd.addEventListener('input', () => {
    error.remove();
    inputValue.classList.remove('contact__input-validate');
  })
  const inputValueFilter = inputValue.value.toLowerCase().trim();
  if (inputValueFilter !== "" && /^[а-я-]{3,20}$/.test(inputValueFilter)) {
    console.log('true');
    return true;
  } else {
    error.innerHTML = 'Ошибка: Пожалуйста заполните поле без пробелов и других знаков'
    contactsConatiner.after(error)
    inputValue.focus();
    inputValue.classList.add('contact__input-validate');
    console.log('false');
    return false;
  }
}



// Валидация инпута при вводе номера телефона
function validateContactNumber(type, value) {

  formAdd.addEventListener('input', () => {
    value.classList.remove('contact__input-validate');
    contactsConatiner.classList.remove('contacts-conatiner-validate');
    error.remove();
  })

  if (type === 'Телефон') {
    if (value.value !== "" && /^[\+7]{2}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/.test(value.value)) {

      return true
    } else {
      error.innerHTML = 'Ошибка: Пожалуйста заполните номер в формате +7 (ххх) ххх-хх-хх';
      contactsConatiner.after(error);
      value.focus();
      value.classList.add('contact__input-validate');
      contactsConatiner.classList.add('contacts-conatiner-validate');
      return false
    }
  } else {
    return false
  }
}

// Валидация инпута при вводе другого номера телефона
function validateContactOtherNumber(type, value) {
  formAdd.addEventListener('input', () => {
    error.remove();
    value.classList.remove('contact__input-validate');
    contactsConatiner.classList.remove('contacts-conatiner-validate');
  })
  if (type === 'Доп. телефон') {
    if (value.value !== "" && /^[\+7]{2}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/.test(value.value)) {

      return true
    } else {
      error.innerHTML = 'Ошибка: Пожалуйста заполните номер в формате +7 (ххх) ххх-хх-хх';
      contactsConatiner.after(error);
      value.focus();
      value.classList.add('contact__input-validate');
      contactsConatiner.classList.add('contacts-conatiner-validate');
      return false
    }
  } else {
    return false
  }
}

// Валидация инпута при вводе Email
function validateContactEmail(type, value) {
  formAdd.addEventListener('input', () => {
    error.remove();
    value.classList.remove('contact__input-validate');
    contactsConatiner.classList.remove('contacts-conatiner-validate');
  })
  if (type === 'Email') {
    if (value.value !== "" && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value.value)) {

      return true
    } else {
      error.innerHTML = 'Ошибка: Пожалуйста введите корректный Email';
      contactsConatiner.after(error);
      value.focus();
      value.classList.add('contact__input-validate');
      contactsConatiner.classList.add('contacts-conatiner-validate');
      return false
    }
  } else {
    return false
  }
}

// Валидация инпута при вводе адреса Vk
function validateContactVk(type, value) {
  formAdd.addEventListener('input', () => {
    error.remove();
    value.classList.remove('contact__input-validate');
    contactsConatiner.classList.remove('contacts-conatiner-validate');
  })
  if (type === 'Vk') {
    if (value.value !== "" && /^(http:\/\/|https:\/\/)?(www.)?(vk\.com|vkontakte\.ru)\/(id\d|[a-zA-Z0-9_.])+$/.test(value.value)) {
      return true
    } else {
      error.innerHTML = 'Ошибка: Пожалуйста введите корректный адресс Vk';
      contactsConatiner.after(error);
      value.focus();
      value.classList.add('contact__input-validate');
      contactsConatiner.classList.add('contacts-conatiner-validate');
      return false
    }
  } else {
    return false
  }
}




// Валидация инпута при вводе адреса Vk
function validateContactFacebook(type, value) {
  formAdd.addEventListener('input', () => {
    error.remove();
    value.classList.remove('contact__input-validate');
    contactsConatiner.classList.remove('contacts-conatiner-validate');
  })
  if (type === 'Facebook') {
    if (value.value !== "" && /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/?/.test(value.value)) {
      return true
    } else {
      error.innerHTML = 'Ошибка: Пожалуйста введите корректный адресс Facebook';
      contactsConatiner.after(error);
      value.focus();
      value.classList.add('contact__input-validate');
      contactsConatiner.classList.add('contacts-conatiner-validate');
      return false
    }
  } else {
    return false
  }
}



// Валидация всех строк добавления контактов 
function validateContacts() {
  let answerArr = []
  let contactWrapper = formAdd.querySelectorAll('.contact-wrapper')
  contactWrapper.forEach(e => {
    const contactType = e.querySelector('.contact__select')
    const contactValue = e.querySelector('.contact__input')

    let answerValid = validateContactNumber(contactType.value, contactValue) || validateContactOtherNumber(contactType.value, contactValue) || validateContactEmail(contactType.value, contactValue) || validateContactVk(contactType.value, contactValue) || validateContactFacebook(contactType.value, contactValue);
    answerArr.push(answerValid)
  })
  if (answerArr.includes(false)) {
    answerArr = false;
  } else {
    answerArr = true;
  }
  // console.log(answerArr)
  return answerArr;
}



// Валидация формы добавления. Вызывает все функции валидации инпутов
function validateForm(surname, name, lastname) {
  let isValid = validateInput(surname) && validateInput(name) && validateInput(lastname) && validateContacts();
  // console.log(validateContacts())
  console.log(isValid)
  return isValid;
}





// Собирает строку ФИО
function getFIO(data) {
  let fullName = `${data.surname} ${data.name} ${data.lastName}`
  return fullName
}



// Приводим время к нужному формату 
function getCorrectTime(time) {
  time = time.split(':');
  time = [time[0], time[1]];
  time = time.join(':');
  return time
}


// Активирует тултипы на старнице
var tooltipTriggerList = Array.prototype.slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})



// Создаем иконку контактов 
function createIconContact(contacts) {
  const iconWrapper = document.createElement('span');
  iconWrapper.classList.add('d-inline-block', 'body__contact-wrapper');
  iconWrapper.setAttribute("tabindex", "0");
  iconWrapper.setAttribute("data-bs-toggle", "tooltip");
  iconWrapper.setAttribute("title", "");
  iconWrapper.setAttribute("data-bs-original-title", `${contacts.type}: ${contacts.value}`);

  const icon = document.createElement('button');
  icon.setAttribute("type", "button");
  icon.setAttribute("disabled", "");

  switch (contacts.type) {
    case 'Email':
      icon.classList.add('body__contact', 'body__contact-email', 'btn', 'btn-reset');
      break;
    case 'Vk':
      icon.classList.add('body__contact', 'body__contact-vk', 'btn', 'btn-reset');
      break;
    case 'Facebook':
      icon.classList.add('body__contact', 'body__contact-fb', 'btn', 'btn-reset');
      break;
    case 'Телефон':
      icon.classList.add('body__contact', 'body__contact-phone', 'btn', 'btn-reset');
      break;
    case 'Доп. телефон':
      icon.classList.add('body__contact', 'body__contact-phone', 'btn', 'btn-reset');
      break;
    default:
      icon.classList.add('body__contact', 'body__contact-other', 'btn', 'btn-reset');
  }

  var tooltip = new bootstrap.Tooltip(iconWrapper)

  iconWrapper.append(icon)
  return iconWrapper
}


// Удаление строки клиента по клину на кнопку удаления 
async function onDelete(data, element) {
  console.log(`Удаление ${data.name}`)
  const modalDelete = document.getElementById('modal-btn-delete');
  console.log(modalDelete)
  modalDelete.addEventListener('click', () => {
    console.log(`Удаление ${data.name}`)
    element.remove();
    spiner.style.display = "block";
    fetch(`http://localhost:3000/api/clients/${data.id}`, {
      method: 'DELETE',
    });
    spiner.style.display = "none";
    location.reload();
  })
}










// Создаем строку нового клиента
function addNewClient(data) {
  const dateCreate = new Date(data.createdAt);
  const dateChange = new Date(data.updatedAt);

  const tableRow = document.createElement('tr');
  tableRow.classList.add('body__row');

  const tabelDataID = document.createElement('td');
  tabelDataID.classList.add('body__data-id');
  tabelDataID.textContent = data.id;

  const tabelDataFIO = document.createElement('td');
  tabelDataFIO.classList.add('body__data-style');
  tabelDataFIO.textContent = getFIO(data);

  const tabelDataCreate = document.createElement('td');
  tabelDataCreate.classList.add('body__data-style');
  const date1 = document.createElement('span');
  date1.classList.add('body__date');
  date1.textContent = dateCreate.toLocaleDateString();
  tabelDataCreate.append(date1);
  const timeCreate = document.createElement('span');
  timeCreate.classList.add('body__data-grey');
  timeCreate.textContent = getCorrectTime(dateCreate.toLocaleTimeString());
  tabelDataCreate.append(timeCreate);

  const tabelDataChange = document.createElement('td');
  tabelDataChange.classList.add('body__data-style');
  const date2 = document.createElement('span');
  date2.classList.add('body__date');
  date2.textContent = dateChange.toLocaleDateString();
  tabelDataChange.append(date2);
  const timeChange = document.createElement('span');
  timeChange.classList.add('body__data-grey');
  timeChange.textContent = getCorrectTime(dateChange.toLocaleTimeString());
  tabelDataChange.append(timeChange);

  const tabelDataContact = document.createElement('td');
  tabelDataContact.classList.add('body__data');
  if (data.contacts !== []) {
    for (const item of data.contacts) {

      const iconContact = createIconContact(item);
      tabelDataContact.append(iconContact);
    }
  }

  const tabelDataActions = document.createElement('td');
  tabelDataActions.classList.add('body__data');
  const btnChange = document.createElement('button');
  // btnChange.addEventListener('click', fillModalEdit(data));
  btnChange.addEventListener('click', () => {
    // spiner.style.display = "block";
    window.location.hash = data.id;
    console.log('Изменить')
    fillModalEdit(data, tableRow)
    // spiner.style.display = "none";
  });
  btnChange.classList.add('btn-reset', 'body__btn', 'body__change');
  btnChange.setAttribute('data-bs-target', '#exampleModal')
  btnChange.setAttribute('type', 'button')
  btnChange.setAttribute('data-bs-whatever', 'edit')
  btnChange.setAttribute('data-bs-toggle', 'modal')
  btnChange.textContent = 'Изменить';
  // const btnChangeLink = document.createElement('a');
  // btnChangeLink.href = ''

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn-reset', 'body__btn', 'body__delete');
  btnDelete.setAttribute('data-bs-target', '#deleteModal')
  btnDelete.setAttribute('type', 'button')
  btnDelete.setAttribute('data-bs-toggle', 'modal')
  btnDelete.textContent = 'Удалить';
  // const modalDelete = document.getElementById('modal-btn-delete');
  btnDelete.addEventListener('click', () => {
    console.log('удаление')
    onDelete(data, tableRow);
  })
  tabelDataActions.append(btnChange);
  tabelDataActions.append(btnDelete);

  tableRow.append(tabelDataID);
  tableRow.append(tabelDataFIO);
  tableRow.append(tabelDataCreate);
  tableRow.append(tabelDataChange);
  tableRow.append(tabelDataContact);
  tableRow.append(tabelDataActions);

  return tableRow
}


// Вывести всех клиентов в таблицу
async function renderClients(data) {
  tbody.innerHTML = '';
  for (const item of data) {
    let newClient = addNewClient(item);

    tbody.append(newClient)
  }

}




// Заполнение данными модального окна изменения клиента

async function fillModalEdit(client, element) {
  const exampleModal = document.getElementById('exampleModal')


  const dataID = await getDataID(client.id)
  console.log(dataID)

  modalTitle.textContent = 'Изменить данные';
  const modalID = document.createElement('span');
  modalID.classList.add('modal-id')
  modalID.textContent = `ID: ${dataID.id}`;
  modalTitle.append(modalID)

  const btnRemove = document.getElementById('btn-cancel');
  btnRemove.textContent = 'Удалить клиента';
  console.log(btnRemove.textContent)
  btnRemove.setAttribute('data-bs-target', '#deleteModal');
  btnRemove.setAttribute('data-bs-toggle', 'modal');
  btnRemove.addEventListener('click', () => {
      onDelete(client, element)
  })

  const surname = document.getElementById('clientSurname');
  surname.value = dataID.surname;

  const name = document.getElementById('clientName');
  name.value = dataID.name;

  const lastName = document.getElementById('clientLastName');
  lastName.value = dataID.lastName;

  if (dataID.contacts !== []) {
    let contactWrapper = formAdd.querySelectorAll('.contact-wrapper')
    contactWrapper.forEach(e => {
      e.remove()
    });

    for (const item of dataID.contacts) {

      const inputContact = addInputContact()
      inputContact.input.value = item.value;
      inputContact.select.value = item.type;
    }
  }



  exampleModal.addEventListener('hide.bs.modal', function () {
    modalTitle.textContent = 'Новый клиент';
    btnRemove.textContent = 'Отмена';
    btnRemove.removeAttribute('data-bs-target');
    modalID.remove();
    surname.value = '';
    name.value = '';
    lastName.value = '';
    window.location.hash = '';
    let contactWrapper = formAdd.querySelectorAll('.contact-wrapper')
    contactWrapper.forEach(e => {
      e.remove()
    });
  })



}




// создание инпута добавления контактов
function addInputContact() {

  let inputContact = createInputContact()


  contactsConatiner.prepend(inputContact.contactsWrapper);

  let select = inputContact.contactSelect;
  let input = inputContact.contactInput;
  return {
    select,
    input
  }
}



// // По клику добавляет строку с контактами студента
btnAddContact.addEventListener('click', () => {
  let contactWrapper = Array.from(formAdd.querySelectorAll('.contact-wrapper'))
  if (contactWrapper.length < 9) {
    console.log(contactWrapper.length)

    addInputContact()
  } else {
    addInputContact()
    btnAddContact.style.display = "none";
  }
})




const overlay = document.getElementById('overlay');

// Сабмит формы добавления студента
formAdd.addEventListener('submit', async (e) => {
  e.preventDefault();
 
  window.location.hash = '';
  console.log(data)
  if (validateForm(inputSurnameValue, inputNameValue, inputLastNameValue) !== true) {
    e.preventDefault();
  } else {
    overlay.style.display = 'block';
    e.preventDefault();
    let contactsArr = getContactArr();
    let clientObj = createClientObj(formAdd);
    let responseClient;
    if (modalTitle.textContent === 'Новый клиент') {
      responseClient = await pushClient(contactsArr, clientObj);
    } else {
      const IDclients = document.querySelector('.modal-id');
      let parseID = parseInt(IDclients.textContent.match(/\d+/))
      responseClient = await editClient(contactsArr, clientObj, parseID);
    }
    if (responseClient.statusText !== '') {
      if (responseClient.status === 200 || responseClient.status === 201) {
        renderClients(data);
        location.reload();
      } else {
        error.innerHTML = responseClient.statusText;
        contactsConatiner.after(error)
      }
    } else {
      error.innerHTML = 'Что-то пошло не так...';
      contactsConatiner.after(error)
    }

  }

})

const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

 function startDOM(data) {
  
  for (const item of data) {
    let newClient = addNewClient(item);
    tbody.append(newClient)
    if (window.location.hash !== '') {
      if (parseInt(window.location.hash.match(/\d+/)) == item.id) {
         fillModalEdit(item, newClient.tableRow)
        myModal.show()
      }
    }

  }
  renderClients(data);
}

document.addEventListener('DOMContentLoaded', startDOM(data))





