   //var initialList = ['shopping', 'reports', 'pay bills', 'doctor //appointment', 'pay ticket', 'sent documents'];
   var $taskList;
   var $newDoElement;
   var $addTaskButton;

   function main() {

   	$taskList = document.getElementById('task-list');
   	$newDoElement = document.getElementById('add-tasks');
   	$addTaskButton = document.getElementById('add');

   	$addTaskButton.addEventListener('click', addButtonClickHandler);
   	$taskList.addEventListener('click', listClickManager);


   }
   asyncAwaitGetTodos();
   getTodos();

   function getTodos() {
   	axios('http://195.181.210.249:3000/todo/')
   		.then(response => response.data)
   		.then(data => {
   			data.forEach(element => {
   				addListElement($taskList, element.title, element.id)
   			});
   		})
   		.catch(console.error)
   }

   async function asyncAwaitGetTodos() {
   	try {
   		const response = await axios('http://195.181.210.249:3000/todo/');

   		response.data.forEach(element => {
   			addListElement($taskList, element.title, element.id)
   		});
   	} catch (e) {
   		console.error(e);
   	}
   }

   asyncAwaitPutEdit();
   putEdit();


   function putEdit() {
   	axios('http://195.181.210.249:3000/todo/task-list')
   		.then(response => response.data)
   		.then(data => {
   			data.forEach(element => {
   				addListElement($taskList, element.title, element.id)
   			});
   		})
   		.catch(console.error)
   }


   async function asyncAwaitPutEdit() {
   	try {
   		const response = await axios('http://195.181.210.249:3000/todo/task-list');

   		response.data.forEach(element => {
   			addListElement($taskList, element.title, element.id)
   		});
   	} catch (e) {
   		console.error(e);
   	}
   }

   function listClickManager(event) {
   	if (event.target.classList.contains('edit')) {
   		editClickHandler(event);
   	} else if (event.target.classList.contains('accept')) {
   		acceptChangeHandler(event);

   	} else {
   		if (event.target.tagName === 'LI') {
   			event.target.classList.toggle('alternativeTask');
   		} else {
   			event.target.parentElement.classList.toggle('alternative');
   		}
   	}
   }


   function acceptChangeHandler(event) {
   	var $changeInput = event.target.parentElement.getElementsByTagName('input')[0];
   	var $acceptButton = event.target.parentElement.getElementsByClassName('accept')[0];
   	var $deleteButton = event.target.parentElement.getElementsByClassName('delete')[0];
   	$changeInput.style.display = 'none';
   	$acceptButton.style.display = 'none';


   	var $textElement = event.target.parentElement.getElementsByTagName('span')[0];
   	var $editButton = event.target.parentElement.getElementsByClassName('edit')[0];
   	var $deleteButton =
   		event.target.parentElement.getElementsByClassName('delete')[0];
   	$textElement.textContent = $changeInput.value;
   	$textElement.style.display = '';
   	$editButton.style.display = 'inline-block';
   	$deleteButton.style.display = 'inline-block';

   }

   function editClickHandler(event) {
   	var $textElement = event.target.parentElement.getElementsByTagName('span')[0];
   	var $changeInput = event.target.parentElement.getElementsByTagName('input')[0];
   	var $acceptButton = event.target.parentElement.getElementsByClassName('accept')[0];
   	var $deletetButton = event.target.parentElement.getElementsByClassName('delete')[0];
   	var oldTask = $textElement.textContent;
   	$textElement.style.display = 'none';
   	event.target.style.display = 'none';
   	$changeInput.value = oldTask;
   	$changeInput.style.display = 'inline-block';
   	$acceptButton.style.display = 'inline-block';
   	$deletetButton.style.display = 'inline-block';
   }


   function addListElement(list, listTask) {
   	var newElement = document.createElement('li');
   	var textElement = document.createElement('span');
   	textElement.textContent = listTask;
   	var editButton = document.createElement('button');

   	editButton.textContent = 'edit task';
   	editButton.classList.add('edit');

   	var acceptButton = document.createElement('button');

   	acceptButton.textContent = 'accept';
   	acceptButton.classList.add('accept');
   	acceptButton.style.display = 'none';
   	var deleteButton = document.createElement('button');

   	deleteButton.textContent = 'delete';



   	var changeInput = document.createElement('input');
   	changeInput.style.display = 'none';
   	newElement.appendChild(textElement);
   	newElement.appendChild(changeInput);
   	newElement.appendChild(acceptButton);
   	newElement.appendChild(editButton);
   	newElement.appendChild(deleteButton);
   	list.appendChild(newElement);
   }

   //
   //      delete button
   //      $deleteButton.addEventListener("click", function (del) if (e.target.elementName.contains('delete')) {
   //      var element = e.target.parentElement;
   //      element.parentElement.removeChild(element);
   //      })
   //      );
   //      }

   function addButtonClickHandler() {
   	var newTask = $newDoElement.value;

   	if (newTask) {
   		axios.post('http://195.181.210.249:3000/todo/', {
   				title: newTask,
   				author: 'Karolina'
   			})
   			.then(function () {
   				$taskList.innerHTML = '';
   				getTodos();
   			})

   		$newDoElement.value = '';
   	}
   }

   //   function addButtonClickHandler() {
   //   	var editTask = $newDoElement.value;
   //
   //   	if (editTask) {
   //   		axios.put('http://195.181.210.249:3000/todo/task-list', {
   //   				title: editTask,
   //   				author: 'Karolina'
   //   			})
   //   			.then(function () {
   //   				$taskList.innerHTML = '';
   //   				putEdit();
   //   			})
   //
   //   		$newDoElement.value = '';
   //   	}
   //   }


   document.addEventListener('DOMContentLoaded', main);
