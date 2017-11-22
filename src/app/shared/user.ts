//tslint:disable:variable-name

import {DBRelation, ObjectModel} from './object-model';

/**
 * Type described user role
 */
export type UserRole = 'user'|'admin';

/**
 * User model
 */
export class User extends ObjectModel<User> {

  public RELATIONS: DBRelation[] = [
    {BE: 'identification_number', FE: 'id'},
    {BE: 'first_name', FE: 'name'},
    {BE: 'last_name', FE: 'secondName'},
    {BE: 'birthday', FE: 'birthday'},
    {BE: 'role', FE: 'role'}
  ];

  public id: string;
  public name: string;
  public secondName: string;
  public birthday: string;
  public role: UserRole;

  constructor(id?: string, name?: string, secondName?: string, birthday?: string) {
    super();
    this.id = id;
    this.name = name;
    this.secondName = secondName;
    this.birthday = birthday;
  }

  public static CONVERT(beData: {}): User {
    const user: User = new User();
    user.convertFromBE(beData);

    return user;
  }

  /**
   * Checks whether this user is an administrator
   * @returns {boolean}
   */
  public isAdmin(): boolean {
    return this.role === 'admin';
  }
}
