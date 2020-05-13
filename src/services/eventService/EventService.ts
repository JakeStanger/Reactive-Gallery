import IEvent from "./IEvent";

class EventService {
  private static _instance: EventService;

  public static getInstance(): EventService {
    if (EventService._instance) return EventService._instance;
    else {
      const instance = new EventService();
      EventService._instance = instance;
      return instance;
    }
  }

  public async getAll(): Promise<IEvent[]> {
    const events = await fetch("/api/event").then(r => r.json());

    if (events && !(events as any).msg) {
      return events;
    } else {
      console.error(events);
      return [];
    }
  }
}

export default EventService;
