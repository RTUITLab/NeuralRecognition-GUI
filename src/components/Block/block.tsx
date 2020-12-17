import React from "react";

class Block extends React.Component<{}, BlockState> {
    constructor(props: any) {
        super(props);
    }
    
    componentWillMount() {
        this.setState({window: { width: 0, height: 0 }})
    }

    componentDidMount() {

        let window = document.getElementById('Field');

        this.setState({
            window: {
                width: window?.offsetHeight,
                height: window?.offsetWidth
            }
        })
    }

    render() {
        return (
            <div>{this.state.window.width}x{this.state.window.height}</div>
        )
    }
}

type BlockProps = {
    field: HTMLElement | null
}

type BlockState = {
    window: {
        width?: number,
        height?: number
    },
    originPoint?: {
        x: number,
        y: number
    },
    startPosition?: {
        x: number,
        y: number
    }
}

export default Block;