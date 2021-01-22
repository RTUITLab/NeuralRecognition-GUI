import React, { CSSProperties } from "react";

 export class Block {
    private position: Coordinate;
    private startPosition: Coordinate;
    private fieldSize: Coordinate;
    private size: Coordinate;
    public barrier: Barrier;
    public timeout: NodeJS.Timeout | undefined;
    public interval: NodeJS.Timeout | undefined;

    constructor(startPosition: Coordinate, fieldSize: Coordinate, barrier: Barrier, size: Coordinate, private color: string) {
        this.position = startPosition;
        this.startPosition = startPosition;
        this.fieldSize = fieldSize;
        this.size = size;
        this.barrier = barrier;
        this.timeout = undefined;
    }

    public setBarrier(change: number, dir: Coordinate): boolean {
        if (dir.x === -1) {
            if (this.barrier.left - change < 0) {
                this.barrier.left = 0;
                return false
            }
            else this.barrier.left = this.barrier.left - change;
        } else if (dir.y === -1) {
            if (this.barrier.top - change < 0) {
                this.barrier.top = 0;
                return false
            }
            else this.barrier.top = this.barrier.top - change;
        } else if (dir.x === 1) {
            if (this.barrier.right - change > this.fieldSize.x) {
                this.barrier.right = this.fieldSize.x;
                return false;
            }
            else this.barrier.right = this.barrier.right - change;
        } else if (dir.y === 1) {
            if (this.barrier.bottom - change > this.fieldSize.y) {
                this.barrier.bottom = this.fieldSize.y;
                return false;
            }
            else this.barrier.bottom = this.barrier.bottom - change;
        }

        return true;
    }

    public getStyle(origin: Coordinate): CSSProperties {        
        return ({
            position: 'absolute',
            display: 'table',
            top: this.position.y + origin.y,
            left: this.position.x + origin.x,
            width: this.size.x,
            height: this.size.y,
            background: this.color,
            borderRadius: 10,
            textAlign: 'center'
        })
    }

    public getBarrierStyle(origin: Coordinate): CSSProperties {
        const baseSize = 4;
        const pos: Coordinate = { x: 0, y: 0 };
        const size: Coordinate = { x: 0, y: 0 };
        
        if (this.barrier.top > -1) {
            pos.x = this.position.x + origin.x;
            pos.y = this.barrier.top + origin.y - baseSize / 2;
            size.x = this.size.x;
            size.y = baseSize;
        }
        
        if (this.barrier.right > -1) {
            pos.x = this.barrier.right + origin.x + this.size.x - baseSize / 2;
            pos.y = this.position.y + origin.y;
            size.x = baseSize;
            size.y = this.size.y;
        }
        
        if (this.barrier.bottom > -1) {
            pos.x = this.position.x + origin.x;
            pos.y = this.barrier.bottom + origin.y + this.size.y - baseSize / 2;
            size.x = this.size.x;
            size.y = baseSize;
        }
        
        if (this.barrier.left > -1) {
            pos.x = this.barrier.left + origin.x - baseSize / 2;
            pos.y = this.position.y + origin.y;
            size.x = baseSize;
            size.y = this.size.y;
        }

        return ({
            position: 'absolute',
            top: pos.y,
            left: pos.x,
            width: size.x,
            height: size.y,
            background: this.color,
            borderRadius: 10,
            cursor: 'pointer',
            zIndex: 2
        })
    }

    public getPosition() {
        return this.position;
    }
    

    public move(velocity: Coordinate) {
        this.position = {
            x: this.position.x + velocity.x,
            y: this.position.y + velocity.y
        }

        if (this.position.x > this.fieldSize.x || (this.position.x > this.barrier.right && this.barrier.right > -1)) {
            this.position.x = (this.barrier.right > -1) && (this.barrier.right < this.fieldSize.x)
                ? this.barrier.right
                : this.fieldSize.x;
        }

        if (this.position.x < 0 || (this.position.x < this.barrier.left && this.barrier.left > -1)) {
            this.position.x = this.barrier.left > 0
                ? this.barrier.left
                : 0;
        }

        if (this.position.y > this.fieldSize.y || (this.position.y > this.barrier.bottom && this.barrier.bottom > -1)) {
            this.position.y = (this.barrier.bottom > -1) && (this.barrier.bottom < this.fieldSize.y)
                ? this.barrier.bottom
                : this.fieldSize.y;
        }

        if (this.position.y < 0 || (this.position.y < this.barrier.top && this.barrier.top > -1)) {
            this.position.y = this.barrier.top > 0
                ? this.barrier.top
                : 0;
        }
    }

    public clearTimers(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }

    public returnBlock(velocity: Coordinate) {
        if (this.startPosition.x !== this.position.x || this.startPosition.y !== this.position.y) {
            if (velocity.x > 0) {
                this.position.x = this.position.x + velocity.x;
                if (this.position.x > this.startPosition.x) {
                    this.position.x = this.startPosition.x;
                }
            }
            if (velocity.x < 0) {
                this.position.x = this.position.x + velocity.x;
                if (this.position.x < this.startPosition.x) {
                    this.position.x = this.startPosition.x;
                }
            }
            if (velocity.y > 0) {
                this.position.y = this.position.y + velocity.y;
                if (this.position.y > this.startPosition.y) {
                    this.position.y = this.startPosition.y;
                }
            }
            if (velocity.y < 0) {
                this.position.y = this.position.y + velocity.y;
                if (this.position.y < this.startPosition.y) {
                    this.position.y = this.startPosition.y;
                }
            }
        }
        else {
            this.clearTimers();
        }
    }
}

export class LargeBlock extends Block {
    constructor(fieldSize: Coordinate) {
        let blockSize = fieldSize.x / 6 > fieldSize.y / 7 ? fieldSize.y * 3 / 7 : fieldSize.x / 2;
        const startPosition: Coordinate = {
            x: fieldSize.x / 2 - blockSize + 5,
            y: fieldSize.y / 2 - blockSize / 2 + 5
        };
        blockSize = blockSize - 10;
        const blockField: Coordinate = {
            x: fieldSize.x - blockSize,
            y: fieldSize.y - blockSize
        }

        const barrier: Barrier = new Barrier();
        barrier.left = 0;

        super(startPosition, blockField, barrier, { x: blockSize, y: blockSize}, '#ffcc3c');
    }
}

export class SmallBlock extends Block {
    constructor(fieldSize: Coordinate, position: number) {
        let blockSize: Coordinate = {
            x: fieldSize.x / 6 > fieldSize.y / 7 ? fieldSize.y * 3 / 7 : fieldSize.x / 2,
            y: fieldSize.x / 6 > fieldSize.y / 7 ? fieldSize.y / 7 : fieldSize.x / 6
        } // = fieldSize.x / 6 > fieldSize.y / 7 ? fieldSize.y / 7 : fieldSize.x / 6;
        
        let startPosition: Coordinate = { x: 0, y: 0};
        let color = '';

        const barrier: Barrier = new Barrier();

        switch(position) {
            case (1): {
                startPosition = {
                    x: fieldSize.x / 2 + 5,
                    y: fieldSize.y / 2 - 3 * blockSize.y / 2 + 5
                };
                color = '#ff2c22';
                barrier.top = 0;
                break;
            }
            case (2): {
                startPosition = {
                    x: fieldSize.x / 2 + 5,
                    y: fieldSize.y / 2 - blockSize.y / 2 + 5
                };
                color = '#00dc00';
                barrier.right = fieldSize.x - blockSize.x + 10;
                break;
            }
            case (3): {
                startPosition = {
                    x: fieldSize.x / 2 + 5,
                    y: fieldSize.y / 2 + blockSize.y / 2 + 5
                };
                color = '#445bff';
                barrier.bottom = fieldSize.y - blockSize.y + 10;
                break;
            }
        }
        blockSize = { x: blockSize.x - 10, y: blockSize.y - 10 };

        const blockField: Coordinate = {
            x: fieldSize.x - blockSize.x,
            y: fieldSize.y - blockSize.y
        }

        super(startPosition, blockField, barrier, blockSize, color);
    }
}

export class VisualBlock extends React.Component<BlockProps, {}> {
    render() {
        return (
            <div style={this.props.Style}><span contentEditable style={{display: 'table-cell', width: '100%', verticalAlign: 'middle', color: 'white' }}></span></div>
        )
    }
}

export class VisualBarrier extends React.Component<BarrierProps, {}> {
    render() {
        return (
            <div id={this.props.Id} style={this.props.Style}></div>
        )
    }
}

export type Coordinate = {
    x: number,
    y: number
}

export enum Blocks {
    Yellow = 0,
    Red = 1,
    Green = 2,
    Blue = 3
}

type BlockProps = {
    Style: React.CSSProperties
}

type BarrierProps = {
    Id: string,
    Style: React.CSSProperties
}

class Barrier {
    top: number = -1;
    right: number = -1;
    bottom: number = -1;
    left: number = -1;
}

export default Block;