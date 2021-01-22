import React from 'react';
import IController from '../../controllers/IController';
import KeyboardController from '../../controllers/KeyboardController';
import { Block, LargeBlock, SmallBlock, Coordinate, VisualBlock, Blocks, VisualBarrier } from '../Block/block';
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

    constructor(props: any) {
        super(props);

        this.state = {
            blocks: [],
            origin: { x: 0, y: 0 }
        };
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

        // Barrier drag
        setTimeout(() => {
            let elem = document.getElementById('barr0')!;
            elem.onmousedown = (e) => this.dragBarr(e, 0);

            elem = document.getElementById('barr1')!;
            elem.onmousedown = (e) => this.dragBarr(e, 1);

            elem = document.getElementById('barr2')!;
            elem.onmousedown = (e) => this.dragBarr(e, 2);

            elem = document.getElementById('barr3')!;
            elem.onmousedown = (e) => this.dragBarr(e, 3);
        }, 100);
        
    }

    render() {
        return (
            <div id="Field" className="Field">
                {this.state.blocks.map((block, index) => (
                    <VisualBlock key={index} Style={block.getStyle(this.state.origin)}></VisualBlock>
                ))}
                {this.state.blocks.map((block, index) => (
                    <VisualBarrier Id={`barr${index}`} key={index} Style={block.getBarrierStyle(this.state.origin)}></VisualBarrier>
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

    public dragBarr(e: Event, id: number) {
        // @ts-ignore
        let currPos: Coordinate = { x: e.clientX, y: e.clientY};
        console.log(currPos);

        document.onmouseup = this.finishDrag;

        document.onmousemove = (e) => {
            let blocks = this.state.blocks;
            // @ts-ignore
            const change: Coordinate = { x: currPos.x - e.clientX, y: currPos.y - e.clientY };
            currPos = { x: e.clientX, y: e.clientY};

            if (id === 0) {
                if (!blocks[0].setBarrier(change.x, { x: -1, y: 0 })) this.finishDrag();
                this.setState({blocks: blocks});
            }
            if (id === 1) {
                if (!blocks[1].setBarrier(change.y, { x: 0, y: -1 })) this.finishDrag();
                this.setState({blocks: blocks});
            }
            if (id === 2) {
                if (!blocks[2].setBarrier(change.x, { x: 1, y: 0 })) this.finishDrag();
                this.setState({blocks: blocks});
            }
            if (id === 3) {
                if (!blocks[3].setBarrier(change.y, { x: 0, y: 1 })) this.finishDrag();
                this.setState({blocks: blocks});
            }
        }
    }

    private finishDrag() {
        document.onmouseup = null;
        document.onmousemove = null;
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
