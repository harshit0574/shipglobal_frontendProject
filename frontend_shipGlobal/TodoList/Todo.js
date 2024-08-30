document.addEventListener('DOMContentLoaded', () => {
    // Sample data for todos
    const todoItems = {
      backlog: ['Sample Task 1', 'Sample Task 2'],
      todo: ['Sample Task 3', 'Sample Task 4'],
      ongoing: ['Sample Task 5'],
      done: ['Sample Task 6']
    };
  
    // Function to render todos in each status card
    function renderTodos() {
      for (const [status, items] of Object.entries(todoItems)) {
        const list = document.getElementById(`${status}-list`);
        list.innerHTML = ''; // Clear existing todos
  
        items.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          
          // Create left navigation button
          const moveLeftBtn = document.createElement('button');
          moveLeftBtn.textContent = '←';
          moveLeftBtn.className = 'nav-button move-left';
          moveLeftBtn.disabled = status === 'backlog';
          moveLeftBtn.addEventListener('click', () => moveItem(status, 'left'));
  
          // Create right navigation button
          const moveRightBtn = document.createElement('button');
          moveRightBtn.textContent = '→';
          moveRightBtn.className = 'nav-button move-right';
          moveRightBtn.disabled = status === 'done';
          moveRightBtn.addEventListener('click', () => moveItem(status, 'right'));
  
          // Append buttons to the list item
          li.appendChild(moveLeftBtn);
          li.appendChild(moveRightBtn);
  
          // Append list item to the list
          list.appendChild(li);
        });
      }
  
      updateButtonStates();
    }
  
    // Function to move todo items between statuses
    function moveItem(currentStatus, direction) {
      const statuses = ['backlog', 'todo', 'ongoing', 'done'];
      const index = statuses.indexOf(currentStatus);
  
      if (direction === 'right' && index < statuses.length - 1) {
        const nextStatus = statuses[index + 1];
        const item = todoItems[currentStatus].shift();
        if (item) {
          todoItems[nextStatus].push(item);
          renderTodos();
        }
      } else if (direction === 'left' && index > 0) {
        const prevStatus = statuses[index - 1];
        const item = todoItems[currentStatus].shift();
        if (item) {
          todoItems[prevStatus].push(item);
          renderTodos();
        }
      }
    }
  
    // Function to update navigation button states based on the todo list
    function updateButtonStates() {
      document.getElementById('backlog-left').disabled = true;
      document.getElementById('backlog-right').disabled = todoItems.backlog.length === 0;
  
      document.getElementById('todo-left').disabled = todoItems.todo.length === 0;
      document.getElementById('todo-right').disabled = todoItems.todo.length === 0;
  
      document.getElementById('ongoing-left').disabled = todoItems.ongoing.length === 0;
      document.getElementById('ongoing-right').disabled = todoItems.ongoing.length === 0;
  
      document.getElementById('done-left').disabled = todoItems.done.length === 0;
      document.getElementById('done-right').disabled = true;
    }
  
    // Initial rendering of todos
    renderTodos();
  });
  