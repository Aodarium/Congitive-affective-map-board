/* eslint-disable linebreak-style */
import uuid from 'uuid';

class Node {
  id: string;
  value: number;
  text: string;
  comment: string;
  position: object;
  isActive: boolean;
  date: number;
  kind: string;
  isSelected: boolean;
  isConnectorSelected: boolean;
  isDraggable: boolean;
  isDeletable: boolean;
  hasElementMoved: boolean;
  eventLog: never[];
  isTextChangeable: boolean;

  constructor(
    value: number,
    text: string,
    position: object,
    isDraggable = true,
    isDeletable = true,
    isTextChangeable = true
  ) {
    this.id = uuid.v4();
    this.value = value;
    this.text = text;
    this.comment = '';
    this.position = position;
    this.isActive = true;
    this.date = new Date().getTime();
    this.kind = 'Node';
    this.isSelected = false;
    this.isConnectorSelected = false;
    this.isDraggable = isDraggable;
    this.isDeletable = isDeletable;
    this.hasElementMoved = false;
    this.eventLog = [];
    this.isTextChangeable = isTextChangeable;

    this.enterLog({
      type: 'create node',
      value,
    });
  }

  setNodeImport(node: Node) {
    this.id = node.id;
    this.value = node.value;
    this.text = node.text;
    this.comment = node.comment;
    this.position = node.position;
    this.isActive = node.isActive;
    this.date = node.date;
    this.kind = node.kind;
    this.isSelected = node.isSelected;
    this.isConnectorSelected = node.isConnectorSelected;
    this.isDraggable = node.isDraggable;
    this.isDeletable = node.isDeletable;
    this.eventLog = node.eventLog;
    this.isTextChangeable = node.isTextChangeable;
  }

  /* set functions */
  setValue(newValue: number) {
    this.value = newValue;
  }
  setText(newText: string) {
    this.text = newText;
  }
  setComment(newComment: string) {
    this.comment = newComment;
  }
  setPosition(newPosition: object) {
    this.position = this.isDraggable ? newPosition : this.position;
  }
  setIsActive(val: boolean) {
    this.isActive = this.isDeletable ? val : this.isActive;
  }
  setIsSelected(val: boolean) {
    this.isSelected = val;
  }
  setIsConnectorSelected(val: boolean) {
    this.isConnectorSelected = val;
  }
  setIsDeletable(val: boolean) {
    this.isDeletable = val;
  }
  setIsDraggable(val: boolean) {
    this.isDraggable = val;
  }
  setIsTextChangeable(val: boolean) {
    this.isTextChangeable = val;
  }

  updateNode(field: string, value: boolean) {
    if (field === 'text') this.setText(value as unknown as string);
    if (field === 'position') this.setPosition(value as unknown as object);
    if (field === 'value') this.setValue(value as unknown as number);
    if (field === 'comment') this.setComment(value as unknown as string);
    if (field === 'active') this.setIsActive(value as unknown as boolean);
    if (field === 'selected') this.setIsSelected(value as unknown as boolean);
    if (field === 'connector') this.setIsConnectorSelected(value as unknown as boolean);
  }

  enterLog(log: object) {
    this.eventLog.push({
      time: new Date().getTime(),
      type: log.type,
      value: log.value,
    });
  }

  deletenode() {
    this.isActive = false;
  }

  getId() {
    return this.id;
  }

  isNode() {
    return true;
  }
}

export default Node;
