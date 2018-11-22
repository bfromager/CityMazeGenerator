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

function rotatePiece (piece: Piece, nbQuartDeTour: number) : Piece {
    let result: Piece = {points : [], direction: rotateDirection(piece.direction,nbQuartDeTour)};
    for (let point of piece.points ) {
        result.points.push(rotatePoint(point,nbQuartDeTour))
    }
    return result;
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

function mirrorPiece (piece: Piece) : Piece {
    let result: Piece = {points : [], direction: mirrorDirection(piece.direction)};
    for (let point of piece.points ) {
        result.points.push(mirrorPoint(point))
    }
    return result;
}


// http://www.smartgamesandpuzzles.com/inventor/CityMaze.html

const BasePieces: Piece[] = [
    // départ x 2
    {points: [
        {x:0, y:0},
        {x:0, y:-1}
        ],
    direction: Direction.Up },

    // arrivée x 2
    {points: [
        {x:0, y:0},
    ],
    direction: Direction.Up },

    // rotation à droite x2
    {points: [
        {x:0, y:0},
        {x:1, y:0},
    ],
    direction: Direction.Right },

    // demi tour à droite x2
    {points: [
        {x:0, y:0},
        {x:1, y:0},
        {x:1, y:1},
    ],
    direction: Direction.Down },

    // demi tour à gauche
    {points: [
        {x:0, y:0},
        {x:-1, y:0},
        {x:-1, y:1},
    ],
    direction: Direction.Down },

    // decalage à gauche
    {points: [
        {x:0, y:0},
        {x:-1, y:0},
        {x:-1, y:-1},
    ],
    direction: Direction.Up },
];


export function initPieces(): PieceArray {
    let result: PieceArray = [];

    for (let redPiece of BasePieces) {
        let bluePiece = mirrorPiece(redPiece);
        let coloredPiecesArray : ColoredPiecesArray = new Map();

        let redFaces : RotatedPiecesArray = new Map();
        let blueFaces : RotatedPiecesArray = new Map();


        for (let d = 0; d < 4; ++d) {
            redFaces.set(<Direction>d, rotatePiece(redPiece,d));
            blueFaces.set(<Direction>d, rotatePiece(bluePiece,d));
        }

        coloredPiecesArray.set(Face.Red, redFaces);
        coloredPiecesArray.set(Face.Blue, blueFaces);

        result.push(coloredPiecesArray);
    }

    return result;
}