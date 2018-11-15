// http://www.smartgamesandpuzzles.com/inventor/CityMaze.html

// https://stackoverflow.com/questions/28150967/typescript-cloning-object

import {debugMatrix, Matrix} from './matrix';

export const enum Direction {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3,
}

export type Point = [number,number];
export type Case = [boolean,number[]];

const SIZE =6;

export class Board {
    // public direction: Direction = Direction.Up;
    private _freeCases: Matrix<Case> = [];


    constructor(public position: Point, public direction: Direction, fromBoard?: Board) {

        if (fromBoard) {
            this.copyBoard(fromBoard);
        } else {
            for (let row = 0; row < SIZE; ++row) {
                this._freeCases[row] = [];
                for (let col = 0; col < SIZE; ++col) {
                    this._freeCases[row][col] = [true, []];
                }
            }

            // this._freeCases[0][0] = [false,[]];
            // this._freeCases[2][3] = [false,[]];
            this.setCase(0, 0, [false, []]);
            this.setCase(3, 2, [false, []]);
        }
        this.debugBoard();
    }

    debugCase(cell: Case) : string {
        return cell[0].toString();
    }

    debugBoard(){
        debugMatrix(this._freeCases,this.debugCase);
    }

    getCase(x: number,y: number): Case {
        return this._freeCases[y][x];
    }
    setCase(x: number,y: number, _case: Case){
        this._freeCases[y][x] = _case;
    }

    copyBoard(fromBoard: Board) {
        for (let row=0; row < SIZE; ++row) {
            this._freeCases[row] = [];
            for (let col=0; col < SIZE; ++col) {
                this._freeCases[row][col] = [true, []];
                this._freeCases[row][col][0] = false;
                this._freeCases[row][col][1] = [2,3];
                // this._freeCases[row][col][0] = fromBoard[row][col][0];
                // this._freeCases[row][col][1] = [...fromBoard[row][col][1]];
                // this._freeCases[row][col][1] = fromBoard[row][col][1].slice();
            }
        }
    }
}