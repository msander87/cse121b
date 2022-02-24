
let links = [
    {
      label: "Week 01: Syllabus | Doing Stuff with Web Things",
      url: "week01/index.html"
    },
    {
      label: "Week 02: Basics | Arrays, Logic, Loops | Functions",
      url: "week02/index.html"
    },
    {
      label: "Week 03: This | Objects | DOM | Events",
      url: "week03/index.html"
    },
    {
      label: "Week 04: Forms | OOP | Modern JS",
      url: "week04/index.html"
    },
    {
      label: "Week 05: Testing and Debugging",
      url: "week05/index.html"
    },
    {
      label: "Week 06: ToDo Application",
      url: "week06/index.html"
    },
    {
      label: "Week 07: Further Functions | AJAX",
      url: "week07/index.html"
    },
    {
      label: "Week 08: Transforms and Transitions | Canvas, SVG, and Drag and Drop",
      url: "week08/index.html"
    }
  ]

links.forEach(item => {
    
    let li = document.createElement('li');
    let a = document.createElement('a');      

    a.setAttribute('href', item.url);
    a.setAttribute('target', '_blank');
    a.textContent = item.label;

    li.appendChild(a);

    document.querySelector('#ol_content').appendChild(li);    
      
});  

