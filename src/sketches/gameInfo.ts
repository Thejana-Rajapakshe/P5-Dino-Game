enum gameEvent {
    newHighScore,
}


class gameInfoEvent {

    private listeners: Array<{event: gameEvent, callback: ((arg?: any) => void)}> = [];

    constructor() {
    
    }

    public add(event: gameEvent, callback: (arg?: any) => void) {
        this.listeners.push({
            event: event, callback: callback
        });
    }

    public emit(event: gameEvent, data? : any) {
        this.listeners.forEach((listener) => {
            if(listener.event === event){
                data!==undefined ?  listener.callback(data) : listener.callback();
            }
        })
    }
}

export default gameInfoEvent;
export {gameEvent}