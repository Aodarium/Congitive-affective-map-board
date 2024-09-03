import { v4 as uuidv4 } from 'uuid';

class Node {
    id: any;
    value: any;
    text: any;
    position: { x: number; y: number; };
    isDraggable: boolean;
    isDeletable: boolean;
    isTextChangeable: boolean;
    comment: string;
    isActive: boolean;
    date: number;
    kind: string;
    isSelected: boolean;
    isConnectorSelected: boolean;
    hasElementMoved: boolean;
    eventLog: never[];
    
	constructor(
		value: any,
		text: any,
		position = {
			x: 0,
			y: 0,
		},
		isDraggable = true,
		isDeletable = true,
		isTextChangeable = true
	) {
		this.id = uuidv4();
		this.value = value;
		this.text = text;
		this.position = position;
		this.isDraggable = isDraggable;
		this.isDeletable = isDeletable;
		this.isTextChangeable = isTextChangeable;
		this.comment = "";
		this.isActive = true;
		this.date = new Date().getTime(); // representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date
		this.kind = "Node";
		this.isSelected = false;
		this.isConnectorSelected = false;
		this.hasElementMoved = false;
		this.eventLog = [];

		this.enterLog({
			type: "create node",
			value: value,
		});
	}

	setNodeImport(node: { id: any; value: any; text: any; comment: any; position: any; isActive: any; date: any; kind: any; isSelected: any; isConnectorSelected: any; isDraggable: any; isDeletable: any; eventLog: any; isTextChangeable: any; }) {
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

	setValue(newValue: any) {
		this.value = newValue;
	}
	setText(newText: any) {
		this.text = newText;
	}
	setComment(newComment: any) {
		this.comment = newComment;
	}
	setPosition(newPosition: any) {
		this.position = this.isDraggable ? newPosition : this.position;
	}
	setIsActive(val: any) {
		this.isActive = this.isDeletable ? val : this.isActive;
	}
	setIsSelected(val: any) {
		this.isSelected = val;
	}
	setIsConnectorSelected(val: any) {
		this.isConnectorSelected = val;
	}

	setIsTextChangeable(val: any) {
		this.isTextChangeable = val;
	}

	updateNode(field: string, value: any) {
		if (field === "text") this.setText(value);
		if (field === "position") this.setPosition(value);
		if (field === "value") this.setValue(value);
		if (field === "comment") this.setComment(value);
		if (field === "isActive") this.setIsActive(value);
		if (field === "isSelected") this.setIsSelected(value);
		if (field === "isConnectorSelected") this.setIsConnectorSelected(value);
	}

	enterLog(log: { type: any; value: any; }) {
		// this.eventLog.push({
		// 	time: new Date().getTime(),
		// 	type: log.type,
		// 	value: log.value,
		// });
	}

	deletenode() {
		this.isActive = false;
	}

	isNode() {
		return true;
	}
}

export {Node};