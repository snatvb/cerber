export type Component<T> = (props: T) => any
export type MutableRef<T> = { current: T }

export class Api<T> {
    private api?: T

    setApi(api: T) {
        this.api = api
    }

    dropApi() {
        this.api = undefined
    }

    work(worker: (api: T) => void) {
        if (this.api) {
            worker(this.api)
        }
        // TODO: only in dev
        if (!this.api) {
            console.warn('[Cerber] Try work with undefined api')
        }
        return this.api
    }

    workWith<K extends keyof T>(prop: K): T[K] {
        // TODO: only in dev
        if (!this.api) {
            console.warn('[Cerber] Try work with undefined api')
        }
        if (!(this.api[prop] instanceof Api)) {
            // TODO: only in dev
            console.warn(`[Cerber] Property ${prop} in not API`)
        }
        return this.api[prop]
    }
}

export const createRef = <T>(initData: T | {}): MutableRef<T> => ({ current: initData as T })

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

const Cerber = {
    createElement<T>(component: string | Component<T>, props: any, ...childs: any[]) {
        const element = typeof component === 'function' ? component({...props, children: childs}) : document.createElement(component)
        appendChilds(childs, element)

        if (typeof component === 'string') {
            addAttributes(element, props)

            if (typeof props.ref === 'object' && props.ref !== null) {
                props.ref.current = element
            }
        }
        
        return element
    }
}

export default Cerber
