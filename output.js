const Test = ({ children }) => {
    return Renderer.createElement("div", {
        className: "Test"
    }, {children});
};

function App() {
    const x = 1;
    return Renderer.createElement("div", {
        className: { x: x }
    },
    Renderer.createElement("p", {}, "Hello World"), Renderer.createElement("img", {
        src: "zxs"
    }), Renderer.createElement("img", {
        src: "asd"
    }), Renderer.createElement("p", {
        test: Renderer.createElement("div", {})
    }), Test({}, "123")
    );
}

