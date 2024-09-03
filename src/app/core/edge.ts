import { v4 as uuidv4 } from 'uuid';

class Edge {
    id: any;
    value: null;
    source: null;
    target: null;
    agreement: number;
    isActive: boolean;
    date: number;
    kind: string;
    isSelected: boolean;
    intensity: any;
    isDeletable: boolean;
    isOver: boolean;
    isBidirectional: boolean;
    eventLog: never[];
    shape!: string;
    
	constructor(isDeletable = true) {
		this.id = uuidv4(); 
		this.value = null;
		this.source = null;
		this.target = null;
		this.agreement = 0; // shape of line
		this.isActive = true;
		this.date = new Date().getTime(); // representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date
		this.kind = "Edge"; // information for drawing edges / nodes
		this.isSelected = false;
		this.intensity = 1; // 3
		this.isDeletable = isDeletable;
		this.isOver = false;
		this.isBidirectional = true;
		this.eventLog = [];
	}

	/**
	 * This function sets a directional connection between a source and a target.
	 */
	setDirectional() {
		this.isBidirectional = false;
		const tmp_source = this.source;
		this.source = this.target;
		this.target = tmp_source;
	}

	/**
	 * This function sets the shape of a connection between a source and a target.
	 */
	setShape() {
        if (!this.value) return;
		if (this.value < 0) this.shape = "negative";
		if (this.value > 0) this.shape = "positive";
		if (this.value == 0) this.shape = "neutral";
	}

	/**
	 * This function establishes a connection between a source and a target with a given intensity and agreement value.
	 * @param {string} field - Field of the connector to update.
	 * @param {any} value - New value of the field.
	 */
	updateConnector(field: string, value: any) {
		this.enterLog(field, value);
		if (field === "value") this.value = value;
		if (field === "isSelected") this.isSelected = value;
		if (field === "agreement") this.agreement = value;
		if (field === "bidirection") this.isBidirectional = value;
		if (field === "direction") this.setDirectional();
		if (field === "isActive")
			this.isActive = this.isDeletable ? value : this.isActive;
	}

	/**
	 * This function establishes a connection between a source and a target with a given intensity and agreement value.
	 * @param {Node} source - Node corresponding to the source.
	 * @param {Node} target - Node corresponding to the target.
	 * @param {int} intensity - Intensity of the connection.
	 * @param {boolean} agreement - Is the connection an agreement.
	 */
	establishConnection(source: { id: null; }, target: { id: null; }, intensity: any, agreement: number) {
		this.agreement = agreement;
		this.date = new Date().getTime();
		this.source = source.id;
		this.target = target.id;
		this.isActive = true;
		this.agreement = agreement;
		this.intensity = intensity;
		this.isBidirectional = false;

		this.enterLog("create connection", null);
	}

	/**
	 * This function makes a connection between a source and a target bidirectional
	 */
	makeBidirectionalConnection() {
		this.enterLog("create bidirectional connection", "<-->");
		this.isBidirectional = true;
	}

	/**
	 * This function makes a connection between a source and a target directional.
	 */
	makeUnidirectionalConnection() {
		this.enterLog("create unidirectional connection", "<--|-->");

		this.isBidirectional = false;

		const tmp_source = this.source;
		this.source = this.target;
		this.target = tmp_source;
	}

	/**
	 * This function deletes a connection between a source and a target if it exists.
	 * @returns success of the deletion
	 */
	deleteConnection() {
		this.enterLog("isActive", false);

		this.isActive = false;
		console.log("The connection has been destroyed.");
		return true;
	}

	enterLog(type: string, value: string | boolean | null) {
		// this.eventLog.push({
		// 	time: new Date().getTime(),
		// 	type: type,
		// 	value: value,
		// });
	}
}

export {Edge};