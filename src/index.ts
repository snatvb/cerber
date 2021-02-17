import { Api, createRef } from './cerber'
import App, { AppApi } from './render'

const ref = { current: null }
const api = new Api<AppApi>()
const inputRef = createRef<HTMLInputElement>(null)
const nameRef = createRef<HTMLSpanElement>(null)
const handleChange = (event: KeyboardEvent) => {
    const { value } = <HTMLInputElement>event.target
    nameRef.current.innerText = value
}
document.getElementById('root').append(App({ ref, inputRef, nameRef, api }))
inputRef.current.addEventListener('keyup', handleChange)
api.workWith('test').work(({ changeFoo, remove }) => {
    remove()
    setTimeout(() => changeFoo('changed foo'), 500)
})