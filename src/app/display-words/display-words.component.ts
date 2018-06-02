import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Word } from '../word';
import { WordsService } from '../words.service';

@Component({
  selector: 'app-display-words',
  templateUrl: './display-words.component.html',
  styleUrls: ['./display-words.component.css']
})
export class DisplayWordsComponent implements OnInit {

  words: Word[];
  
  constructor(private wordsService: WordsService) {

    this.wordsService.invokeEvent.subscribe(userInput => {
      this.getWords(userInput);
    });

    this.wordsService.removeWordsEvent.subscribe(_ => {
      this.words = []
    });    
  }

  ngOnInit() {
  }

  getWords(userInput: number): void {
    this.wordsService.getWords(userInput)
      .subscribe(words => {
         this.words = words;
         this.wordsService.logError(null);
      });
  }

}
