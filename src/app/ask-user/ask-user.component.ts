import { Component, OnInit } from '@angular/core';
import { WordsService } from '../words.service';

@Component({
  selector: 'app-ask-user',
  templateUrl: './ask-user.component.html',
  styleUrls: ['./ask-user.component.css']
})
export class AskUserComponent implements OnInit {

  constructor(public wordsService: WordsService) { }

  ngOnInit() {
  }
  
  getWords(input): void {
    if (isNaN(parseInt(input)) || parseInt(input) <= 0) {
      this.wordsService.removeWords();
      this.wordsService.logError("Please enter a number that is greater than 0.");
    } else {
      this.wordsService.callDisplayWords(input);
    }
  }   
}
