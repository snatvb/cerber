
const Test = ({children}) => {
    console.log('children', children)
    return <div className="Test">{children}</div>
}

function App() {
    const x = 1
    return (
        <div className={{x : x}}>
            <Test>
                <div>test</div>
                <div>test2</div>
            </Test>
        </div>
    )
}

export default App
