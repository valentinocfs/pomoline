const countdownTimer = document.querySelector(".countdownTimer");
const countdownStart = document.querySelector('#countdownStart');
const countdownReset = document.querySelector('#countdownReset');
const countdownPause = document.querySelector('#countdownPause');
const countdownResume = document.querySelector('#countdownResume');

let countdown, start_time, getTimePause;
let paused = false; 
let countdownDelay = [25, 5];
let timeToRest = false;

document.querySelector("#countdownDelay").addEventListener("change", (e) => selectCountdownDelay(e));

document.querySelector('#addTask').addEventListener('click', renderTasks)

function setTime(){
    let current_time, diff;   

    current_time = new Date();

    diff = start_time - current_time;
    
    let hours = Math.floor(diff / (1000 * 3600));
    diff = diff % (1000 * 3600);
    let minutes = Math.floor(diff / (1000 * 60));
    diff = diff % (1000 * 60);
    let seconds = Math.floor(diff / (1000));
    
    countdownTimer.innerHTML = `${minutes}:${seconds}`
    getTimePause = countdownTimer.textContent.split(":").map((x) => parseInt(x));

    if(diff <= 0){
        timeToRest = !timeToRest;
        changeDisplayCountdown()
        resetCountdown()
    }

}

function start(){
    start_time = new Date();
    if(timeToRest){
        start_time.setMinutes(start_time.getMinutes() + countdownDelay[1]);
    } else {     
        start_time.setMinutes(start_time.getMinutes() + countdownDelay[0]);
    }
    countdown = setInterval(setTime, 100);
    countdownReset.hidden = false;
    countdownStart.hidden = true;
    countdownPause.hidden = false;
}

function pause(){
    paused = !paused;
    clearInterval(countdown);
    countdownPause.hidden = true;
    countdownResume.hidden = false;
}

function resume(){
    start_time = new Date();
    start_time.setMinutes(start_time.getMinutes() + getTimePause[0]);
    start_time.setSeconds(start_time.getSeconds() + getTimePause[1]);
    countdown = setInterval(setTime, 100);
    countdownPause.hidden = false;
    countdownResume.hidden = true;
}

function reset(){
    let confirmReset = confirm("Are you sure you want to reset?");
    if (confirmReset) {
        resetCountdown();
        changeDisplayCountdown();
    }
}

function resetCountdown(){
    countdownStart.hidden = false;
    countdownReset.hidden = true;
    countdownPause.hidden = true;
    countdownResume.hidden = true;
    clearInterval(countdown);
}

function selectCountdownDelay(e){
    if(start_time){
        resetCountdown()
    }

    let delay = e.target.value.split('-').map(x => parseInt(x))
    countdownDelay = delay
    countdownTimer.innerHTML = `${countdownDelay[0]}:00`
}

function pomodoro(){
    timeToRest = false;

    changeDisplayCountdown()
}

function shortBreak(){
    timeToRest = true;

    changeDisplayCountdown()
}

function renderTasks(){
    const task = document.querySelector('#inputTasks')
    const container = document.querySelector('.tasks_body')
    
    if(task.value){
        
        let taskContent = `
        <section class="tasks_list">
            <p id="${task.slug}" class="task_check">&copy;</p>
            <p>${task.name} </p>
            <div class="action">
                <button id="delete">Delete</button>
            <div>
        </section>
        `;

        let slug = task.value.replace(/\s+/g, "")
        
        const task_history = {
            name: task.value,
            slug
        }
        
        putHistory(task_history)
        
        task.value = '';

        container.insertAdjacentHTML('afterbegin', taskContent)
    }
    
}

function changeDisplayCountdown(){
    if(timeToRest){
        countdownTimer.innerHTML = `${countdownDelay[1]}:00`
    } else {
        countdownTimer.innerHTML = `${countdownDelay[0]}:00`
    }
}

function clearTasks(){
    let confirmClearTasks = confirm('Are you sure you want to delete all tasks?')

    if(confirmClearTasks){
        clearHistory()
    }
}
