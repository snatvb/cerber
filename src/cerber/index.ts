export type Component<T> = (props: T) => any
export type MutableRef<T> = { current: T }

export const createRef = <T>(initData: T): MutableRef<T> => ({ current: initData })

const appendChild = (child: any | any[], root: Element) => {
    if (Array.isArray(child)) {
        child.forEach((element) => root.append(element))
    } else {
        root.append(child)
    }
}

const addAttributes = (element: HTMLElement, props: any) => {
    for (const [attrib, value] of Object.entries(props)) {
        element[attrib] = value
    }
}

const appendChilds = (childs: any[], element: HTMLElement) => {
    childs.forEach((child) => {
        const typeOfChild = typeof child
        if (typeOfChild === 'boolean' || typeOfChild === 'undefined' || child === null) {
            return
        }
        if (Array.isArray(child)) {
            appendChilds(child, element)
        } else {
            appendChild(child, element)
        }
    })
}

// const createElement = <T>(component: string | Component<T>, props: any) => {
//     if (typeof component === 'function') {

//     }
// }

const Cerber = {
    createElement<T>(component: string | Component<T>, props: any, ...childs: any[]) {
        const created = typeof component === 'function' ? component({...props, children: childs}) : document.createElement(component)
        
        if (typeof component === 'string') {
            appendChilds(childs, created)
            addAttributes(created, props)

            if (typeof props.ref === 'object' && props.ref !== null) {
                props.ref.current = created
            }

            return created
        } else {
            const [api, element] = created
            return element
        }
    }
}

export default Cerber
