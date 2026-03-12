// ============================================
// Theme Manager
// ============================================
const ThemeManager = (() => {
  let themeToggleBtn;
  
  function init() {
    themeToggleBtn = document.getElementById('themeToggle');
    
    // Load saved theme
    const savedTheme = StorageUtil.get('theme', 'light');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggleBtn.textContent = '☀️';
    }
    
    // Setup event listener
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    StorageUtil.set('theme', isDark ? 'dark' : 'light');
  }
  
  return { init };
})();

// ============================================
// User Name Manager
// ============================================
const UserNameManager = (() => {
  let userNameElement;
  
  function init() {
    userNameElement = document.getElementById('userName');
    
    // Load saved name
    const savedName = StorageUtil.get('userName', 'Guest');
    userNameElement.textContent = savedName;
    
    // Setup event listeners
    userNameElement.addEventListener('blur', saveName);
    userNameElement.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        userNameElement.blur();
      }
    });
  }
  
  function saveName() {
    const name = userNameElement.textContent.trim();
    if (name) {
      StorageUtil.set('userName', name);
    } else {
      userNameElement.textContent = 'Guest';
      StorageUtil.set('userName', 'Guest');
    }
  }
  
  return { init };
})();

// ============================================
// Storage Utility Module
// ============================================
const StorageUtil = (() => {
  return {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        if (item === null) {
          return defaultValue;
        }
        return JSON.parse(item);
      } catch (error) {
        console.error(`Error reading from localStorage (key: ${key}):`, error);
        return defaultValue;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error(`Error writing to localStorage (key: ${key}):`, error);
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing from localStorage (key: ${key}):`, error);
      }
    }
  };
})();

// ============================================
// Greeting Widget Component
// ============================================
const GreetingWidget = (() => {
  let greetingMessageElement;
  let currentTimeElement;
  let currentDateElement;
  let intervalId = null;

  function init() {
    greetingMessageElement = document.getElementById('greetingMessage');
    currentTimeElement = document.getElementById('currentTime');
    currentDateElement = document.getElementById('currentDate');

    update();
    intervalId = setInterval(update, 1000);
  }

  function update() {
    const now = new Date();
    const hour = now.getHours();
    
    greetingMessageElement.textContent = getGreeting(hour);
    currentTimeElement.textContent = formatTime(now);
    currentDateElement.textContent = formatDate(now);
  }

  function getGreeting(hour) {
    if (hour >= 5 && hour <= 11) {
      return 'Good Morning';
    } else if (hour >= 12 && hour <= 16) {
      return 'Good Afternoon';
    } else if (hour >= 17 && hour <= 20) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  }

  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutesStr} ${ampm}`;
  }

  function formatDate(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    
    return `${dayOfWeek}, ${month} ${day}`;
  }

  return {
    init,
    update,
    getGreeting,
    formatTime,
    formatDate
  };
})();

// ============================================
// Focus Timer Component
// ============================================
const FocusTimer = (() => {
  const state = {
    duration: 1500,        // 25 minutes in seconds
    remaining: 1500,       // Current remaining time
    isRunning: false,      // Timer active state
    intervalId: null       // setInterval reference
  };

  let timerDisplayElement;
  let startBtn;
  let stopBtn;
  let resetBtn;

  function init() {
    timerDisplayElement = document.getElementById('timerDisplay');
    startBtn = document.getElementById('startBtn');
    stopBtn = document.getElementById('stopBtn');
    resetBtn = document.getElementById('resetBtn');

    setupEventListeners();
    updateDisplay();
    updateButtons();
  }

  function setupEventListeners() {
    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', reset);
  }

  function start() {
    if (!state.isRunning) {
      state.isRunning = true;
      state.intervalId = setInterval(tick, 1000);
      updateButtons();
    }
  }

  function stop() {
    if (state.isRunning) {
      state.isRunning = false;
      clearInterval(state.intervalId);
      state.intervalId = null;
      updateButtons();
    }
  }

  function reset() {
    stop();
    state.remaining = state.duration;
    updateDisplay();
  }

  function tick() {
    if (state.remaining > 0) {
      state.remaining--;
      updateDisplay();
      
      if (state.remaining === 0) {
        stop();
      }
    }
  }

  function updateDisplay() {
    timerDisplayElement.textContent = formatTime(state.remaining);
  }

  function updateButtons() {
    if (state.isRunning) {
      startBtn.disabled = true;
      stopBtn.disabled = false;
    } else {
      startBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secsStr = secs < 10 ? '0' + secs : secs;
    return `${minutesStr}:${secsStr}`;
  }

  return {
    init,
    start,
    stop,
    reset,
    tick,
    updateDisplay,
    updateButtons,
    formatTime,
    getState: () => ({ ...state })
  };
})();

// ============================================
// Task List Component
// ============================================
const TaskList = (() => {
  let tasks = [];
  let taskInput;
  let addBtn;
  let taskListElement;
  let sortSelect;
  let currentSort = 'date';

  function init() {
    taskInput = document.getElementById('taskInput');
    addBtn = document.getElementById('addBtn');
    taskListElement = document.getElementById('taskList');
    sortSelect = document.getElementById('sortTasks');

    load();
    setupEventListeners();
    render();
  }

  function load() {
    tasks = StorageUtil.get('tasks', []);
    currentSort = StorageUtil.get('taskSort', 'date');
    if (sortSelect) {
      sortSelect.value = currentSort;
    }
  }

  function save() {
    StorageUtil.set('tasks', tasks);
  }

  function setupEventListeners() {
    addBtn.addEventListener('click', handleAdd);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAdd();
    });
    sortSelect.addEventListener('change', handleSort);
  }

  function handleSort() {
    currentSort = sortSelect.value;
    StorageUtil.set('taskSort', currentSort);
    render();
  }

  function sortTasks(tasksToSort) {
    const sorted = [...tasksToSort];
    
    switch (currentSort) {
      case 'status':
        // Incomplete tasks first, then completed
        sorted.sort((a, b) => {
          if (a.completed === b.completed) {
            return b.createdAt - a.createdAt;
          }
          return a.completed ? 1 : -1;
        });
        break;
      case 'name':
        // Alphabetical by text
        sorted.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'date':
      default:
        // Newest first
        sorted.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }
    
    return sorted;
  }

  function handleAdd() {
    const text = taskInput.value.trim();
    if (isValidText(text)) {
      add(text);
    }
  }

  function add(text) {
    const task = {
      id: Date.now().toString(),
      text: text,
      completed: false,
      createdAt: Date.now()
    };
    tasks.push(task);
    save();
    render();
    taskInput.value = '';
  }

  function toggle(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      save();
      render();
    }
  }

  function edit(id, newText) {
    const trimmedText = newText.trim();
    if (isValidText(trimmedText)) {
      const task = tasks.find(t => t.id === id);
      if (task) {
        task.text = trimmedText;
        save();
        render();
      }
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render();
  }

  function render() {
    taskListElement.innerHTML = '';
    const sortedTasks = sortTasks(tasks);
    sortedTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggle(task.id));
      
      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;
      
      // Add click event listener for editing
      span.addEventListener('click', () => makeEditable(span, task));
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteTask(task.id));
      
      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      taskListElement.appendChild(li);
    });
  }

  function makeEditable(span, task) {
    const originalText = task.text;
    
    // Create an input element
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'task-edit-input';
    input.value = task.text;
    
    // Replace span with input
    span.replaceWith(input);
    input.focus();
    input.select();
    
    // Save on Enter key
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        finishEditing(input, task.id, originalText);
      }
    });
    
    // Save on blur (clicking outside)
    input.addEventListener('blur', () => {
      finishEditing(input, task.id, originalText);
    });
  }

  function finishEditing(input, taskId, originalText) {
    const newText = input.value.trim();
    
    if (isValidText(newText)) {
      // Valid text - save the edit
      edit(taskId, newText);
    } else {
      // Invalid text - restore original
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.text = originalText;
      }
      render();
    }
  }

  function isValidText(text) {
    return text.length > 0;
  }

  return {
    init,
    add,
    toggle,
    edit,
    delete: deleteTask,
    getTasks: () => tasks,
    isValidText
  };
})();

// ============================================
// Quick Links Component
// ============================================
const QuickLinks = (() => {
  let links = [];
  let linkNameInput;
  let linkUrlInput;
  let addLinkBtn;
  let linksListElement;

  function init() {
    linkNameInput = document.getElementById('linkNameInput');
    linkUrlInput = document.getElementById('linkUrlInput');
    addLinkBtn = document.getElementById('addLinkBtn');
    linksListElement = document.getElementById('linksList');

    load();
    setupEventListeners();
    render();
  }

  function load() {
    links = StorageUtil.get('links', []);
  }

  function save() {
    StorageUtil.set('links', links);
  }

  function setupEventListeners() {
    addLinkBtn.addEventListener('click', handleAdd);
    linkUrlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleAdd();
    });
  }

  function handleAdd() {
    const name = linkNameInput.value.trim();
    const url = linkUrlInput.value.trim();
    
    if (name && isValidUrl(url)) {
      add(name, url);
    }
  }

  function add(name, url) {
    const link = {
      id: Date.now().toString(),
      name: name,
      url: normalizeUrl(url)
    };
    links.push(link);
    save();
    render();
    linkNameInput.value = '';
    linkUrlInput.value = '';
  }

  function deleteLink(id) {
    links = links.filter(l => l.id !== id);
    save();
    render();
  }

  function open(url) {
    window.open(url, '_blank');
  }

  function render() {
    linksListElement.innerHTML = '';
    links.forEach(link => {
      const linkItem = document.createElement('div');
      linkItem.className = 'link-item';
      
      const linkBtn = document.createElement('button');
      linkBtn.className = 'link-btn';
      linkBtn.textContent = link.name;
      linkBtn.addEventListener('click', () => open(link.url));
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'link-delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteLink(link.id));
      
      linkItem.appendChild(linkBtn);
      linkItem.appendChild(deleteBtn);
      linksListElement.appendChild(linkItem);
    });
  }

  function normalizeUrl(url) {
    // Add https:// if no protocol is present
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return 'https://' + url;
    }
    return url;
  }

  function isValidUrl(url) {
    // URL is valid if it's not empty after trimming
    return url.length > 0;
  }

  return {
    init,
    load,
    save,
    add,
    delete: deleteLink,
    open,
    render,
    normalizeUrl,
    isValidUrl,
    getLinks: () => links
  };
})();

// ============================================
// Application Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  UserNameManager.init();
  GreetingWidget.init();
  FocusTimer.init();
  TaskList.init();
  QuickLinks.init();
});
