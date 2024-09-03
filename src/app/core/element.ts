import { Edge } from "./edge";
import { Node } from "./node";

import { v4 as uuidv4 } from 'uuid';

enum InputType {
    'Node', 'Edge'
}

class Elements {
    idCAM: any;
    creator: any;
    date: number;
    nodes: Node[];
    connectors: Edge[];
    currentID: null;
    currentNode: Node;
    hasSelectedNode: boolean;
    currentConnector: Edge;
    hasSelectedConnector: boolean;
    readyToMove: boolean;
    isIncoming: boolean;

	constructor() {
		this.idCAM = uuidv4();
		this.creator = uuidv4(); 
		this.date = new Date().getTime(); 
		this.nodes = [];
		this.connectors = [];
		this.currentID = null;
		this.currentNode = {} as Node;
		this.hasSelectedNode = false;
		this.currentConnector = {} as Edge;
		this.hasSelectedConnector = false;
		this.readyToMove = false;
		this.isIncoming = false;
	}

	/**
	 * Adds a new element to the diagram.
	 * @param {Object} newElement - The new element to be added.
	 * @returns {boolean} - Returns true if the element was added, false if it already exists.
	 */
	addElement(newElement: Node | Edge): boolean {
		const kind = newElement.kind;
		// if (kind === "Node") return this.addNode(newElement);
		// if (kind === "Connector") return this.addConnector(newElement);
        return false;
    }

	/**
	 * Updates the properties of an element in the diagram.
	 * @param {string} kind - The type of element to update. Can be "Node" or "Connector".
	 * @param {string} field - The name of the field to update.
	 * @param {any} value - The new value of the field.
	 */
	updateElement(kind: string, field: string, value: any) {
		switch (kind) {
			case "Node":
				if (this.currentNode != null) {
					this.currentNode.updateNode(field, value);
				}
				break;
			case "Connector":
				if (this.currentConnector != null) {
					this.currentConnector.updateConnector(field, value);
				}
				break;
		}
	}

	/**
	 * Deletes the currently selected element from the diagram.
	 * @returns {boolean} Returns true if the element was deleted, false if no element was selected.
	 */
	deleteElement(): boolean {
		if (this.hasSelectedNode) {
			return this.deleteNode();
		}

		if (this.hasSelectedConnector) {
			return this.deleteConnector();
		}
        return false;
	}

	/**
	 * Adds a new connector to the diagram.
	 * @param {Object} connector - The new connector to be added.
	 * @returns {boolean} - Returns true if the connector was added, false if it already exists.
	 */
	addConnector(connector: Edge): boolean {
		if (this.isConnectorIn(connector) == false) {
			// if (config.BidirectionalDefault) {
			// 	connector.bidirection = true;
			// }
			this.connectors.push(connector);
			console.log("Connector has been added.");
			return true;
		}
		// connector = this.findConnector(connector);
		connector.isActive = true;
		return false;
	}

	/**
	 * Checks if a connector is already present in the diagram.
	 * @param {Object} connector - The connector to be checked.
	 * @returns {boolean} - Returns true if the connector exists, false otherwise.
	 */
	isConnectorIn(connector: Edge): boolean {
		const st = this.findConnector(connector);
		if (st == undefined) return false;
		return true;
	}

	/**
	 * Searches for a connector in the diagram based on its properties.
	 * @param {Edge} connector - The connector whose properties are used for searching.
	 * @returns {Edge} - Returns the connector if found, undefined otherwise.
	 */
	findConnector(connector: Edge): Edge | undefined {
		const edge = this.connectors.find(
			(elt) =>
				(elt.target === connector.target &&
					elt.source === connector.source) ||
				(elt.target === connector.source &&
					elt.source === connector.target)
		);
		return edge;
	}

	/**
	 * Returns a connector based on its ID.
	 * @param {string} id - The ID of the connector.
	 * @returns {Object} - Returns the connector if found, null otherwise.
	 */
	getConnectorById(id: string): Edge {
		for (let elt of this.connectors) {
			if (elt.id === id) return elt;
		}
		return {} as Edge;
	}

	/**
	 * Deletes the currently selected connector from the diagram.
	 * @returns {boolean} - Returns true if the connector was deleted, false if no connector was selected.
	 */
	deleteConnector(): boolean {
		if (!this.currentConnector.isDeletable) {
			console.log("This element cannot be deleted.");
			return false;
		}
		this.currentConnector.deleteConnection();
		// this.unselectConnection();

		this.currentConnector = {} as Edge;
		this.hasSelectedConnector = false;

		return true;
	}

	/**
	 * Adds a new node to the diagram.
	 * @param {Object} node - The new node to be added.
	 * @returns {boolean} - Returns true if the node was added, false if it already exists.
	 */
	addNode(node: Node): boolean {
		const elt = this.getNodeById(node.id);
		if (elt != null) {
			// node already exists
			console.log("Node already exists.");
			return false;
		}
		this.nodes.push(node);
		console.log("Node added.");
		return true;
	}

	/**
	 * Deletes the currently selected node from the diagram.
	 * @returns {boolean} Returns true if the node was deleted, false if no node was selected.
	 */
	deleteNode(): boolean {
		const nodeID = this.currentNode.id;

		if (!this.currentNode.isDeletable) {
			// This element cannot be deleted.
			console.log("This element cannot be deleted.");
			return false;
		}

		// Delete connections associated with the node.
		this.connectors.forEach((connector) => {
			if (connector.target === nodeID || connector.source === nodeID) {
				connector.deleteConnection();
			}
		});

		// Deactivate the node.
		this.currentNode.updateNode("isActive", false);

		// Unselect the node.
		this.unselectNode();

		// Clear the current node reference.
		this.currentNode = {} as Node;

		// Indicate that no node is currently selected.
		this.hasSelectedNode = false;

		return true;
	}

	/**
	 * Returns the index of an element in the diagram based on its ID.
	 * @param {string} id - The ID of the element.
	 * @param {string} kind - The type of element. Can be "Node" or "Connector".
	 * @returns {number} - Returns the index of the element if found, -1 otherwise.
	 */
	getIndex(id: string, kind: string): number {
		switch (kind) {
			case "Node":
				for (let index = 0; index < this.nodes.length; index++) {
					if (this.nodes[index].id === id) return index;
				}
				break;
			case "Connector":
				for (let index = 0; index < this.connectors.length; index++) {
					if (this.connectors[index].id === id) return index;
				}
		}
		return -1;
	}

	/**
	 * Selects a node in the diagram based on its ID.
	 * @param {string} id - The ID of the node.
	 */
	selecteNode(id: string) {
		const index = this.getIndex(id, "Node");
		if (
			this.currentNode != null &&
			this.nodes[index].id != this.currentNode.id
		) {
			// If the selected node is not the same as the node with the given ID,
			// create a new connector between the two nodes.
			let connector = new Edge();
			connector.establishConnection(
				this.currentNode,
				this.nodes[index],
				1,
				1
			);
			this.addElement(connector);
			this.unselectNode();
			return;
		}
		// Set the current node to the node with the given ID.
		this.hasSelectedNode = true;
		this.currentNode = this.nodes[index];
		this.currentID = this.currentNode.id;
		// Update the appearance of the selected node.
		this.currentNode.updateNode("isSelected", true);

		// Remove the selected node from the list of nodes.
		this.nodes.splice(this.nodes.indexOf(this.currentNode), 1);
		// Add the node to the end of the list.
		this.nodes.push(this.currentNode);
	}

	/**
	 * Unselects the currently selected node.
	 */
	unselectNode() {
		this.nodes.map((node) => {
			node.updateNode("isSelected", false);
		});
		this.currentNode = {} as Node;
		this.currentID = null;
		this.hasSelectedNode = false;
	}

	/**
     * Selects a node in the diagram based on its ID.
     * @param {string} id - The ID of the node.
     */
	getNodeById(id: string) {
		for (let elt of this.nodes) {
			if (elt.id === id) return elt;
		}
		return null;
	}

	// /**
	//  * Selects a connection in the diagram based on its ID.
	//  * @param {string} id - The ID of the connection.
	//  */
	// selectConnection(id: string) {
	// 	const index = this.getIndex(id, "Connector");
	// 	this.currentConnector = this.connectors[index];
	// 	this.currentConnector.isSelected = true;
	// 	this.currentID = this.currentConnector.id;
	// 	this.hasSelectedConnector = true;

	// 	const source = this.getNodeById(this.currentConnector.source);
	// 	const target = this.getNodeById(this.currentConnector.target);

	// 	target.updateNode("isConnectorSelected", true);
	// 	source.updateNode("isConnectorSelected", true);
	// }

	// /**
	//  * Unselects the currently selected connection.
	//  */
	// unselectConnection() {
	// 	const source = this.getNodeById(this.currentConnector.source);
	// 	const target = this.getNodeById(this.currentConnector.target);

	// 	target.updateNode("isConnectorSelected", false);
	// 	source.updateNode("isConnectorSelected", false);

	// 	this.currentConnector.isSelected = false;

	// 	this.currentID = null;
	// 	this.currentConnector = {} as Edge;
	// 	this.hasSelectedConnector = false;
	// }

	/**
	 * Imports an element into the diagram.
     * @param {Object} element - The element to be imported.
	 */
	importElement(element: Node | Edge) {
		if (element.kind === "Node") {
			let node = new Node(0, "");
			node.setNodeImport(element);
			this.nodes.push(node);
		}

		if (element.kind === "Connector") {
			const source = this.getNodeById(element.source);
			const target = this.getNodeById(element.target);
			let connector = new Edge();
			connector.establishConnection(
				source,
				target,
				element.intensity,
				element.agreement
			);
			connector.id = element.id;
			connector.isDeletable = element.isDeletable;

			this.connectors.push(connector);
		}
	}
}

export { Elements as Toto };