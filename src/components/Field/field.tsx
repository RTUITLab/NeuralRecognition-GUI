import React from 'react';
import Block from '../Block/block';
import './field.css';

type FieldState = {
    window: {
        width?: number,
        height?: number
    }
}

class Field extends React.Component<{}, FieldState> {
    constructor(props: any) {
        super(props);
        this.state = {
            window: {
                width: 0,
                height: 0
            }        
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <div id="Field" className="Field">
                <Block></Block>
            </div>
        )
    }
}

export default Field;
