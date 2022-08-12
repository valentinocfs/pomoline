const CACHE_KEY = "tasks_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined";
}

function putHistory(data) {
    if(checkForStorage()){
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
  
        historyData.unshift(data);
  
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function removeHistory() {
    let historyData = showHistory()
    console.log(historyData)
}

function clearHistory(){
    if(checkForStorage) {
        localStorage.removeItem(CACHE_KEY)
    
        renderHistory()
    }
}

function renderHistory() {
    let historyData = showHistory();

    const container = document.querySelector('.tasks_body')
    
    container.innerHTML = "";
    
    if (historyData) {
        for (let task of historyData) {
            let taskContent = `
                <section class="tasks_list">
                    <p id="${task.slug}" class="task_check">&copy;</p>
                    <p>${task.name} </p>
                    <div class="action">
                        <button id="delete">Delete</button>
                    <div>
                </section>
                `
            ;
            
            container.insertAdjacentHTML('beforeend', taskContent)
        }
    }
}

renderHistory();

setTimeout(() => {
    document.querySelector('.loader').style.display = 'none';
}, 2000);
