import { populateProject } from "./domPopulate";

let objectArr = [];
let array = [

{title: '', description: '', deadline: '', toDo: Array(0), dataNum: '0'},
{title: '', description: '', deadline: '', toDo: Array(0), dataNum: '1'}

];

let counter = 0;


let addProject = (() => {
  let modal = document.getElementById("add-project");
  let addButton = document.getElementById("add");
  addButton.addEventListener("click", () => {
    
    modal.style.display = "block";
    
    window.onclick = function(e) {
        if (e.target == modal) {
          modal.style.display = "none";
        }
      }
  });
})();

function addToDo(dataNum) {

  let modal2 = document.getElementById("add-to-do");
  console.log(dataNum); // tracks dataNum correctly
  modal2.style.display = "block";
  let addTodo = "";
  window.onclick = function(e) {
        if (e.target == modal2) {
          modal2.style.display = "none";
        }
  }
      
  let form = document.getElementById("addToDoForm")
  console.log(dataNum); //also tracks dataNum correctly
        
  form.addEventListener("submit", logSubmit, false);
  
  function logSubmit(event) {
    
    event.preventDefault();
    
    let modal = document.getElementById("add-to-do");
    let toDo = document.getElementById("To-Do-Name").value;
    console.log(dataNum); // HERE IT HANGS ON TO THE PAST VALUE PERMANANTLY
    
    modal.style.display = "none";
    addTodo = objectArr.find((todos) => todos.dataNum === dataNum);
    addTodo.toDos.push(toDo);
    form.reset();
    console.log(objectArr);
    updateListdisplay(dataNum, addTodo);
    form.removeEventListener("submit", logSubmit, false);  
  };
   
};
  
function updateListdisplay(dataNum, addTodo) {
  console.log(addTodo.title)
 
  document.querySelectorAll('.to-do-form').forEach(Element => {
    
      let dataNum2 = Element.getAttribute('data-num')
      
 console.log(dataNum2);
 
 if (dataNum2 === dataNum)
{

 
let template = document.getElementById("check-box-to-do-item");
let clone = template.content.cloneNode(true);
let container = document.querySelector(`form[data-num="${dataNum2}"]`);
let label = clone.querySelector(".to-do-label");
let input = clone.querySelector(".to-do-item");
input.id = ("code" + addTodo.toDoItemReferenceNum);
label.htmlFor = ("code" + addTodo.toDoItemReferenceNum);;
label.innerHTML = addTodo.toDos[addTodo.toDoItemReferenceNum];
addTodo.toDoItemReferenceNum++
container.appendChild(clone);
 }
  });
}
 
let addProjectForm = (() => {
let form = document.getElementById("addprojectform")

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let modal = document.getElementById("add-project");
  let projectNameGet = document.getElementById("project-name").value;
  let descriptionGet = document.getElementById("description").value;
  let deadlineGet = document.getElementById('deadline').value;
  let toDos = [];
  console.log(projectNameGet, descriptionGet, deadlineGet);
  modal.style.display = "none";
  let newProject = projectFactory(projectNameGet, descriptionGet, deadlineGet, toDos)
  objectArr.push(newProject);
  console.log(objectArr);
  console.log(newProject.deadline);

  populateProject(newProject, counter);

  form.reset();
});

})();


let projectFactory = (title, description, deadline, toDos) => {
  
  return {title, description, deadline, toDos};
}


function buttonHandler () {

    let target = event.target;
    if(event.target.className === 'edit-to-dos') {
      console.log("hello")
      let dataNum = target.parentNode.parentNode.getAttribute('data-num');
      console.log(dataNum);
      addToDo(dataNum);
      
    }
   
     if (event.target.className === 'Remove') {
    let nums = document.querySelector(".project-info")
    let dataNum = target.parentNode.getAttribute('data-num');
    console.log(dataNum)
     objectArr = objectArr.filter((project, index) => {
      if (project.dataNum === dataNum) {
        console.log("num is" + project.dataNum)
        let div = document.querySelector(`div[data-num="${dataNum}"]`);
        div.parentNode.removeChild(div);
        
        return false;
        
      }
      
      return true;  
      
});  
};
 if (event.target.className === "to-do-item") {
  console.log("hello");
};

}

  let div1 = document.getElementById('project-container');
    div1.addEventListener('click', buttonHandler)
          
    
     



