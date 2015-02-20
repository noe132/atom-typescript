var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var view = require('./view');
var $ = view.$;
var AwesomePanelView = (function (_super) {
    __extends(AwesomePanelView, _super);
    function AwesomePanelView(options) {
        _super.call(this);
    }
    AwesomePanelView.content = function () {
        var _this = this;
        return this.div({ class: 'awesome' }, function () { return _this.div({ class: 'dude', outlet: 'something' }); });
    };
    AwesomePanelView.prototype.initialize = function () {
        this.something.html('<div>tada</div>');
    };
    return AwesomePanelView;
})(view.View);
exports.AwesomePanelView = AwesomePanelView;
exports.panelView;
exports.panel;
function attach() {
    exports.panelView = new AwesomePanelView();
    exports.panel = atom.workspace.addModalPanel({ item: view, priority: 1000, visible: false });
}
exports.attach = attach;