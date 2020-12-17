import React, { CSSProperties } from "react";

 export class Block {
    private position: Coordinate;
    private startPosition: Coordinate;
    private fieldSize: Coordinate;
    private size: number;
    public timeout: NodeJS.Timeout | undefined;
    public interval: NodeJS.Timeout | undefined;

    constructor(startPosition: Coordinate, fieldSize: Coordinate, size: number, private color: string) {
        this.position = startPosition;
        this.startPosition = startPosition;
        this.fieldSize = fieldSize;
        this.size = size;
        this.timeout = undefined;
    }

    public getStyle(origin: Coordinate): CSSProperties {        
        return ({
            position: 'absolute',
            top: this.position.y + origin.y,
            left: this.position.x + origin.x,
            width: this.size,
            height: this.size,
            background: this.color,
            borderRadius: 10
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

        if (this.position.x > this.fieldSize.x) {
            this.position.x = this.fieldSize.x;
        }

        if (this.position.x < 0) {
            this.position.x = 0;
        }

        if (this.position.y > this.fieldSize.y) {
            this.position.y = this.fieldSize.y;
        }

        if (this.position.y < 0) {
            this.position.y = 0;
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
            x: fieldSize.x / 2 - 2 * blockSize / 3 + 5,
            y: fieldSize.y / 2 - blockSize / 2 + 5
        };
        blockSize = blockSize - 10;
        const blockField: Coordinate = {
            x: fieldSize.x - blockSize,
            y: fieldSize.y - blockSize
        }

        super(startPosition, blockField, blockSize, '#ffcc3c');
    }
}

export class SmallBlock extends Block {
    constructor(fieldSize: Coordinate, position: number) {
        let blockSize = fieldSize.x / 6 > fieldSize.y / 7 ? fieldSize.y / 7 : fieldSize.x / 6;
        
        let startPosition: Coordinate = { x: 0, y: 0};
        let color = '';
        switch(position) {
            case (1): {
                startPosition = {
                    x: fieldSize.x / 2 + blockSize + 5,
                    y: fieldSize.y / 2 - 3 * blockSize / 2 + 5
                };
                color = '#ff2c22';
                break;
            }
            case (2): {
                startPosition = {
                    x: fieldSize.x / 2 + blockSize + 5,
                    y: fieldSize.y / 2 - blockSize / 2 + 5
                };
                color = '#00dc00';
                break;
            }
            case (3): {
                startPosition = {
                    x: fieldSize.x / 2 + blockSize + 5,
                    y: fieldSize.y / 2 + blockSize / 2 + 5
                };
                color = '#445bff';
                break;
            }
        }
        blockSize = blockSize - 10;

        const blockField: Coordinate = {
            x: fieldSize.x - blockSize,
            y: fieldSize.y - blockSize
        }

        super(startPosition, blockField, blockSize, color);
    }
}

export class VisualBlock extends React.Component<BlockProps, {}> {
    render() {
        return (
            <div style={this.props.Style}></div>
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

export default Block;