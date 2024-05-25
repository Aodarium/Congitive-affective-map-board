import uuid from 'uuid';
import Edge from './edge';
import Node from './node';

class Element {
  idCAM: string;
  creator: string;
  date: number;
  nodes: Node[];
  connectors: Edge[];
  currentID: string;
  currentNode: Node;
  hasSelectedNode: boolean;
  currentConnector: Edge;
  hasSelectedConnector: boolean;
  readyToMove: boolean;
  isIncoming: boolean;

  constructor() {
    this.idCAM = uuid.v4();
    this.creator = uuid.v4(); // id of the maker
    this.date = new Date().getTime(); // representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date
    this.nodes = [];
    this.connectors = [];
    this.currentID = '';
    this.currentNode = {} as Node;
    this.hasSelectedNode = false;
    this.currentConnector = {} as Edge;
    this.hasSelectedConnector = false;
    this.readyToMove = false;
    this.isIncoming = false;
  }

  addElement(newElement: Node | Edge) {
    const kind = newElement.getKind();
    switch (kind) {
      case 'Node':
        this.addNode(newElement as Node);
        break;
      case 'Connector':
        this.addConnector(newElement as Edge);
        break;
    }
  }

  updateElement(kind: string, field: any, value: any) {
    switch (kind) {
      case 'Node':
        if (this.currentNode != null) {
          this.currentNode.updateNode(field, value);
        }
        break;
      case 'Connector':
        if (this.currentConnector != null) {
          this.currentConnector.updateConnector(field, value);
        }
        break;
    }

    this.draw();
  }

  deleteElement(): boolean {
    if (this.hasSelectedNode) {
      return this.deleteNode();
    }

    if (this.hasSelectedConnector) {
      return this.deleteConnector();
    }
    return false;
  }

  addConnector(connector: Edge): boolean {
    if (this.isConnectorIn(connector) == false) {
      if (config.BidirectionalDefault) {
        connector.setBidirectional(true);
      }
      this.connectors.push(connector);
      return true;
    }
    connector = this.findConnector(connector);
    connector.isActive = true;
    return false;
  }

  isConnectorIn(connector: Edge): boolean {
    const st = this.findConnector(connector);
    if (st == undefined) return false;
    return true;
  }

  findConnector(connector: Edge): Edge {
    const connector1 = this.connectors.filter(
      (elt) =>
        (elt.target === connector.target && elt.source === connector.source) ||
        (elt.target === connector.source && elt.source === connector.target)
    );
    return connector1[0];
  }

  getConnectorById(id: string): Edge | null {
    for (const elt of this.connectors) {
      if (elt.id === id) return elt;
    }
    return null;
  }

  deleteConnector(): boolean {
    if (!this.currentConnector.getIsDeletable()) {
      console.log('This element cannot be deleted.');
      return false;
    }
    this.currentConnector.deleteConnection();
    this.unselectConnection();

    this.currentConnector = {} as Edge;
    this.hasSelectedConnector = false;

    return true;
  }

  addNode(node: Node): boolean {
    const elt = this.getNodeById(node.id);
    if (elt != null) {
      console.log('Already existing element.');
      return false;
    }
    this.nodes.push(node);
    console.log('Node has been added.');
    return true;
  }

  deleteNode(): boolean {
    const nodeID = this.currentNode.id;

    if (!this.currentNode.getIsDeletable()) {
      console.log('This element cannot be deleted.');
      return false;
    }

    this.connectors.forEach((connector) => {
      if (connector.target === nodeID || connector.source === nodeID) {
        connector.deleteConnection();
      }
    });

    this.currentNode.updateNode('active', false);
    this.unselectNode();

    this.currentNode = {} as Node;
    this.hasSelectedNode = false;
    return true;
  }

  getIndex(id: string, kind: string): number | null {
    switch (kind) {
      case 'Node':
        for (let index = 0; index < this.nodes.length; index++) {
          if (this.nodes[index].id === id) return index;
        }
        break;
      case 'Connector':
        for (let index = 0; index < this.connectors.length; index++) {
          if (this.connectors[index].id === id) return index;
        }
    }
    return null;
  }

  selecteNode(id: string): void {
    const index = this.getIndex(id, 'Node');
    if (!index) return;
    if (this.currentNode != null && this.nodes[index].id != this.currentNode.id) {
      const connector = new Edge();
      connector.establishConnection(this.currentNode.id, this.nodes[index].id, 1, true);
      this.addElement(connector);
      this.unselectNode();
      return;
    }

    this.hasSelectedNode = true;
    this.currentNode = this.nodes[index];
    this.currentID = this.currentNode.id;
    this.currentNode.updateNode('selected', !this.currentNode.isSelected);
  }

  unselectNode(): void {
    this.nodes.map((node) => {
      node.updateNode('selected', false);
    });
    this.currentNode = {} as Node;
    this.currentID = '';
    this.hasSelectedNode = false;
  }

  getNodeById(id: string): Node | null {
    for (const elt of this.nodes) {
      if (elt.id === id) return elt;
    }
    return null;
  }

  selectConnection(id: string): void {
    const index = this.getIndex(id, 'Connector');
    if (!index) return;
    this.currentConnector = this.connectors[index];
    this.currentConnector.isSelected = true;
    this.currentID = this.currentConnector.id;
    this.hasSelectedConnector = true;

    const source = this.getNodeById(this.currentConnector.source);
    const target = this.getNodeById(this.currentConnector.target);
    if (source && target) {
      source.updateNode('connector', true);
      target.updateNode('connector', true);
    }
  }

  unselectConnection(): void {
    const source = this.getNodeById(this.currentConnector.source);
    const target = this.getNodeById(this.currentConnector.target);
    if (source && target) {
      source.updateNode('connector', true);
      target.updateNode('connector', true);
    }
    this.currentConnector.isSelected = false;

    this.currentID = '';
    this.currentConnector = {} as Edge;
    this.hasSelectedConnector = false;
  }

  importElement(element: Node | Edge) {
    if (element.kind === 'Node') {
      const node = new Node(
        0,
        '',
        {
          x: 0,
          y: 0,
        },
        false,
        false
      );
      node.setNodeImport(element as Node);
      console.log('A node has been imported.');
      this.nodes.push(node);
    }

    if (element.kind === 'Connector') {
      const source = this.getNodeById(element.source);
      const target = this.getNodeById(element.target);
      const connector = new Edge();
      connector.establishConnection(source, target, element.intensity, element.agreement);
      connector.id = element.id;
      connector.isDeletable = element.isDeletable;

      this.connectors.push(connector);
    }
  }
}
