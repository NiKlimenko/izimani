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

  public RELATIONS: DBRelation[] = [];

  /**
   * Convert object from backend to frontend view
   * @param {{}} beData
   * @returns {T}
   */
  public convertFromBE(beData: {}): T {
    const feObject: {} = {};
    this.RELATIONS.forEach((relation: DBRelation) => feObject[relation.FE] = beData[relation.BE]);

    return <T> feObject;
  }

  /**
   * Convert object from frontend to backend view
   * @returns {Object}
   */
  public convertToBE(): object {
    const beObject: {} = {};
    this.RELATIONS.forEach((relation: DBRelation) => beObject[relation.BE] = this[relation.FE]);

    return beObject;
  }
}
