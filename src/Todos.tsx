import { Api, createApi, createRef, MutableRef } from "./cerber"
import TodoItem, { TodoItemApi } from "./TodoItem"

export type Props = {
}

export type Todo = {
    checked: boolean
    title: string
}

const Todos = ({ }: Props) => {
    const todosRef = createRef<HTMLDivElement>(null)
    const addBtnRef = createRef<HTMLButtonElement>(null)
    const todoItemApis = new Map<number, Api<TodoItemApi>>()
    const todos: Todo[] = [{
        checked: false, 
        title: 'Buy bread',
    }, {
        checked: true,
        title: 'Drink water',
    }]

    const handleChangeCheck = (id: number, checked: boolean) => {
        todos[id].checked = checked
        console.log('todos', todos)
    }

    const handleRemove = (id: number) => {
        todos[id] = undefined
        const api = todoItemApis.get(id)
        api.work(({ remove }) => remove())
        todoItemApis.delete(id)
    }

    const getOrCreateTodoItemApi = (id: number) => {
        const api = todoItemApis.get(id)
        if (api) {
            return api
        }
        const newApi = createApi<TodoItemApi>()
        todoItemApis.set(id, newApi)
        return newApi
    }

    const renderItem = (todo, index) => (
        <TodoItem
            id={index}
            checked={todo.checked}
            api={getOrCreateTodoItemApi(index)}
            onChange={handleChangeCheck}
            onRemove={handleRemove}
        >
            {todo.title}
        </TodoItem>
    )

    const jsx = (
        <div className="base-todos">
            <div className="todos" ref={todosRef}>
                {todos.map(renderItem)}
            </div>
            <button ref={addBtnRef}>Add</button>
        </div>
    )

    addBtnRef.current.addEventListener('click', () => {
        const newTodo: Todo = {
            checked: false,
            title: 'new todo',
        }
        todos.push(newTodo)
        todosRef.current.append(renderItem(newTodo, todos.length - 1))
    })

    return jsx
}

export default Todos
