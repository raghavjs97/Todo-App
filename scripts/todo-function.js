//1. Add a event handler to checkbox
//2. Modify the correct objects completed property  --> toggleTodo
//3. Save and rerender
'use strict'

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')

    //below is before truthy and falsy 
    //return todosJSON !== null ? JSON.parse(todosJSON) : [] 

    //below is after using the truthy and falsy
    try {
        return todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        return []
    }
    

}



//save todos to local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}


//Remove todo by ID
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
     if(todoIndex > -1) {
         todos.splice(todoIndex, 1)
     }

}
// toggle a completed value for a given todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
}



//render application todos based in filters
const renderTodos = (todos, filters) => {
    const todoEl = document.querySelector('#todos')
    const filteredTodos = todos.filter((todo) => { 
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch =! filters.hideCompleted || !todo.completed 

        return searchTextMatch && hideCompletedMatch
    })
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    //we need to clear the div otherwise we get a duplicate data 
    todoEl.innerHTML = ''  //here by setting the innerhtml value to null by this it will clear the data
    
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))  //this will append in the div tag we have set a id value for the div tag
    
    
    

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
       
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        todoEl.appendChild(messageEl)
    }

}


//1.setup a root div
//2. setup and append the checkbox (set type attribute)
//someNode.setAttribute('type', 'checkbox')
//3. setup and append a span(set text)
//4. setup and append a button(set text)







const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('lable')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
     

     //setup the todo text
     todoText.textContent = todo.text
     containerEl.appendChild(todoText)
    
    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)  
  

   


    //setup the reomove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    return todoEl
}

//get the DOM for the list summary
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `you have ${incompleteTodos.length} todo${plural} left`
    return summary
}
