/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const page = document.getElementsByClassName("page")[0];
const header = document.getElementsByClassName("page-header")[0];
const students = document.getElementsByClassName("student-item");
var view = "";
var currentPage = 1;

function reset() {
  for (let student of students) {
    student.style.display = "none";
  }
  if (page.getElementsByClassName("error")[0])
    page.getElementsByClassName("error")[0].remove();
  if (document.getElementsByClassName("pagination")[0])
    document.getElementsByClassName("pagination")[0].remove();
}

function showPage(page, students) {
  for (let i = 0; i < students.length; i++) {
    if (i >= (page - 1) * 10 && i < page * 10) {
      students[i].style.display = "block";
    } else {
      students[i].style.display = "none";
    }
  }
}

function appendPageLinks(students) {
  let pages = Math.ceil(students.length / 10);
  let links = document.createElement("ul");
  links.className = "pagination";
  for (let i = 1; i <= pages; i++) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.innerText = i;
    a.id = i;
    if (i == currentPage) {
      a.className = "active";
    }
    a.onclick = event => handleNavigate(event);
    li.append(a);
    links.append(li);
  }
  page.appendChild(links);
}

function handleNavigate(event) {
  showPage(event.target.id, students);
  event.target.className = "active";
  if (document.getElementById(currentPage))
    document.getElementById(currentPage).classList.remove("active");
  currentPage = event.target.id;
}

function addSearchBox() {
  let input = document.createElement("input");
  input.placeholder = "Search for students...";
  input.onkeyup = event => search(event.target.value);
  let button = document.createElement("button");
  button.innerText = "Search";
  button.onclick = event => search(event.target.previousElementSibling.value);

  let div = document.createElement("div");
  div.className = "student-search";

  div.appendChild(input);
  div.appendChild(button);
  header.appendChild(div);
}

function search(searchText) {
  let searchResults = [];
  reset();
  if (searchText != "") {
    for (let i = 0; i < students.length; i++) {
      if (
        students[i].getElementsByTagName("h3")[0].innerText.includes(searchText)
      ) {
        searchResults.push(students[i]);
      }
    }
    if (students.length != 0) {
      showPage(1, searchResults);
      appendPageLinks(searchResults);
    } else {
      let error = document.createElement("div");
      error.className = "error";
      error.innerText = "No results";
      page.appendChild(error);
    }
  } else {
    students = document.getElementsByClassName("student-item");
    showPage(currentPage, students);
    appendPageLinks(students);
  }
}

showPage(1, students);
appendPageLinks(students);
addSearchBox();
