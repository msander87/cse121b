
  const list = document.querySelector('ul');
  const input = document.querySelector('#favchap');
  const button = document.querySelector('button');
  const mainElement = document.querySelector('main'); 
  const errorP = document.createElement('p');
  
  button.addEventListener('click', function() { 
      
    let fav = input.value;
    if(fav == ""){
        errorP.innerHTML = "please enter a book and chapter"
        errorP.setAttribute('class', 'error-p')
        mainElement.appendChild(errorP);
        input.focus();
    }
    else{        
        input.value = '';
        
        const liElement = document.createElement('li');
        const deleteBtn = document.createElement('button');
        const liText = document.createElement('span');

        liElement.appendChild(liText);
        liText.innerHTML = fav;
        liElement.appendChild(deleteBtn);
        deleteBtn.innerHTML = '&#x2716;';
        deleteBtn.setAttribute('class', 'del-btn');
        list.appendChild(liElement);

        
        deleteBtn.addEventListener('click', function() { 
            list.removeChild(liElement);
        });
    
        input.focus();
        mainElement.removeChild(errorP);
    }
  });
