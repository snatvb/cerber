import { Api, createApi, createRef, MutableRef } from "./cerber"

export type TestApi = {
    changeFoo: (value: string) => void
    remove: () => void
}

export type TestProps = {
    children: any
    api: Api<TestApi>
}

const weakset = new WeakSet<any>()
// @ts-ignore
window.weakset = weakset

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
    }
    
    api.setApi({ changeFoo, remove })

    weakset.add(fooRef)
    weakset.add(baseRef)

    return (
        <div className="Test" ref={baseRef}>
            <div className="foo" ref={fooRef} />
            {children}
            {[...Array(100)].map((_, x) => <div>x</div>)}
        </div>
    )
}

const range = [1, 2, 3, 4, 5]

export type AppApi = {
    test?: Api<TestApi>
    remove: () => void
}

export type AppProps = {
    api: Api<AppApi>
    inputRef: MutableRef<HTMLInputElement>
    nameRef: MutableRef<HTMLSpanElement>
}

function App({ inputRef, nameRef, api }: AppProps) {
    const testApi = createApi<TestApi>()
    const baseRef = createRef<HTMLDivElement>(null)
    const remove = () => {
        baseRef.current.remove()
    }
    api.setApi({ test: testApi, remove })
    return (
        <div className="base" ref={baseRef}>
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
