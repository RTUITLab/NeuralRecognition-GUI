import React from 'react';
import { Block, LargeBlock, SmallBlock, Coordinate, VisualBlock } from '../Block/block';
import './field.css';

class Field extends React.Component<{}, FieldState> {

    componentWillMount() {
        if (!this.state) {
            this.setState({
                blocks: []
            });
        }
    }

    componentDidMount() {
        const field = document.getElementById('Field')!;
        
        let origin: Coordinate = {
            x: field.getBoundingClientRect().left,
            y: field.getBoundingClientRect().top
        }

        let fieldSize: Coordinate = {
            x: field.offsetWidth,
            y: field.offsetHeight
        }

        let blocks: Array<Block> = [
            new LargeBlock(fieldSize),
            new SmallBlock(fieldSize, 1),
            new SmallBlock(fieldSize, 2),
            new SmallBlock(fieldSize, 3),
        ]
        this.setState({
            blocks: blocks,
            origin: origin
        });

        /*setInterval(() => {
            //console.log("bzzzz");
            let a = this.state.blocks;
            a[0].position = { x: a[0].position.x - 1, y: 0};
            this.setState({blocks: blocks});
        }, 1);*/
    }

    render() {
        return (
            <div id="Field" className="Field">
                {this.state.blocks.map((block, index) => (
                    <VisualBlock key={index} Style={block.getStyle(this.state.origin)}>123</VisualBlock>
                ))}
            </div>
        )
    }
}

type FieldState = {
    blocks: Array<Block>,
    origin: Coordinate
}

export default Field;
