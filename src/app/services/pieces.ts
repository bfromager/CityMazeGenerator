import {Direction, Face, Point} from './declarations';

export interface Piece {
    points: Point[],
    direction : Direction
} ;
export type RotatedPiecesArray = Map<Direction, Piece>;
export type ColoredPiecesArray = Map<Face, RotatedPiecesArray>;
export type PieceArray = ColoredPiecesArray[];


function rotatePoint(point: Point, nbQuartDeTour: number): Point {
    switch (nbQuartDeTour%4) {
        case 0 : { return <Point>{x:  point.x, y:  point.y};}
        case 1 : { return <Point>{x:  point.y, y: -point.x};}
        case 2 : { return <Point>{x: -point.x, y: -point.y};}
        case 3 : { return <Point>{x: -point.y, y:  point.x};}
    }
}

function rotateDirection(direction: Direction, nbQuartDeTour: number) : Direction{
    return <Direction>(direction + nbQuartDeTour)%4;
}

function mirrorPoint(point: Point): Point {
    return <Point>{x: -point.x, y: point.y};
}

function mirrorDirection(direction: Direction): Direction {
    switch (direction) {
        case Direction.Right : { return Direction.Left; }
        case Direction.Left : { return Direction.Right; }
        default : { return direction; }
    }
}

export function rotatePiece (piece: Piece, nbQuartDeTour: number) : Piece {
    let result: Piece = {points : [], direction: rotateDirection(piece.direction,nbQuartDeTour)};
    for (let point of piece.points ) {
        result.points.push(rotatePoint(point,nbQuartDeTour))
    }
    return result;
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