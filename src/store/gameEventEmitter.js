function createGameEventEmitter() {
  const eventListeners = [];

  function* waitForEvent(type, payload = {}) {
    while (true) {
      const event = yield;
      if (!type || event.type === type) {
        return event;
      }
    }
  }

  class GameEventEmitter {
    emit(type, payload) {
      eventListeners.forEach(eventListener =>
        eventListener.next({ type, payload })
      );
    }

    addListener(generatorFunc) {
      const generator = generatorFunc({ waitForEvent });
      generator.next();
      eventListeners.push(generator);
    }
  }

  return new GameEventEmitter();
}

export default createGameEventEmitter();

export const EVENT_GAME_STARTED = "EVENT_GAME_STARTED";
export const EVENT_GAME_FINISHED = "EVENT_GAME_FINISHED";
export const EVENT_GAME_CLOSED = "EVENT_GAME_CLOSED";
export const EVENT_SCORE_CHANGED = "EVENT_SCORE_CHANGED";
export const EVENT_GOAL = "EVENT_GOAL";
export const EVENT_OWN_GOAL = "EVENT_OWN_GOAL";
export const EVENT_UNDO_GOAL = "EVENT_UNDO_GOAL";
