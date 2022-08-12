document.querySelector('.action#delete').addEventListener('click', (e) => removeTask(e))

function removeTask(e){
    e.preventDefault()
    let confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {
        console.log(e.target)
    }
}

document.querySelector('.tasks_body').addEventListener('click', setTaskDone)

function setTaskDone(){
    const tasksList = document.querySelectorAll('.tasks_list')

    let wrapper = [
        ...tasksList
    ]

    for (const key in wrapper) {
        wrapper[key].addEventListener('click', (e) => {
            let task = wrapper[key];
            
            if(task.classList.contains('task_done')){
                task.classList.remove('task_done')
            } else {
                task.classList.add('task_done')
            }
        })
    }

}