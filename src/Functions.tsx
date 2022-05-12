import React from 'react';
import asyncFunction from "./asyncFunction";

export const HelloWorld = () => {
    return <p>Hello World!</p>
}

export const Parent = () => {
    return <>
        <Child value={1} />
        <Child value={2} />
        <Child value={3} />
        <Child value={4} />
    </>
}

export const Child = ({value} : {value: number}) => {
    return <p>{value}</p>
}

export const Counter = () => {
    const [somethingotherthancount, setCount] = React.useState(0);
    const [count2, setCount2] = React.useState(1);

    const increment = () => setCount(somethingotherthancount + 1);
    const increment2 = () => setCount2(count2 + 1);

    return <div>
        <p>Count is: {somethingotherthancount}</p>
        <p>Count is: {count2}</p>
        <button onClick={increment}>Increment</button>        <button onClick={increment2}>Increment</button>

    </div>
}

export const MountExample = () => {
    const [msg, setMsg] = React.useState("");

    React.useEffect(() => {
        asyncFunction().then(result => {
            setMsg(result.message);
        })
    }, []);



    if(msg === "") return <p>waiting</p>

    return <p>{msg}</p>
}

export const UpdateExample = () => {
    const [msg, setMsg] = React.useState("");

    React.useEffect(() => {
        asyncFunction().then(result => {
            setMsg(result.message);
        })
    }, []);

    React.useEffect(() => {
        asyncFunction(); //pretend it's a different async function
    }, [msg]);

    const value = React.useMemo(() => {
        return "I'm memoized!";
    }, []);


    if(msg === "") return <p>waiting</p>

    return <p>{msg}</p>
}

export const UnMountExample = () => {
    React.useEffect(() => {
        return () => {
            asyncFunction();
        }
    }, [])

    return <p>Cool stuff goes here</p>
}
/*
//////////////////////////////////////
End similarities with class components
//////////////////////////////////////
*/

export function useCustomHook(initialCount?: number)  {
    const [count, setCount] = React.useState(initialCount ?? 0);
    const [coolBusinessLogic, setCoolBusinessLogic] = React.useState(false);

    const ref = React.useRef(null);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    React.useEffect(() => {
        if(count > 5) {
            setCoolBusinessLogic(true);
        }
    }, [count]);

    const message = coolBusinessLogic ? "Business Logic Achieved" : "No Business Logic for You";

    return {count, increment, decrement, message,ref};
}

export const CustomHookConsumer = () => {
        const {increment, decrement, count, message, ref} = useCustomHook(3);

        return <div>
            <button ref={ref} onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <p>count: {count}</p>
            <p>message: {message}</p>
        </div>

}

export const Wrapper  = (props) => {
    return <p>{props.children}</p>
}

export const Wrapper2 = () => {
    // @ts-ignore
    return <Wrapper>Something Cool</Wrapper>
}



const MyContext = React.createContext<{msg: string}>(null);

export const MyContextWrapper : React.FC<any> = (props) => {
    return <MyContext.Provider value={{msg: props.value}}>
        {props.children}
    </MyContext.Provider>
}

export const ContextConsumer = () => {
    const ctx = React.useContext(MyContext);

    return <p>{ctx.msg}</p>


}