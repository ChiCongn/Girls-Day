export class Image {

    constructor(id, source, owner, message) {
        this.id = id;
        this.source = source;
        this.owner = owner;
        this.message = message;
    }

    displayInfo() {
        return `Owner: ${this.owner}, Message: ${this.message}`;
    }

    getId() {
        return this.id;
    }

    getSource() {
        return this.source;
    }

    getOwner() {
        return this.owner;
    }

    getMessage() {
        return this.message;
    }

    setId(id) {
        this.id = id;
    }

    setSource(source) {
        this.source = source;
    }

    setOwner(owner) {
        this.owner = owner;
    }

    setMessage(message) {
        this.message = message;
    }
    
}