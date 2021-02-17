import { createRef, MutableRef } from "./cerber"

type Props = {
    children: any
    apiName: string
}

const Test = ({ children, apiName }: Props) => {
    const testRef = createRef<HTMLDivElement>(null)
    const changeDuplo = (value: string) => {
        testRef.current.innerText = value
    }
    
    return [apiName, {}, (
        <div className="Test">
            <div ref={testRef} />
            {children}
        </div>
    )]
}

const range = [1, 2, 3, 4, 5]

export type AppProps = {
    ref: MutableRef<HTMLDivElement>
    inputRef: MutableRef<HTMLInputElement>
    nameRef: MutableRef<HTMLSpanElement>
}

function App({ ref, inputRef, nameRef }: AppProps) {
    return (
        <div className="base" ref={ref}>
            <p>Hello World</p>
            <Test apiName="test">
                <div>
                    <span>My name is</span>
                    {' '}
                    <span ref={nameRef} />
                </div>
                <input type="text" ref={inputRef} placeholder="write your name..." />
                {range.map((x) => <div>{x}</div>)}
            </Test>
        </div>
    )
}

export default App
