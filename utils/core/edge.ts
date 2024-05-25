/* eslint-disable linebreak-style */
import uuid from 'uuid';

/**
 * Brief description of the class here
 * @extends ParentClassNameHereIfAny
 */
class Edge {
  id: any;
  value: number;
  source: string;
  target: string;
  agreement: boolean = false;
  isActive: boolean;
  date: number;
  kind: string;
  isSelected: boolean;
  intensity: number;
  isDeletable: boolean;
  isOver: boolean;
  isBidirectional: boolean;
  eventLog: never[];
  shape: string;

  constructor(isDeletable = true) {
    this.id = uuid.v4(); // uuidv4.v4(); // to run "npm run test"
    this.value = 1;
    this.source = '';
    this.target = '';
    this.agreement = true; // shape of line
    this.isActive = true;
    this.date = new Date().getTime(); // representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date
    this.kind = 'Connector'; // information for drawing edges / nodes
    this.isSelected = false;
    this.intensity = 3;
    this.isDeletable = isDeletable;
    this.isOver = false;
    this.isBidirectional = true;
    this.eventLog = [];
    this.shape = 'neutral';
  }

  setValue(newValue: number) {
    this.value = newValue;
  }
  getIntensity() {
    return this.intensity;
  }

  getKind() {
    return this.kind;
  }

  setIsSelected(val: boolean) {
    this.isSelected = val;
  }

  getSelected() {
    return this.isSelected;
  }

  getIsActive() {
    return this.isActive;
  }

  setIsActive(val: boolean) {
    if (this.isDeletable) {
      this.isActive = val;
    }
  }

  setAgreement(val: boolean) {
    this.agreement = val;
  }

  setIsDeletable(val: boolean) {
    this.isDeletable = val;
  }

  setBidirectional(val: boolean) {
    this.isBidirectional = val;
  }

  setDirectional() {
    this.isBidirectional = false;

    const tmp_source = this.source;
    this.source = this.target;
    this.target = tmp_source;
  }

  getId() {
    return this.id;
  }

  getIsDeletable() {
    return this.isDeletable;
  }

  setShape() {
    if (this.value < 0) this.shape = 'negative';
    if (this.value > 0) this.shape = 'positive';
    if (this.value === 0) this.shape = 'neutral';
  }

  updateConnector(field: string, value: any) {
    this.enterLog({
      type: field,
      value,
    });
    if (field === 'value') this.setValue(value);
    if (field === 'active') this.setIsActive(value);
    if (field === 'selected') this.setIsSelected(value);
    if (field === 'agreement') this.setAgreement(value);
    if (field === 'bidirection') this.setBidirectional(value);
    if (field === 'direction') this.setDirectional();
  }

  /**
   * This function establishes a connection between a source and a target with a given intensity and agreement value.
   * @param {string} source - Node corresponding to the source.
   * @param {string} target - Node corresponding to the target.
   * @param {int} intensity - Intensity of the connection.
   * @param {boolean} agreement - Is the connection an agreement.
   */
  establishConnection(source: string, target: string, intensity: any, agreement: boolean) {
    this.agreement = agreement;
    this.date = new Date().getTime();
    this.source = source;
    this.target = target;
    this.isActive = true;
    this.agreement = agreement;
    this.intensity = intensity;
    this.isBidirectional = false;

    this.enterLog({
      type: 'create connection',
      value: null,
    });
  }

  makeBidirectionalConnection() {
    this.enterLog({
      type: 'create bidirectional connection',
      value: null,
    });
    this.isBidirectional = true;
  }

  makeUnidirectionalConnection() {
    this.enterLog({
      type: 'create unidirectional connection',
      value: null,
    });

    this.isBidirectional = false;

    const tmp_source = this.source;
    this.source = this.target;
    this.target = tmp_source;
  }

  deleteConnection() {
    this.enterLog({
      type: 'active',
      value: false,
    });

    this.isActive = false;
    console.log('The connection has been destroyed.');
    return true;
  }

  enterLog(log: { type: any; value: any }) {
    this.eventLog.push({
      time: new Date().getTime(),
      type: log.type,
      value: log.value,
    });
  }
}

export default Edge;
