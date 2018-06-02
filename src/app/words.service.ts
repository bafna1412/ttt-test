import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs'; 
import { catchError } from 'rxjs/operators'

import { Word } from './word';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  private url = 'http://localhost:8000/api/words';

  message: string;

  invokeEvent: Subject<any> = new Subject();

  callDisplayWords(input: number) {
    this.invokeEvent.next(input);
  }

  removeWordsEvent: Subject<any> = new Subject();

  removeWords(): void {
    this.removeWordsEvent.next();
  }

  constructor(private http: HttpClient) { }

  getWords (userInput: number): Observable<Word[]> {
    return this.http.get<Word[]>(`${this.url}/${userInput}`)
     .pipe(
       catchError((error: any): Observable<Word[]> => {
         this.removeWords();
         this.logError("There seems to be some issue. Please try again later.");
         return;
       })
     );
  }

  logError (message: string): any {
    this.message = message;
  }
}
