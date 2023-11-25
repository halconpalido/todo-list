const taskList = {};// [{title: 'Legge Nora', project: 'Kid', due: 'Today', priority: '3', checked: false}, {title: 'Vekke ungen som har sovet alt for lenge', project: 'Kid', due: 'Tomorrow', priority: '2', checked: true}, {title: 'Lage mat', project: 'Middag for hele familien', due: '27-11-2024', priority: '3', checked: false}];
let creatingTask = false;
let currentTaskId = null;
let currentFilter = '';

function initialLoad(){
    createDashboard();
    renderTopBar();
    renderTasks(currentFilter);
}

function createDashboard(){
    const content = document.querySelector('#content');
    const dashboardContent = document.createElement('div');
    dashboardContent.id = "dashboard"

    // HEADER
    const header = document.createElement('h1');
    header.textContent = "To Do"
    dashboardContent.appendChild(header);

    // BUTTONS
    const dashboardButtons = document.createElement('div');
    dashboardButtons.id = 'dashboard-buttons';
    dashboardContent.appendChild(dashboardButtons);

        // Filter buttons
    const filterButtons = document.createElement('div');
    filterButtons.id = 'filter-button-container';
    dashboardButtons.appendChild(filterButtons);

    const allTaskFilter = document.createElement('div');
    allTaskFilter.classList.add('filter-button');
    allTaskFilter.id = 'task-filter';
    const allTaskButton = document.createElement('button');
    allTaskButton.textContent = 'All Tasks';
    allTaskButton.classList.add('filter-button-content');
    allTaskButton.id = 'task-filter-button';
    allTaskButton.addEventListener('click', () => {
        renderTasks('all');
        currentFilter = 'all';
    });
    allTaskFilter.appendChild(allTaskButton);
    
    const todayFilter = document.createElement('div');
    todayFilter.classList.add('filter-button');
    todayFilter.id = 'today-filter';
    const todayFilterButton = document.createElement('button');
    todayFilterButton.textContent = 'Today'
    todayFilterButton.classList.add('filter-button-content');
    todayFilterButton.id = 'today-filter-button';
    todayFilterButton.addEventListener('click', () => {
        renderTasks('today');
        currentFilter = 'all';
    });
    todayFilter.appendChild(todayFilterButton);

    const importantFilter = document.createElement('div');
    importantFilter.classList.add('filter-button');
    importantFilter.id = 'important-filter';
    const importantFilterButton = document.createElement('button');
    importantFilterButton.textContent = 'Important';
    importantFilterButton.classList.add('filter-button-content');
    importantFilterButton.id = 'important-filter-button';
    importantFilterButton.addEventListener('click', () => {
        renderTasks('important');
        currentFilter = 'important';
    });
    importantFilter.appendChild(importantFilterButton);

    
    filterButtons.appendChild(allTaskFilter);
    filterButtons.appendChild(todayFilter);
    filterButtons.appendChild(importantFilter);
    
    
        // Create-button
    const createButton = document.createElement('button');
    createButton.textContent = '+';
    createButton.id = 'create-button';

    createButton.addEventListener("click", () =>{
        
        if (creatingTask){}
        createTask();
    })


    dashboardButtons.appendChild(createButton);



    content.appendChild(dashboardContent);

}

function createTask(){

    if (!creatingTask){
    
    creatingTask = true;
    // Create UI for input
    const content = document.querySelector('#dashboard');
    const taskInput = document.createElement('div');
    taskInput.id = "task-input";
    
    // Inputs
    const inputForm = document.createElement('form');
    inputForm.id = "input-form";
    const titleLabel = document.createElement('label');
    titleLabel.textContent = "Title"
    titleLabel.htmlFor = 'title';
    titleLabel.id = 'title-label';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    const projectLabel = document.createElement('label');
    projectLabel.textContent = 'Project';
    projectLabel.htmlFor = 'project';
    projectLabel.id = 'project-label';
    const projectInput = document.createElement('input');
    projectInput.type = 'text';
    projectInput.id = 'project';
    const dueLabel = document.createElement('label');
    dueLabel.textContent = 'Due'
    dueLabel.htmlFor = 'due';
    dueLabel.id = 'due-label';
    const dueInput = document.createElement('input');
    dueInput.type = 'text';
    dueInput.id = 'due';
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority';
    priorityLabel.htmlFor = 'priority';
    projectLabel.id = 'priority-label';
    const priorityInput = document.createElement('select');
    priorityInput.name = 'Priority'
    priorityInput.id = 'priority';
    const lowPriority = document.createElement('option');
    lowPriority.value = 1;
    lowPriority.textContent = 'Low';
    const mediumPriority = document.createElement('option');
    mediumPriority.value = 2;
    mediumPriority.textContent = 'Medium';
    const highPriority = document.createElement('option');
    highPriority.value = 3;
    highPriority.textContent = 'High';
    priorityInput.appendChild(lowPriority);
    priorityInput.appendChild(mediumPriority);
    priorityInput.appendChild(highPriority);
    
    const submitButton = document.createElement ('input');
    submitButton.textContent = 'Add task';
    submitButton.type = 'submit';
    submitButton.value = 'Add';
    submitButton.id = 'submit-button';

    // Submit button = Function -> Add task to task-list
    inputForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskData = {
            title: titleInput.value,
            project: projectInput.value,
            due: dueInput.value,
            priority: priorityInput.value
        };
        taskList.push(taskData);
        if (taskList.length === 1){
            renderTopBar();
        }
        taskInput.remove();
        renderTasks(currentFilter);
        creatingTask = false;
    })

    // Exit button
    const exitCreateTaskBtn = document.createElement('button');
    exitCreateTaskBtn.textContent = 'x';
    exitCreateTaskBtn.id = 'exit-create-task-btn';
    exitCreateTaskBtn.addEventListener('click', () =>{
        taskInput.remove();
        creatingTask = false;
    });

    
    // Append children
    inputForm.appendChild(titleLabel);
    inputForm.appendChild(titleInput);
    inputForm.appendChild(projectLabel);
    inputForm.appendChild(projectInput);
    inputForm.appendChild(dueLabel);
    inputForm.appendChild(dueInput);
    inputForm.appendChild(priorityLabel);
    inputForm.appendChild(priorityInput);
    inputForm.appendChild(submitButton);
    taskInput.appendChild(exitCreateTaskBtn);
    taskInput.appendChild(inputForm);
    content.appendChild(taskInput);
    }
}

function renderTopBar(){

    const content = document.querySelector('#content');
    const tasklistContent = document.createElement('div');
    tasklistContent.id = 'tasklist'

    // Top Bar
    const topBar = document.createElement('div');
    topBar.id = 'top-bar';

    const projectSorting = document.createElement('button');
    projectSorting.classList.add('sorting-button');
    projectSorting.id = 'project-sorting';
    projectSorting.textContent = 'Project';   

    const dueSorting = document.createElement('button');
    dueSorting.classList.add('sorting-button');
    dueSorting.id = 'due-sorting';
    dueSorting.textContent = 'Due ▾';

    const prioritySorting = document.createElement('button');
    prioritySorting.classList.add('sorting-button');
    prioritySorting.id = 'priority-sorting';
    prioritySorting.textContent = 'Priority';

    // Main content

    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';    

    // Append children

    topBar.appendChild(projectSorting);
    topBar.appendChild(dueSorting);
    topBar.appendChild(prioritySorting);
 
    // mainContent.appendChild(testTask);

    tasklistContent.appendChild(topBar);
    tasklistContent.appendChild(mainContent);
    
    content.appendChild(tasklistContent);

}

function renderTasks(filter){

    const mainContent = document.querySelector('#main-content');
    mainContent.innerHTML = '';

    for (let i = 0; i < taskList.length; i++){
        const task = taskList[i];

        if (filter === 'today' && task.due !== 'Today') {
            continue; // Skip tasks that are not due today
        }
        
        if (filter === 'important' && task.priority !== '3') {
            continue; // Skip tasks that are not marked as important
        }

        const taskContent = document.createElement('div');
        taskContent.classList.add('task');
        taskContent.id = i;
    
        const checkTask = document.createElement('button');
        checkTask.classList.add('check-task-button');
        checkTask.addEventListener('click', () =>{
            changeCheckedStatus(taskContent.id);
        });
        
        const taskTitle = document.createElement('h2');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;

        const taskProject = document.createElement('p');
        taskProject.classList.add('task-project');
        taskProject.textContent = task.project;

        const taskDue = document.createElement('p');
        taskDue.classList.add('task-due');
        taskDue.textContent = task.due;

        const taskPriority = document.createElement('p');
        taskPriority.classList.add('task-priority');
        if (task.priority == 1){
            taskPriority.textContent = 'Low';
        } else if (task.priority == 2){
            taskPriority.textContent = 'Medium';
        } else if (task.priority == 3){
            taskPriority.textContent = 'High';
        } else{
            taskPriority.textContent = '';
        }

        if (task.checked){
            taskContent.classList.add('checked-task');
        }
        
        const taskSettings = document.createElement('img');
        taskSettings.classList.add('task-settings');
        taskSettings.src = './img/settings.svg';
        taskSettings.onclick = function(event) {
            toggleTaskSelector(event, i);
        };

        taskContent.appendChild(checkTask);
        taskContent.appendChild(taskTitle);
        taskContent.appendChild(taskProject);
        taskContent.appendChild(taskDue);
        taskContent.appendChild(taskPriority);
        taskContent.appendChild(taskSettings);

        mainContent.appendChild(taskContent);

    };

    todayFilter = document.getElementById('today-filter');
    importantFilter = document.getElementById('important-filter');
    allTaskFilter = document.getElementById('task-filter');


    if (filter === 'today') {
        importantFilter.classList.remove('active-filter');
        allTaskFilter.classList.remove('active-filter');
        todayFilter.classList.add('active-filter');
    } else if (filter === 'important') {
        importantFilter.classList.add('active-filter');
        allTaskFilter.classList.remove('active-filter');
        todayFilter.classList.remove('active-filter');
    } else {
        allTaskFilter.classList.add('active-filter');
        importantFilter.classList.remove('active-filter');
        todayFilter.classList.remove('active-filter');
    }
}

function changeCheckedStatus(taskID){
    taskID = Number(taskID);
    const task = taskList[taskID];

    task.checked = !task.checked;

    renderTasks(currentFilter);
}

// TASK SELECTOR //

function createTaskSelector() {
    const selector = document.createElement('div');
    selector.classList.add('selector');
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    // Placeholder for edit functionality
    editButton.onclick = function() {
        const selector = document.querySelector('.selector');
        if (selector) {
            selector.style.display = 'none';
        }
        editTask(currentTaskId);

    };
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    // Placeholder for delete functionality
    deleteButton.onclick = function() {
        showConfirmModal(currentTaskId)
    };
    
    selector.appendChild(editButton);
    selector.appendChild(deleteButton);
    
    document.body.appendChild(selector); // Append to body to ensure it can display over other content
    return selector;
}

function toggleTaskSelector(event, taskID) {
    const selector = document.querySelector('.selector') || createTaskSelector();
    
    if (selector.style.display === 'none' || currentTaskId !== taskID) {
        // Get the settings image element
        const settingsImage = event.currentTarget;
        // Get the bounding rectangle of the settings image
        const rect = settingsImage.getBoundingClientRect();
        
        // Position the selector at a specific location relative to the settings image
        // For example, to the right and slightly below the settings image
        selector.style.display = 'block';
        selector.style.left = `${rect.right}px`; // 10 pixels to the right from the image's right edge
        selector.style.top = `${rect.top}px`; // Align with the top of the image
        
        currentTaskId = taskID;
    } else {
        selector.style.display = 'none';
        currentTaskId = null;
    }
    
    event.stopPropagation(); // Stop propagation to prevent it from immediately triggering the document click event
}

function setUpGlobalClickListener() {
    document.addEventListener('click', function(event) {
        const selector = document.querySelector('.selector');
        if (selector && selector.style.display === 'block') {
            // Check if the click is outside the selector
            if (!selector.contains(event.target)) {
                selector.style.display = 'none';
                currentTaskId = null;
            }
        }
    });
}

    // EDIT AND DELETE TASKS

function showConfirmModal(taskId) {
    const modal = document.getElementById('confirmModal');
    const confirmBtn = document.getElementById('confirmDelete');
    const cancelBtn = document.getElementById('cancelDelete');

    // Show the modal
    modal.style.display = 'block';

    // When the user clicks on Delete, delete the task and hide the modal
    confirmBtn.onclick = function() {
        deleteTask(taskId);
        modal.style.display = 'none';
    };

    // When the user clicks on Cancel, close the modal without deleting
    cancelBtn.onclick = function() {
        modal.style.display = 'none';
    };
}
    


function deleteTask(taskId) {
    // Remove the task from the taskList
    taskList.splice(taskId, 1);
    // Re-render the tasks to update the display
    renderTasks(currentFilter);
}

function editTask(taskId) {
    const task = taskList[taskId];

    // If an existing task input is already displayed, remove it
    const existingTaskInput = document.querySelector('#task-input');
    if (existingTaskInput) {
        existingTaskInput.remove();
    }

    // Set the creatingTask flag to true to avoid multiple edit forms being created
    creatingTask = true;

    // Create UI for input
    const content = document.querySelector('#dashboard'); // Assuming '#content' is the main container
    const taskInput = document.createElement('div');
    taskInput.id = "task-input";

    // Inputs
    const inputForm = document.createElement('form');
    inputForm.id = "input-form";
    
    // Title
    const titleLabel = document.createElement('label');
    titleLabel.textContent = "Title";
    titleLabel.htmlFor = 'title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.value = task.title; // Pre-fill with current value

    // Project
    const projectLabel = document.createElement('label');
    projectLabel.textContent = 'Project';
    projectLabel.htmlFor = 'project';
    const projectInput = document.createElement('input');
    projectInput.type = 'text';
    projectInput.id = 'project';
    projectInput.value = task.project; // Pre-fill with current value

    // Due
    const dueLabel = document.createElement('label');
    dueLabel.textContent = 'Due';
    dueLabel.htmlFor = 'due';
    const dueInput = document.createElement('input');
    dueInput.type = 'text';
    dueInput.id = 'due';
    dueInput.value = task.due; // Pre-fill with current value

    // Priority
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority';
    priorityLabel.htmlFor = 'priority';
    const priorityInput = document.createElement('select');
    priorityInput.id = 'priority';
    ['Low', 'Medium', 'High'].forEach((level, index) => {
        let option = document.createElement('option');
        option.value = index + 1;
        option.textContent = level;
        if (task.priority == option.value) {
            option.selected = true; // Set the current value as selected
        }
        priorityInput.appendChild(option);
    });

    // Submit button
    const submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Update Task';
    submitButton.id = 'submit-button';

    // Exit Edit Task button
    const exitEditTaskBtn = document.createElement('button');
    exitEditTaskBtn.textContent = 'x';
    exitEditTaskBtn.id = 'exit-edit-task-btn';
    exitEditTaskBtn.addEventListener('click', () =>{
        taskInput.remove();
        creatingTask = false;
    });

    // Append children to form
    inputForm.appendChild(exitEditTaskBtn);
    inputForm.appendChild(titleLabel);
    inputForm.appendChild(titleInput);
    inputForm.appendChild(projectLabel);
    inputForm.appendChild(projectInput);
    inputForm.appendChild(dueLabel);
    inputForm.appendChild(dueInput);
    inputForm.appendChild(priorityLabel);
    inputForm.appendChild(priorityInput);
    inputForm.appendChild(submitButton);

    // Add form to taskInput div
    taskInput.appendChild(inputForm);

    // Event listener for form submission
    inputForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Update task in taskList with new values
        task.title = titleInput.value;
        task.project = projectInput.value;
        task.due = dueInput.value;
        task.priority = priorityInput.value;

        // Re-render the tasks to update the display
        renderTasks(currentFilter);

        // Remove the task input form and reset creatingTask flag
        taskInput.remove();
        creatingTask = false;
    });

    // Append the task input form to the content
    content.appendChild(taskInput);
}

// INITIAL LOAD

initialLoad();
setUpGlobalClickListener();