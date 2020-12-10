const Message = require("./Message");

class ErrorMessage extends Message {
    constructor(status_code, message) {
        super(message);
        this.status_code = status_code;
    }
}

module.exports = ErrorMessage