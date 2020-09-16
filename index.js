class Newspaper {
    constructor(reducer) {
        this.reducer = reducer;
        this.events = {};
    }

    pushEventHandler(event_name, handler) {
        let list = this.events[event_name];
        if (list) {
            list.push(handler);
        } else {
            this.events[event_name] = [handler];
        }
    }

    removeEventHandler(event_name, handler) {
        let list = this.events[event_name];
        if (! list) {
            return;
        }

        const idx = list.findIndex((item) => item === handler);

        if (idx > -1) {
            list.splice(idx, 1);
        }
    }

    subscribe(events, handler) {
        const type = typeof (events);

        if (type === 'string') {
            this.pushEventHandler(events, handler);
        } else {
            events.map((e) => {
                this.pushEventHandler(e, handler);
            });
        }
    } // subscribe

    unsubscribe(events, handler) {
        const type = typeof (events);

        if (type === 'string') {
            this.removeEventHandler(events, handler);
        } else {
            events.map((e) => {
                this.removeEventHandler(e, handler);
            });
        }
    }

    publish(event) {
        if(!event || !event.type) {
            return;
        }

        let list = this.events[event.type];
        if(! list) {
            return;
        }

        list.map((handler)=>{
            handler(event);
        });
    }

    interview(event) {
        if(!event || !event.type) {
            return;
        }
        this.reducer(event);
    }
}

module.exports = {
    Newspaper
}