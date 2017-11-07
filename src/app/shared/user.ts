//tslint:disable:variable-name

/**
 * User model
 */

export class User {
  private _identification_number: string;
  private _first_name: string;
  private _last_name: string;
  private _birthday: Date;

  public get id(): string {
    return this._identification_number;
  }

  public get name(): string {
    return this._first_name;
  }

  public get lastName(): string {
    return this._last_name;
  }

  public get birthday(): Date {
    return this._birthday;
  }
}
