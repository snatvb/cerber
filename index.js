const Test = ({ children }) => {
    return <div className="Test">{children}</div>
}

function App() {
    const x = 1
    return (
        <div className={{x : x}}>
            <p>Hello World</p>
            <img src={"zxs"} />
            <img src="asd" />
            <p test={<div />} />
            <Test>123</Test>
        </div>
    )
}