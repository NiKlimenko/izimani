/**
 * Configuration class for app
 */

export class AppConfig {
  private static _lsTokenName: string = 'auth-token';

  /**
   * Local storage key that hold authentication token
   * @returns {string}
   */
  public static get lsTokenName(): string {
    return this._lsTokenName;
  }
}
