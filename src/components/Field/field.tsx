import React from 'react';
import IController from '../../controllers/IController';
import KeyboardController from '../../controllers/KeyboardController';
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

        // Adding custom event listeners
        this.setupListeners();

        // Controller connection
        const controller: IController = KeyboardController;
        controller.enable();

        /*setInterval(() => {
            //console.log("bzzzz");
            let blocks = this.state.blocks;
            blocks[0].getPosition() = { x: blocks[0].getPosition().x - 1, y: 0};
            this.setState({blocks: blocks});
        }, 1);*/
    }

    componentDidUpdate() {
        const blocks = this.state.blocks;

        blocks.forEach((block, i) => {
            
        })
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

    setupListeners = () => {
        document.addEventListener('redUp', (e) => {
            let blocks = this.state.blocks;

            blocks[1].move({ x: 0, y: -1 });
            this.setState({blocks: blocks});
        })

        document.addEventListener('greenRight', (e) => {
            let blocks = this.state.blocks;

            blocks[2].move({ x: 1, y: 0 });
            this.setState({blocks: blocks});
        })

        document.addEventListener('yellowLeft', (e) => {
            let blocks = this.state.blocks;

            blocks[0].move({ x: -1, y: 0 });
            this.setState({blocks: blocks});
        })

        document.addEventListener('blueDown', (e) => {
            let blocks = this.state.blocks;

            blocks[3].move({ x: 0, y: 1 });
            this.setState({blocks: blocks});
        })
    }
}

type FieldState = {
    blocks: Array<Block>,
    origin: Coordinate
}

export default Field;
