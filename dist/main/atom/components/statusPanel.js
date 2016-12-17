"use strict";
const dom = require("jsx-render-dom");
const path_1 = require("path");
const atomUtils_1 = require("../atomUtils");
class StatusPanel extends HTMLElement {
    createdCallback() {
        const nodes = [
            dom.createElement("div", { ref: el => this.version = el, className: "inline-block" }),
            dom.createElement("a", { ref: el => this.pendingContainer = el, className: "inline-block", href: "", onClick: evt => {
                    evt.preventDefault();
                    this.showPendingRequests();
                } },
                dom.createElement("span", { ref: span => this.pendingCounter = span }),
                dom.createElement("span", { ref: span => this.pendingSpinner = span, className: "loading loading-spinner-tiny inline-block", style: { marginLeft: "5px", opacity: 0.5, verticalAlign: "sub" } })),
            dom.createElement("a", { ref: el => this.configPathContainer = el, className: "inline-block", href: "", onClick: evt => {
                    evt.preventDefault();
                    this.openConfigPath();
                } })
        ];
        for (const node of nodes) {
            this.appendChild(node);
        }
        this.setVersion(null);
        this.setPending([]);
        this.setTsConfigPath(null);
    }
    attachedCallback() {
        console.log("attached");
    }
    attributeChangedCallback() {
        console.log("attrs changed", arguments);
    }
    dispose() {
        this.remove();
    }
    openConfigPath() {
        if (this.configPath && !this.configPath.startsWith("/dev/null")) {
            atomUtils_1.openFile(this.configPath);
        }
        else {
            atom.notifications.addInfo("No tsconfig for current file");
        }
    }
    setTsConfigPath(configPath) {
        this.configPath = configPath;
        if (configPath) {
            this.configPathContainer.textContent = configPath.startsWith("/dev/null") ? "No project" :
                path_1.dirname(atomUtils_1.getFilePathRelativeToAtomProject(configPath));
            this.configPathContainer.classList.remove("hide");
        }
        else {
            this.configPathContainer.classList.add("hide");
        }
    }
    setVersion(version) {
        if (version) {
            this.version.textContent = version;
            this.version.classList.remove("hide");
        }
        else {
            this.version.classList.add("hide");
        }
    }
    setPending(pending) {
        this.pendingRequests = pending;
        if (pending.length) {
            this.pendingContainer.classList.remove("hide");
            this.pendingCounter.textContent = pending.length.toString();
        }
        else {
            this.pendingContainer.classList.add("hide");
        }
    }
    showPendingRequests() {
        if (this.pendingRequests) {
            atom.notifications.addInfo("Pending Requests: <br/> - " + this.pendingRequests.join("<br/> - "));
        }
    }
    show() {
        this.style.display = "block";
    }
    hide() {
        this.style.display = "none";
    }
    static create() {
        return document.createElement("ts-status-panel");
    }
}
exports.StatusPanel = StatusPanel;
document.registerElement('ts-status-panel', StatusPanel);
