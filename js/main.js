
let links = [
    {
      label: "Week 01",
      url: "week01/index.html"
    },
    {
      label: "Week 02",
      url: "week02/index.html"
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

