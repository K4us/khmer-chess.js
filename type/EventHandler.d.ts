export class EventHandler {
    constructor(options?: {});
    _onEventListeners: {};
    _propEvent: any[];
    events: any;
    _checkPropEvent(): void;
    _addPropEvent(event: any, data: any): void;
    _guardEventName(eventName: any): void;
    _checkOnEvent(eventName: any, data: any): void;
    _addOnEventListener(eventName: any, listener: any): void;
    _removeOnEventListener(eventName: any, listener: any): void;
}
