import { Component } from '@angular/core';
import {Board, Direction, Point, Position} from '../services/board';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor() {
        let board: Board = new Board({origin: {x:5,y:0}, direction: Direction.Left});
        let board2: Board = new Board({origin: {x:3,y:5}, direction: Direction.Up}, board);

        board.getCell(5,0).used = true;
        board2.getCell(3,5).used = true;
        board.debugBoard();
        board2.debugBoard();

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
