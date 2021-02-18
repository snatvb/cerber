import { Api, createRef, MutableRef } from "./cerber"

export type TodoItemApi = {
    remove: () => void
}

export type Props = {
    id: number
    children: any
    checked: boolean
    api?: Api<TodoItemApi>
    onChange: (id: number, value: boolean) => void
    onRemove: (id: number) => void
    // checkboxRef: MutableRef<HTMLInputElement>
}

const TodoItem = ({ id, children, checked, api, onChange, onRemove }: Props) => {
    const baseRef = createRef<HTMLInputElement>(null)
    const checkboxRef = createRef<HTMLInputElement>(null)
    const removeRef = createRef<HTMLSpanElement>(null)

    const jsx = (
        <div className="todo-item" ref={baseRef}>
            <input type="checkbox" checked={checked} ref={checkboxRef} />
            {children}
            {' '}
            <span ref={removeRef}>X</span>
        </div>
    )

    const remove = () => {
        baseRef.current.remove()
    }
    
    const handleChange = () => {
        onChange(id, checkboxRef.current.checked)
    }

    const handleRemove = () => {
        onRemove(id)
    }

    checkboxRef.current.addEventListener('change', handleChange)
    removeRef.current.addEventListener('click', handleRemove)

    if (api) {
        api.setApi({ remove })
    }

    return jsx
}

export default TodoItem
