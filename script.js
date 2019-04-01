var initialList = ['shopping', 'reports', 'pay bills', 'doctor appointment', 'pay ticket', 'sent documents'];
var $taskList;
var $newDoElement;
var $addTaskButton;

function main() {
	$taskList = document.getElementById('task-list');
	$newDoElement = document.getElementById('add-tasks');
	$addTaskButton = document.getElementById('add');

	$addTaskButton.addEventListener('click', addButtonClickHandler);
	$taskList.addEventListener('click', listClickManager);

	initialList.forEach((element) => {
		addListElement($taskList, element)
	})
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
	$changeInput.style.display = 'none';
	$acceptButton.style.display = 'none';

	var $textElement = event.target.parentElement.getElementsByTagName('span')[0];
	var $editButton = event.target.parentElement.getElementsByClassName('edit')[0];
	$textElement.textContent = $changeInput.value;
	$textElement.style.display = '';
	$editButton.style.display = 'inline-block';
}

function editClickHandler(event) {
	var $textElement = event.target.parentElement.getElementsByTagName('span')[0];
	var $changeInput = event.target.parentElement.getElementsByTagName('input')[0];
	var $acceptButton = event.target.parentElement.getElementsByClassName('accept')[0];
	var oldTask = $textElement.textContent;
	$textElement.style.display = 'none';
	event.target.style.display = 'none';
	$changeInput.value = oldTask;
	$changeInput.style.display = 'inline-block';
	$acceptButton.style.display = 'inline-block';

}

function myFunction() {

	var checkBox = document.getElementById("myCheck");

	var text = document.getElementById("text");


	if (checkBox.checked == true) {
		text.style.display = "block";
	} else {
		text.style.display = "none";
	}
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

	var changeInput = document.createElement('input');
	changeInput.style.display = 'none';

	newElement.appendChild(textElement);
	newElement.appendChild(changeInput);

	newElement.appendChild(acceptButton);
	newElement.appendChild(editButton);


	list.appendChild(newElement);
}

function addButtonClickHandler() {
	var newTask = $newDoElement.value;

	if (newTask) {
		addListElement($taskList, newTask);
		$newDoElement.value = '';
	}
}

document.addEventListener('DOMContentLoaded', main);