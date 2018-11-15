import { Component } from '@angular/core';
import {Board, Direction} from '../services/board';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor() {
        let board: Board = new Board([0,0],Direction.Down);
        board.setCase(0,0,[false, [1,2]]);
        board.debugBoard();
        let board2: Board = new Board([0,0],Direction.Down, board);
    }
}
