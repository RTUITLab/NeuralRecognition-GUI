import React, { CSSProperties } from "react";

 export class Block {
    public position: Coordinate;
    private startPosition: Coordinate;
    private fieldSize: Coordinate;
    private size: number;

    constructor(startPosition: Coordinate, fieldSize: Coordinate, size: number, private color: string) {
        this.position = startPosition;
        this.startPosition = startPosition;
        this.fieldSize = fieldSize;
        this.size = size;
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

type BlockProps = {
    Style: React.CSSProperties
}

export default Block;