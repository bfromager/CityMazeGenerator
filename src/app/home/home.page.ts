import { Component } from '@angular/core';
import {Board} from '../services/board';
import {Direction, Point, Position} from '../services/declarations';
import {mirrorPiece, Piece, rotatePiece} from '../services/pieces';
// import {rotateDirection, rotatePoint} from '../services/pieces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor() {
        let board: Board = new Board({origin: {x:5,y:0}, direction: Direction.Left});
        board.debugBoard();

        board.getCell(3,4).used = true;
        board.getCell(3,3).pass.add(Direction.Right);
        board.getCell(4,2).pass.add(Direction.Right);

        let board2: Board = new Board({origin: {x:3,y:5}, direction: Direction.Up}, board);
        board2.debugBoard();

        let piece: Piece = {points: [{x:5, y:3}], direction: Direction.Left };
        console.log(piece);
        console.log(rotatePiece(piece,1));
        console.log(mirrorPiece(piece));

        // let position: Position;
        //
        // console.log("-----------------");
        // position = {origin: {x:5, y:0}, direction: Direction.Left};
        // board.getAvailableDestinations(position);
        //
        // position = {origin: {x:5, y:1}, direction: Direction.Left};
        // board.getAvailableDestinations(position);
        //
        // position = {origin: {x:5, y:2}, direction: Direction.Left};
        // board.getAvailableDestinations(position);
        //
        // console.log("-----------------");
        // position = {origin: {x:0, y:5}, direction: Direction.Up};
        // board.getAvailableDestinations(position);
        //
        // position = {origin: {x:3, y:5}, direction: Direction.Up};
        // board.getAvailableDestinations(position);
        //
        // console.log("-----------------");
        // position = {origin: {x:0, y:2}, direction: Direction.Right};
        // board.getAvailableDestinations(position);

    }
}
