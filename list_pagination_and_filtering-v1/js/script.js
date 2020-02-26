/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
 
//get the page container in order to add content
const page = document.getElementsByClassName("page")[0]; 

//get the header section to add the search box and button
const header = document.getElementsByClassName("page-header")[0];

//get a list of all students and store it in a variable
const students = document.getElementsByClassName("student-item");

//track which page is currently displayed
var currentPage = 1;

/*check if we are in search mode or just browsing the list
 it is used in combination with the current page variable 
 so that we always go back to the page we were looking at
after we are done searching */
var isSearch = false;

//Function to reset the view whenever we start or finish searching.
const reset = () => {
  //use a loop to hide everything initially so that the search function
  //can display the filtered items only
  for (let student of students) {
    student.style.display = "none";
  }
  //if there is an error message from a previous search remove it
  if (page.getElementsByClassName("error")[0]) page.getElementsByClassName("error")[0].remove();

  //if there was a pagination on the page remove it
  if (document.getElementsByClassName("pagination")[0]) document.getElementsByClassName("pagination")[0].remove();
}


//Function that takes page number and list of students and displays the 
//items that correspond to the page number
const showPage = (page, students) => {
  // loop through the list of students and display the students that are within
  // the current page range and hide the rest
  for (let i = 0; i < students.length; i++) {
    if (i >= (page - 1) * 10 && i < page * 10){
      students[i].style.display = "block";
    } else {
      students[i].style.display = "none";
    }
  }
}

//function to add the pagination at the bottom of the page
const appendPageLinks = students => {
  //determine the number of pages assuming we only display 10 results per page  
  let pages = Math.ceil(students.length / 10);
  //create a unordered list to contain the page links and give it a class name 
  //pagination to style it
  let links = document.createElement("ul");
  links.className = "pagination";
  //loop to create each page link with an id
  for (let i = 1; i <= pages; i++) {
    let li = document.createElement("li"); //create list item
    let a = document.createElement("a"); //create anchor tag
    a.innerText = i; //anchor tag text will show page number
    a.id = i; //id will also get the page number
    //if we are in search mode make sure that we are starting from page 1
    if(isSearch){
        if( i === 1){
            a.className = "active";
        }
    }
    //if we are not searching set the active link to show where we were previously
    else if (i == currentPage) {
      a.className = "active";
    }
    //add the event handler and pass the event object
    a.onclick = event => handleNavigate(event);

    //add the anchor tag to the list item
    li.append(a);

    // add the list item to the links element which is an unordered list
    links.append(li);
  }
  //finally add the link to the bottom of the page
  page.appendChild(links);
}

//function to add a search box and button at the top of the page
const addSearchBox = () => {
  let input = document.createElement("input"); //create input element
  input.type = "text";//set type of input
  input.placeholder = "Search for students..."; //set the place holder
  input.onkeyup = event => search(event.target.value); //add event listener when the user types
  let button = document.createElement("button"); //create a button
  button.innerText = "Search";//set text of button
  //add event listener to search when user clicks
  button.onclick = event => search(event.target.previousElementSibling.value);

  //create a div to place textbox and search button
  let div = document.createElement("div");
  div.className = "student-search";

    
  div.appendChild(input);
  div.appendChild(button);

  //finally add the search box to the header section(top of page)
  header.appendChild(div);
}

//function that searches the list of students and show results
//that match the search text passed in as an argument
const search = searchText => {
  
  let searchResults = []; //holds students that match the search text
  reset(); //reset the view
  if (searchText != "") {
    isSearch = true; //if the text box is not empty it is in search mode

    //loop through students to find matches to search text
    for (let i = 0; i < students.length; i++) {
      if (
        students[i].getElementsByTagName("h3")[0].innerText.includes(searchText)
      ) {
        searchResults.push(students[i]);
      }
    }
    //if there are matches display them
    if (searchResults.length != 0) {
      showPage(1, searchResults);
      appendPageLinks(searchResults);
    } 
    //otherwise display a no results message
    else {
      let error = document.createElement("div");
      error.className = "error";
      error.innerText = "No results";
      page.appendChild(error);
    }
  } 
  //if search box is empty it is not in search mode so display the page the user was on
  //before search was started
  else {
    isSearch = false;
    showPage(currentPage, students);
    appendPageLinks(students);
  }
}

//event handler that fires if the user types in the search box or
//presses the search button
const handleNavigate= event => {
  showPage(event.target.id, students);
  event.target.className = "active"; //make the page link pressed appear active
  if (document.getElementsByClassName('active')[0])
    //if there was a previouisly active page display it as inactive
    document.getElementById(currentPage).classList.remove("active"); 
  //if we are not in search mode remember which page we are on  
  if(!isSearch) currentPage = event.target.id;
}

//Show initial page
showPage(1, students);

//add initial pagination
appendPageLinks(students);

//add search box to page
addSearchBox();