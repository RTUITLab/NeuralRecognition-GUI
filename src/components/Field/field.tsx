import React from 'react';
import IController from '../../controllers/IController';
import KeyboardController from '../../controllers/KeyboardController';
import { Block, LargeBlock, SmallBlock, Coordinate, VisualBlock, Blocks } from '../Block/block';
import './field.css';

let velocities = (moveV: number, returnV: number): Velocities => {
    return({
        move: [
            { x: -moveV, y: 0 },
            { x: 0, y: -moveV },
            { x: moveV, y: 0 },
            { x: 0, y: moveV }
        ],
        return: [
            { x: returnV, y: 0},
            { x: 0, y: returnV},
            { x: -returnV, y: 0},
            { x: 0, y: -returnV}
        ]
    });
}

class Field extends React.Component<FieldProps, FieldState> {
    static defaultProps = {
        moveVelocity: 1,
        returnVelocity: 5
    }

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
            new SmallBlock(fieldSize, Blocks.Red),
            new SmallBlock(fieldSize, Blocks.Green),
            new SmallBlock(fieldSize, Blocks.Blue),
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
            let blocks = this.state.blocks;
            blocks[0].returnBlock({ x: 5, y: 0 });
            this.setState({blocks: blocks});
        }, 5);*/
    }

    render() {
        return (
            <div id="Field" className="Field">
                {this.state.blocks.map((block, index) => (
                    <VisualBlock key={index} Style={block.getStyle(this.state.origin)}></VisualBlock>
                ))}
            </div>
        )
    }

    setupListeners = () => {
        document.addEventListener('redUp', (e) => {
            this.handleEvent(Blocks.Red);
        })

        document.addEventListener('greenRight', (e) => {
            this.handleEvent(Blocks.Green);
        })

        document.addEventListener('yellowLeft', (e) => {
            this.handleEvent(Blocks.Yellow);
        })

        document.addEventListener('blueDown', (e) => {
            this.handleEvent(Blocks.Blue);
        })
    }

    handleEvent(block: Blocks) {
        let blocks = this.state.blocks;

        blocks[block].clearTimers();

        blocks[block].move(velocities(this.props.moveVelocity, this.props.returnVelocity).move[block]);

        blocks[block].timeout = setTimeout(() => {
            blocks[block].interval = setInterval(() => {
                let blocks = this.state.blocks;
                blocks[block].returnBlock(velocities(this.props.moveVelocity, this.props.returnVelocity).return[block]);
                this.setState({blocks: blocks});
                console.log("bzzzz");
            }, 5);
        }, 500);
        
        this.setState({blocks: blocks});
    }
}

type FieldState = {
    blocks: Array<Block>,
    origin: Coordinate
}

type FieldProps = {
    moveVelocity: number,
    returnVelocity: number
}

type Velocities = {
    move: Array<Coordinate>,
    return: Array<Coordinate>
}

export default Field;
