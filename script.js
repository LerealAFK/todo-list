// Sélection des éléments du DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Charger les tâches depuis le localStorage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
};

// Sauvegarder les tâches dans le localStorage
const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.querySelector('span').textContent,
            completed: task.classList.contains('completed'),
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Ajouter une tâche au DOM
const addTaskToDOM = (text, completed = false) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    if (completed) li.classList.add('completed');
    li.appendChild(span);

    // Bouton supprimer
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);

    // Marquer comme terminé
    li.addEventListener('click', (e) => {
        if (e.target !== deleteBtn) {
            li.classList.toggle('completed');
            saveTasks();
        }
    });

    taskList.appendChild(li);
};

// Ajouter une tâche via le formulaire
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        addTaskToDOM(text);
        saveTasks();
        taskInput.value = '';
    }
});

// Charger les tâches à l'ouverture
loadTasks();
