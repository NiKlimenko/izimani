import {HttpErrorResponse} from '@angular/common/http';
import {Observable, ObservableInput} from 'rxjs/Observable';

/**
 * Parses the error if it occurs from backend
 * @param {HttpErrorResponse} response
 * @returns {ObservableInput<{}>}
 */
export function parseError(response: HttpErrorResponse): ObservableInput<{}> {
  const error: {ModelState: {}[]} = JSON.parse(response.error);

  const states: {}[] = error.ModelState;

  if (states) {
    return Observable.throw(states[Object.keys(states)[0]][0]);
  } else {
    return Observable.throw('Oops, Something went wrong...');
  }
}
