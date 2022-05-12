import React from 'react';
import asyncFunction from "./asyncFunction";

export class HelloWorld extends React.Component {
    render() {
        return <p>Hello World!</p>
    }
}

export class Parent extends React.Component {
    render() {
        return <>
            <Child value={1} />
            <Child value={2} />
            <Child value={3} />
            <Child value={4} />
        </>
    }
}

export class Child extends React.Component<{value: number}> {
    render() {
        return <p>{this.props.value}</p>
    }
}


export class Counter extends React.Component<any, {count: number}> {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }

        this.increment = this.increment.bind(this);
    }

    increment = () => {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return <div>
            <p>Count is: {this.state.count}</p>
            <button onClick={this.increment}>Increment</button>
        </div>
    }
}

export class MountExample extends React.Component<any, {msg: string}> {
    constructor(props) {
        super(props);

        this.state = {
            msg: ""
        }
    }

    componentDidMount() {
        asyncFunction().then((result) => {
            this.setState({msg: result.message});
        });
    }


    render() {
        if(this.state.msg === "") return <p>waiting</p>

        return <p>{this.state.msg}</p>
    }
}

export class UpdateExample extends React.Component<any, {msg: string}> {
    constructor(props) {
        super(props);

        this.state = {
            msg: ""
        }
    }

    componentDidMount() {
        asyncFunction().then((result) => {
            this.setState({msg: result.message});
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.msg !== this.state.msg) {
            asyncFunction(); //pretend it's a different async function
        }
    }


    render() {
        if(this.state.msg === "") return <p>waiting</p>

        return <p>{this.state.msg}</p>
    }
}



export class UnMountExample extends React.Component {
    componentWillUnmount() {
        asyncFunction();
    }

    render() {

        return <p>Cool stuff goes here</p>
    }
}

/*
//////////////////////////////////////////
End similarities with function components
//////////////////////////////////////////
*/

export class ErrorWrapper extends React.Component<any, {hasError: boolean}> {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    render() {
        const fallback = <p>something went wrong</p>

        if(this.state.hasError) return fallback;

        return <div>
            {this.props.children}
        </div>
    }
}


export class BuggyComponent extends React.Component<any, {shouldBreak: boolean}> {
    constructor(props) {
        super(props);

        this.state = {
            shouldBreak: false
        }
    }

    break = () => {
        this.setState({shouldBreak: true});
    }

    render() {
        if(this.state.shouldBreak) throw new Error("This component is buggy!");

        return <button onClick={this.break}>Click me, I dare you...</button>
    }
}