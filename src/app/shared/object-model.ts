/**
 * Relation between front-end and back-end.
 * Only be used inside the API.
 */
export interface DBRelation {
  BE: string;
  FE: string;
}

/**
 * Base model, helping to convert data from backend
 */

export class ObjectModel<T> {

  public BE_RELATIONS: DBRelation[] = [];

  /**
   * Convert object from backend to frontend view
   * @param {{}} beData
   * @returns {T}
   */
  public convert(beData: {}): T {
    const feObject: {} = {};
    this.BE_RELATIONS.forEach((relation: DBRelation) => feObject[relation.FE] = beData[relation.BE]);

    return <T> feObject;
  }
}
