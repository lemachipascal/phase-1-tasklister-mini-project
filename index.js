document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('create-task-form');
    const taskInput = document.getElementById('new-task-description');
    const taskList = document.getElementById('tasks');
    const prioritySelect = createPrioritySelect();
    const sortSelect = createSortSelect();
  
    let tasks = [];
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const taskDescription = taskInput.value.trim();
      if (taskDescription !== '') {
        const newTask = {
          id: Date.now(), 
          description: taskDescription,
          priority: prioritySelect.value,
          user: '', 
          duration: '',
          dateDue: '' 
        };
        tasks.push(newTask);
        renderTasks();
        form.reset();
      }
    });
  
    function renderTasks() {
      taskList.innerHTML = '';
  
      const sortedTasks = sortTasks([...tasks], sortSelect.value);

      sortedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        const taskText = document.createElement('span');
        const deleteButton = document.createElement('button');
        const editButton = document.createElement('button');
        const additionalInfo = document.createElement('p');
  
        taskText.textContent = task.description;
        taskText.style.color = getColorForPriority(task.priority);
  
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
  
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTask(task.id));
  
        additionalInfo.textContent = `User: ${task.user}, Duration: ${task.duration}, Due Date: ${task.dateDue}`;
  
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(editButton);
        taskItem.appendChild(additionalInfo);
        taskList.appendChild(taskItem);
      });
    }
  
    function deleteTask(id) {
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    }
  
    function editTask(id) {
      const taskToEdit = tasks.find(task => task.id === id);
      const newDescription = prompt('Enter new description:', taskToEdit.description);
      if (newDescription !== null) {
        taskToEdit.description = newDescription;
        renderTasks();
      }
    }
  
    function createPrioritySelect() {
      const select = document.createElement('select');
      const options = ['Low', 'Medium', 'High'];
  
      options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.toLowerCase();
        optionElement.textContent = option;
        select.appendChild(optionElement);
      });
  
      select.addEventListener('change', () => renderTasks());
      return select;
    }
  
    function getColorForPriority(priority) {
      switch (priority) {
        case 'high':
          return 'red';
        case 'medium':
          return 'yellow';
        case 'low':
          return 'green';
        default:
          return 'black';
      }
    }
  
    function createSortSelect() {
      const select = document.createElement('select');
      const options = ['Priority (Ascending)', 'Priority (Descending)'];
  
      options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.toLowerCase().replace(/ /g, '-');
        optionElement.textContent = option;
        select.appendChild(optionElement);
      });
  
      select.addEventListener('change', () => renderTasks());
      return select;
    }
  
    function sortTasks(tasks, sortOrder) {
      tasks.sort((task1, task2) => {
        const priorityOrder = {
          'low': 1,
          'medium': 2,
          'high': 3
        };
  
        if (sortOrder === 'priority-(ascending)') {
          return priorityOrder[task1.priority] - priorityOrder[task2.priority];
        } else if (sortOrder === 'priority-(descending)') {
          return priorityOrder[task2.priority] - priorityOrder[task1.priority];
        } else {
          return 0;
        }
      });
  
      return tasks;
    }
  
    form.appendChild(prioritySelect);
    form.appendChild(sortSelect);
  
    renderTasks();
  });
  