const Output = require('static-console/output');

module.exports = class DomOutput extends Output {
	constructor(options) {
		super(options);

		if (this._rootNode === undefined) this.rootNode = null;
		if (this._messageTagName === undefined) this.messageTagName = 'p';
		if (this._messageAttributes === undefined) this.messageAttributes = { class: 'message[ $T]' };
		if (this._regularType === undefined) this.regularType = 'regular';
	}

	get rootNode() { return this._rootNode; }
	set rootNode(val) { this._rootNode = val; }// DOMElement val
	get messageTagName() { return this._messageTagName; }
	set messageTagName(val) { this._messageTagName = val; }// string val
	get messageAttributes() { return this._messageAttributes; }
	set messageAttributes(val) { this._messageAttributes = val; }// object val
	get regularType() { return this._regularType; }
	set regularType(val) { this._regularType = val; }// string val

	print(model) {
		if (!this.enabled) return;
		if (!this.rootNode) return;
		var type = model.type || this.regularType;
		var node = document.createElement(this.messageTagName);
		var attrs = this.convertMessageAttributes(type);
		for (let attr in attrs) node.setAttribute(attr, props[attr]);
		node.innerHTML = model.data;
		this.rootNode.append(node);
	}

	convertMessageAttributes(type) {
		var attrs = {};
		for (let attr in this.messageAttributes) {
			var value = this.messageAttributes[attr];
			if (typeof value == 'string') {
				value = value.replace(/\[(.*?)\]/, type ? '$1' : '')
				value = value.replace(/\$T/, type || '');
			}
			attrs[attr] = value;
		}
		return attrs;
	}
}