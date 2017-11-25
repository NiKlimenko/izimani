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
   * Maps the provided properties to the properties of the descendant
   * @param {{}} beData
   */
  public convertFromBE(beData: {}) {
    if (beData) {
      this.RELATIONS.forEach((relation: DBRelation) => this[relation.FE] = beData[relation.BE]);
    }
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
