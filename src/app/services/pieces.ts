import {Direction, Face, Point} from './declarations';

export type Piece = Point[];
export type RotatedPiecesArray = Map<Direction, Piece>;
export type ColoredPiecesArray = Map<Face, RotatedPiecesArray>;
export type PieceArray = ColoredPiecesArray[];


export function rotateDirection(direction: Direction, nbQuartDeTour: number) : Direction{
    return <Direction>(direction + nbQuartDeTour)%4;
}

export function rotatePoint(point: Point, nbQuartDeTour: number): Point {
    switch (nbQuartDeTour%4) {
        case 0 : { return <Point>{x:  point.x, y:  point.y};}
        case 1 : { return <Point>{x:  point.y, y: -point.x};}
        case 2 : { return <Point>{x: -point.x, y: -point.y};}
        case 3 : { return <Point>{x: -point.y, y:  point.x};}
    }
}

function mirrorPoint(point: Point): Point {
    return <Point>{x: -point.x, y: point.y};
}

// const BasePieces: Piece[] = [
//     [],  // arrivée x 2
//     [],  // départ x 2
//     [],  // rotation à droite x2
//     [],  // demi tour à droite x2
//     [],  // demi tour à gauche
//     []   // decalage à gauche
// ];
//
//
// export function initPieces() {
//
//
// }