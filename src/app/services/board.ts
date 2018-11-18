// http://www.smartgamesandpuzzles.com/inventor/CityMaze.html

// https://stackoverflow.com/questions/28150967/typescript-cloning-object

// 0 :
// 1 : this._Cells[1][1].pass.add(Direction.Up);
// 2 : this._Cells[1][2].pass                  .add(Direction.Right);
// 3 : this._Cells[1][3].pass.add(Direction.Up).add(Direction.Right);
//
// 4 : this._Cells[3][0].pass                                       .add(Direction.Down);
// 5 : this._Cells[3][1].pass.add(Direction.Up)                     .add(Direction.Down);
// 6 : this._Cells[3][2].pass                  .add(Direction.Right).add(Direction.Down);
// 7 : this._Cells[3][3].pass.add(Direction.Up).add(Direction.Right).add(Direction.Down);
//
// 8 : this._Cells[4][0].pass                                                           .add(Direction.Left);
// 9 : this._Cells[4][1].pass.add(Direction.Up)                                         .add(Direction.Left);
// A : this._Cells[4][2].pass                  .add(Direction.Right)                    .add(Direction.Left);
// B : this._Cells[4][3].pass.add(Direction.Up).add(Direction.Right)                    .add(Direction.Left);
//
// C : this._Cells[5][0].pass                                       .add(Direction.Down).add(Direction.Left);
// D : this._Cells[5][1].pass.add(Direction.Up)                     .add(Direction.Down).add(Direction.Left);
// E : this._Cells[5][2].pass                  .add(Direction.Right).add(Direction.Down).add(Direction.Left);
// F : this._Cells[5][3].pass.add(Direction.Up).add(Direction.Right).add(Direction.Down).add(Direction.Left);


import {debugMatrix, Matrix} from './matrix';

export const enum Direction {
    Up = 0,
    Right,
    Down,
    Left,
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
        let i=0;
        i += (this.pass.has(Direction.Up) ? 1 : 0);
        i += (this.pass.has(Direction.Right) ? 2 : 0);
        i += (this.pass.has(Direction.Down) ? 4 : 0);
        i += (this.pass.has(Direction.Left) ? 8 : 0);
        let S = (i > 0 ? ((i > 9 ? String.fromCharCode(55 + i) : i.toString())) : '.');
        return this.used ? 'X' : S ;
    }

    copy(): Cell {
        return new Cell(this.used);
    }
} ;

const SIZE =6;

export class Board {
    // public direction: Direction = Direction.Up;
    private _Cells: Matrix<Cell> = [];
    private _availableDestinations: Position[] = [];


    constructor(public position: Position, fromBoard?: Board) {

        for (let row = 0; row < SIZE; ++row) {
            this._Cells[row] = [];
            for (let col = 0; col < SIZE; ++col) {
                this._Cells[row][col] = fromBoard ? fromBoard.getCell(col,row).copy() : new Cell();
            }
        }


        this.getCell(0,0).used = true;
        this.getCell(3,2).used = true;
        this._availableDestinations = this.getAvailableDestinations(position);
    }

    debugBoard(){
        debugMatrix(this._Cells);
        for (let position of this._availableDestinations) {
            console.log("nextPosition : (" + position.origin.x.toString() + "," +  position.origin.y.toString() + ") -> " + position.direction.toString());    }
        }

    getCell(col: number,row: number): Cell {
        return this._Cells[row][col];
    }

    private nextCellFromPosition(position: Position): Position | boolean {
        let point: Point = {x: position.origin.x, y: position.origin.y};
        let result: Position = {origin: point, direction: position.direction};

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

    private getAvailableDestinations(position: Position): Position[] {
        // console.log("position : (" + position.origin.x.toString() + "," +  position.origin.y.toString() + ") -> " + position.direction.toString());
        let positions: Position[] = [];
        let result = this.nextCellFromPosition(position);
        while (result) {
            let nextPosition = <Position>result;
            // console.log("nextPosition : (" + nextPosition.origin.x.toString() + "," +  nextPosition.origin.y.toString() + ") -> " + nextPosition.direction.toString());
            positions.push(nextPosition);
            result = this.nextCellFromPosition(nextPosition);
        }
        return positions;
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