/*const form = document.forms['todo'];
form.addEventListener('submit', addTask, false);

function addTask(event) {
    event.preventDefault();
    const number = form.task.value;
    const task = {
        userId: 1,
        title: form.task.value,
        completed: false
    }
    const data = JSON.stringify(task);
    const url = 'https://jsonplaceholder.typicode.com/todos';
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const request = new Request(url, {
        method: 'POST',
        header: headers,
        body: data
    })
    fetch(request)
        .then(response => response.json())
        .then(task => console.log(`Task saved with an id of ${task.id}`))
        .catch(error => console.log('There was an error:', error))
}*/

/*This code creates an event listener that first of all prevents the default behavior of
the form, so it doesn’t get submitted when the Add Task button is clicked. Next it
creates a task object with a title property that is taken from what was entered in
the form. It also has a completed property that has a default value of false. This
object is then transformed into a JSON string using the JSON.stringify method
and assigned to the variable data.
After this, we build the Headers and Request objects. Because we are sending
JSON, we need to add headers of "Accept': 'application/json' and
'Content-Type': 'application/json'. Because we are sending data, we need to
ensure that the method property of the request object is POST so that a POST
request is used to send the data. The most important property of the request
object is body – this is where the data we want to send is placed. We use the data
variable here, so that JSON is sent to the server.
Then we use the fetch() method to send the request and deal with the response.
This creates a promise that resolves to a JSON object, so we use the json()
method to create another promise that resolves to a JavaScript object. This object
has a single property of id to mimic successfully saving the task to a database (as
this would result in it being assigned an ID by the database).
We can use this to log a message to the console that refers to the id property that
was returned.*/




//********************
//USING FormData...


const form = document.forms['todo'];
form.addEventListener('submit', addTask, false);

function addTask(event) {
    event.preventDefault();
    const task = new FormData(form);
    const url = `http://echo.jsontest.com/id/1/title/${form.task.value}`;
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const request = new Request(url, {
        method: 'POST',
        mode: 'cors',
        header: headers,
        body: JSON.stringify(task)
    })
    fetch(request)
        .then(response => response.json())
        .then(data => console.log(`${data.title} saved with an id of ${data.id}`))
        .catch(error => console.log('There was an error:', error))
}

/*In this function, we create a new FormData instance using the FormData()
constructor function and provide the form as an argument. This does all the hard
work of creating the task object for us.

It’s also possible to add data to the form data instance as key-value pairs using the
append() method:
data = new FormData(); // no form provided as an argument creates an empty form data instance
data.append('height', 75);*/

