// http://www.smartgamesandpuzzles.com/inventor/CityMaze.html

// https://stackoverflow.com/questions/28150967/typescript-cloning-object

import {debugMatrix, Matrix} from './matrix';

export const enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3,
}

export interface Point {
    x : number;
    y : number;
}

export interface Position {
    origin : Point;
    direction : Direction;
}

export class Cell {
    used: boolean = false;
    pass = new Set();

    constructor(used? : boolean) {
        if (used) this.used = used;
    }

    toString(): string {
        return this.used ? 'X' : '.' ;
    }

    copy(): Cell {
        return new Cell(this.used);
    }
} ;

const SIZE =6;

export class Board {
    // public direction: Direction = Direction.Up;
    private _Cells: Matrix<Cell> = [];


    constructor(public position: Point, public direction: Direction, fromBoard?: Board) {

        for (let row = 0; row < SIZE; ++row) {
            this._Cells[row] = [];
            for (let col = 0; col < SIZE; ++col) {
                this._Cells[row][col] = fromBoard ? fromBoard.getCell(col,row).copy() : new Cell();
            }
        }

        this.getCell(0,0).used = true;
        this.getCell(3,2).used = true;

        // this.debugBoard();
    }

    debugBoard(){
        debugMatrix(this._Cells);
    }

    getCell(col: number,row: number): Cell {
        return this._Cells[row][col];
    }

    nextCellFromPosition(position: Position): Position | boolean {
        let point: Point = <Point>{x: position.origin.x, y: position.origin.y};
        let result: Position = <Position>{origin: point, direction: position.direction};

        // Cell 0,0
        if (position.origin.x == 1 && position.origin.y == 0 && position.direction == Direction.Left) {
            result.origin.x = 0;
            result.origin.y = 1;
            result.direction = Direction.Down;
        } else
        if (position.origin.x == 0 && position.origin.y == 1 && position.direction == Direction.Up) {
            result.origin.x = 1;
            result.origin.y = 0;
            result.direction = Direction.Right;
        } else

        // Cell 3,2
        if (position.origin.x == 3 && position.origin.y == 1 && position.direction == Direction.Down) {
            result.origin.x = 2;
            result.origin.y = 2;
            result.direction = Direction.Left;
        } else
        if (position.origin.x == 2 && position.origin.y == 2 && position.direction == Direction.Right) {
            result.origin.x = 3;
            result.origin.y = 1;
            result.direction = Direction.Up;
        } else
        if (position.origin.x == 4 && position.origin.y == 2 && position.direction == Direction.Left) {
            result.origin.x = 3;
            result.origin.y = 3;
            result.direction = Direction.Down;
        } else
        if (position.origin.x == 3 && position.origin.y == 3 && position.direction == Direction.Up) {
            result.origin.x = 4;
            result.origin.y = 2;
            result.direction = Direction.Right;
        } else

        switch (position.direction) {
            case Direction.Up : {
                -- result.origin.y;
                break;
            }
            case Direction.Down : {
                ++ result.origin.y;
                break;
            }
            case Direction.Left : {
                -- result.origin.x;
                break;
            }
            case Direction.Right : {
                ++ result.origin.x;
                break;
            }
            default :
                return false;
        }

        if ((result.origin.x < 0) || (result.origin.y < 0) || (result.origin.x >= SIZE) || (result.origin.y >= SIZE))
            return false;
        else
            return result;
    }

    // setCell(x: number,y: number, cell: Cell){
    //     this._Cells[y][x] = cell;
    // }

    // copyBoard(fromBoard: Board) {
    //     for (let row=0; row < SIZE; ++row) {
    //         this._Cells[row] = [];
    //         for (let col=0; col < SIZE; ++col) {
    //             this._Cells[row][col] = [true, []];
    //             this._Cells[row][col][0] = false;
    //             this._Cells[row][col][1] = [2,3];
    //             // this._freeCases[row][col][0] = fromBoard[row][col][0];
    //             // this._freeCases[row][col][1] = [...fromBoard[row][col][1]];
    //             // this._freeCases[row][col][1] = fromBoard[row][col][1].slice();
    //         }
    //     }
    // }
}