export enum Direction {
    Up = 0,
    Right,
    Down,
    Left,
}

export const enum Face {
    Red = 0,
    Blue = 1
}

export interface Point {
    x : number;
    y : number;
}

export interface Position {
    origin : Point;
    direction : Direction;
}
