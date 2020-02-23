/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const students = document.getElementsByClassName("student-item");
const page = document.getElementsByClassName("page")[0];
const pages = Math.ceil(students.length / 10);
var currentPage = 1;


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
function showPage(page){
   console.log(page);
   for( let i = 0; i < students.length; i++){
      if(i>= (page - 1) * 10 && i<page*10){
         students[i].style.display = "block";
      }
      else{
         students[i].style.display = "none";
      }
   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(pages){
   let links = document.createElement("ul","id=1");
   links.className = "pagination";
   for(let i = 1 ; i <= 6; i++ ){
      let li = document.createElement('li');
      let a = document.createElement('a')
      a.innerText = i;
      a.id = i;
      if(i == currentPage){
         a.className = "active";
      }
      a.onclick = (e) => handleClick(e);
      li.append(a);
      links.append(li);
   }
   page.appendChild(links);
}

function handleClick(event){
   showPage(event.target.id);
   event.target.className = "active";
   document.getElementById(currentPage).classList.remove("active");
   currentPage = event.target.id;
}
showPage(currentPage);
appendPageLinks(pages);



// Remember to delete the comments that came with this file, and replace them with your own code comments.