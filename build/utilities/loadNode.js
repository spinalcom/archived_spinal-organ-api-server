"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._load = void 0;
const spinalAPIMiddleware_1 = require("../spinalAPIMiddleware");
function _load(arrayofServerId, profileId) {
    return Promise.all(arrayofServerId.map(item => {
        return spinalAPIMiddleware_1.default.getInstance().load(item, profileId);
    }));
}
exports._load = _load;
//# sourceMappingURL=loadNode.js.map