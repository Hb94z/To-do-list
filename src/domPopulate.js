export {populateProject}

let counter = 0;
function populateProject(project) {
    
    let template = document.getElementById("project-template");
    let clone = template.content.cloneNode(true);
    let container = document.getElementById("project-container");
    let title = clone.querySelector(".title1");
    let description = clone.querySelector(".description1");
    let deadline = clone.querySelector(".deadline1");
    let projectInfo = clone.querySelector(".new-project")
    let addToDoForm1 = clone.querySelector(".to-do-form")
    projectInfo.setAttribute("data-num", counter);
    addToDoForm1.setAttribute("data-num", counter);
  
    let titleDisplayValue = project.title;
    let descriptionDisplayValue = project.description;
    let CapitalisedTitleDisplayValue = titleDisplayValue.charAt(0).toUpperCase() + titleDisplayValue.slice(1);
    let CapitalisedDesriptionDisplayValue = descriptionDisplayValue.charAt(0).toUpperCase() + descriptionDisplayValue.slice(1);

    title.innerHTML = CapitalisedTitleDisplayValue;
    description.innerHTML = CapitalisedDesriptionDisplayValue;
    deadline.innerHTML = ("Deadline: " + project.deadline);
  
    container.appendChild(clone);
    project.dataNum = `${counter}`;
    project.toDoItemReferenceNum = 0;
  counter++;
  let dataNum = projectInfo.getAttribute('data-num');

}

