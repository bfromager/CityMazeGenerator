import { Component } from '@angular/core';
import {Board, Direction, Point, Position} from '../services/board';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor() {
        let board: Board = new Board({x:0,y:0},Direction.Down);
        let board2: Board = new Board({x:0,y:0},Direction.Down, board);

        board.getCell(5,0).used = true;
        board2.getCell(0,5).used = true;
        board.debugBoard();
        board2.debugBoard();

        let point: Point;
        let position: Position;

        console.log("-----------------");
        point = {x:5, y:0};
        position = {origin: point, direction: Direction.Left};
        console.log("position : (" + position.origin.x.toString() + "," +  position.origin.y.toString() + ") -> " + position.direction.toString());
        let result = board.nextCellFromPosition(position);
        while (result) {
            let position2: Position = <Position>result;
            console.log("position2 : (" + position2.origin.x.toString() + "," +  position2.origin.y.toString() + ") -> " + position2.direction.toString());
            result = board.nextCellFromPosition(position2);
        }

        console.log("-----------------");
        point = {x:5, y:1};
        position = {origin: point, direction: Direction.Left};
        console.log("position : (" + position.origin.x.toString() + "," +  position.origin.y.toString() + ") -> " + position.direction.toString());
        result = board.nextCellFromPosition(position);
        while (result) {
            let position2: Position = <Position>result;
            console.log("position2 : (" + position2.origin.x.toString() + "," +  position2.origin.y.toString() + ") -> " + position2.direction.toString());
            result = board.nextCellFromPosition(position2);
        }

        console.log("-----------------");
        point = {x:5, y:2};
        position = {origin: point, direction: Direction.Left};
        console.log("position : (" + position.origin.x.toString() + "," +  position.origin.y.toString() + ") -> " + position.direction.toString());
        result = board.nextCellFromPosition(position);
        while (result) {
            let position2: Position = <Position>result;
            console.log("position2 : (" + position2.origin.x.toString() + "," +  position2.origin.y.toString() + ") -> " + position2.direction.toString());
            result = board.nextCellFromPosition(position2);
        }

        console.log("-----------------");
        point = {x:0, y:5};
        position = {origin: point, direction: Direction.Up};
        console.log("position : (" + position.origin.x.toString() + "," +  position.origin.y.toString() + ") -> " + position.direction.toString());
        result = board.nextCellFromPosition(position);
        while (result) {
            let position2: Position = <Position>result;
            console.log("position2 : (" + position2.origin.x.toString() + "," +  position2.origin.y.toString() + ") -> " + position2.direction.toString());
            result = board.nextCellFromPosition(position2);
        }
    }
}
