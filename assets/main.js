let user = JSON.parse(localStorage.getItem("authenticated-user"));

var arrList = [];
var isUpdate = null;
var statusText = "Today";
var isCompleted = false;
var container = document.getElementById("container");

var btn = document.getElementById("btnForm");
btn.innerText = "Add";

var dateNow = Date.now();
var passInArray = new Date(dateNow);
console.log(passInArray);

if (user) {
  console.log(user)
  let signOutBtn = document.getElementById("btnSignout");
  signOutBtn.innerText = "SignOut";
  signOutBtn.addEventListener('click', signOut)

  let name = document.getElementById("userData");
  name.innerText = user.username;
}

function signOut() {
  localStorage.removeItem("authenticated-user");
  window.location.href = "./login.html"
}

function addItem() {
  event.preventDefault();
  var listItem = document.getElementById("additem");

  if (isUpdate !== null) {
    return updateItem();
  }

  if (!arrList.includes(listItem.value) || listItem.value !== "") {

    var toDoItems = {
      created_at: passInArray.toLocaleDateString(),
      value: listItem.value,
      isCompleted: isCompleted,
      user: user.email,
    }
    arrList.push(toDoItems);
    localStorage.setItem('items', JSON.stringify(arrList));
    listItem.value = "";
    showList();
  } else if (listItem.value == "") {
    alert('Item is required');
  } else {
    alert('Item is already exits or');
  }
}

var getStorageItem = localStorage.getItem('items');
if (getStorageItem) {
  arrList = JSON.parse(getStorageItem);
}
showList();

function showList() {
  container.innerHTML = "";

  console.log('Auth', user);

  let filteredData = arrList.filter(data => {
    return data.user === user.email
  })
  console.log(filteredData)

  filteredData.forEach(function ({ value, created_at, isCompleted }, index) {
    var div = document.createElement("div");
    div.classList.add("list");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";

    if (created_at === passInArray.toLocaleDateString()) {
      statusText = "Today"
    } else if (created_at !== passInArray.toLocaleDateString()) {
      statusText = created_at
    }

    var displayItems = document.createElement("li");
    displayItems.innerHTML = value;
    if (isCompleted) {
      displayItems.style.textDecoration = "line-through";
    }
    div.appendChild(displayItems);

    var innerDiv = document.createElement("div");
    innerDiv.classList.add("btnsDiv")

    var displayDate = document.createElement("span");
    displayDate.innerHTML = statusText;
    innerDiv.appendChild(displayDate);

    var btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.classList.add("editbtn");
    if (isCompleted) {
      btnEdit.disabled = true;
      btnEdit.style.opacity = "0.6";
    }
    innerDiv.appendChild(btnEdit);

    var btnStatus = document.createElement("button");
    btnStatus.innerText = "Complete";
    btnStatus.classList.add("statusbtn");
    if (isCompleted) {
      btnStatus.disabled = true;
      btnStatus.style.opacity = "0.6";
    }
    innerDiv.appendChild(btnStatus);

    var btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnDelete.classList.add("deletebtn");
    if (!isCompleted) {
      btnDelete.disabled = true;
      btnDelete.style.opacity = "0.6";
    }
    innerDiv.appendChild(btnDelete);

    btnDelete.addEventListener('click', function () {
      deleteItem(index);
    });

    btnEdit.addEventListener('click', function () {
      editItem(index);
    });

    btnStatus.addEventListener('click', function () {
      updateStatus(index)
    });

    div.appendChild(innerDiv);

    container.appendChild(div);
  });
}

function editItem(indexValue) {
  var listItem = document.getElementById("additem");
  listItem.value = arrList[indexValue].value;

  btn.innerText = "Update";

  isUpdate = indexValue
  console.log('isUpdated', isUpdate)
}

function updateStatus(indexValue) {
  isUpdate = indexValue
  var oldValue = arrList[isUpdate];
  oldValue.isCompleted = true;
  arrList.splice(isUpdate, 1, oldValue);
  localStorage.setItem('items', JSON.stringify(arrList));
  showList();
  console.log(isCompleted);
}

function updateItem() {
  var oldValue = arrList[isUpdate];

  var listItem = document.getElementById("additem");
  oldValue.value = listItem.value;

  arrList.splice(isUpdate, 1, oldValue);
  localStorage.setItem('items', JSON.stringify(arrList));

  listItem.value = "";
  showList();

  btn.innerText = "Add";

  isUpdate = null;
}

function deleteItem(indexValue) {
  arrList.splice(indexValue, 1);
  localStorage.setItem('items', JSON.stringify(arrList));
  showList();
}