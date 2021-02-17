import { createRef } from './cerber'
import App from './render'

const ref = { current: null }
const inputRef = createRef<HTMLInputElement>(null)
const nameRef = createRef<HTMLSpanElement>(null)
const handleChange = (event: KeyboardEvent) => {
    const { value } = <HTMLInputElement>event.target
    nameRef.current.innerText = value
}
document.getElementById('root').append(App({ ref, inputRef, nameRef }))
inputRef.current.addEventListener('keyup', handleChange)
console.log('ref', ref)