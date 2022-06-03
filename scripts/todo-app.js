
'use strict'
let todos = getSavedTodos() 


const filters = {
    searchText: '', 
    hideCompleted: false
}




//this below for initial rendering 
renderTodos(todos, filters)


document.querySelector('#search-text').addEventListener('input', (e) => {
    filters.searchText = e.target.value //by the e.target.value we can able to acces the value what ever which is typed in the  input field

    //rerender the data after the filtering was happened we need to call the function below 
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()
    if (text.length > 0) {
        todos.push({
            id: uuidv4(),
            text,     // this line is similar to "text: text,"
            completed: false 
        })
        //by the below we can able to save the data and if we refresh the page it will not vanish
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.text.value = ''
    }
    
    //might below code is to add a new element by pressing the button in the todos list
    
})

//1. create a checkbox and setup event listener -> "hide completed"
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    //3. Update hideCompleted an rerender list on checkbox change 
    filters.hideCompleted = e.target.checked //for the check box we need to use the checked properties
    renderTodos(todos, filters)
})