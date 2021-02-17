import { createApi, createRef } from './cerber'
import App, { AppApi } from './render'

const render = () => {
    const api = createApi<AppApi>()
    const inputRef = createRef<HTMLInputElement>(null)
    const nameRef = createRef<HTMLSpanElement>(null)
    const handleChange = (event: KeyboardEvent) => {
        const { value } = <HTMLInputElement>event.target
        nameRef.current.innerText = value
    }
    document.getElementById('root').append(App({ inputRef, nameRef, api }))
    inputRef.current.addEventListener('keyup', handleChange)

    let timeoutId = 0
    const removeTest = () => {
        api.workWith('test').work(({ remove }) => {
            clearTimeout(timeoutId)
            remove()
        })
    }

    api.workWith('test').work(({ changeFoo }) => {
        timeoutId = window.setTimeout(() => changeFoo('changed foo'), 3000)
        window.setTimeout(removeTest, 100)
    })
}
render()
