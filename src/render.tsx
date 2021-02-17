import { Api, createRef, MutableRef } from "./cerber"

export type TestApi = {
    changeFoo: (value: string) => void
    remove: () => void
}

export type TestProps = {
    children: any
    api: Api<TestApi>
}

const Test = ({ children, api }: TestProps) => {
    const fooRef = createRef<HTMLDivElement>(null)
    const baseRef = createRef<HTMLDivElement>(null)
    const changeFoo = (value: string) => {
        console.log('baseRef.current', baseRef.current)
        console.log('fooRef.current.parent', fooRef.current.parentElement)
        fooRef.current.innerText = value
    }

    const remove = () => {
        baseRef.current.remove()
        baseRef.current = null
        fooRef.current = null
    }
    
    api.setApi({ changeFoo, remove })

    return (
        <div className="Test" ref={baseRef}>
            <div className="foo" ref={fooRef} />
            {children}
        </div>
    )
}

const range = [1, 2, 3, 4, 5]

export type AppApi = {
    test?: Api<TestApi>
}

export type AppProps = {
    api: Api<AppApi>
    ref: MutableRef<HTMLDivElement>
    inputRef: MutableRef<HTMLInputElement>
    nameRef: MutableRef<HTMLSpanElement>
}

function App({ ref, inputRef, nameRef, api }: AppProps) {
    const testApi = new Api<TestApi>()
    api.setApi({ test: testApi })
    return (
        <div className="base" ref={ref}>
            <p>Hello World</p>
            <Test api={testApi}>
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
