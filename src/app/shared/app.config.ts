/**
 * Configuration class for app
 */

export class AppConfig {
  private static _lsTokenName: string = 'auth-token';

  public static get lsTokenName(): string {
    return this._lsTokenName;
  }
}
