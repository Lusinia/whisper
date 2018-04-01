// type ChatEvent = "connect" | "disconnect";
// let foo: ChatEvent;
// foo = "connect";
// foo = "disconnect";
// todo fix string enum
export enum ChatEvent {
  CONNECT = 'connect'  as any,
  EVENT = 'event' as any,
  MESSAGE = 'message' as any,
  DISCONNECT = 'disconnect'  as any
}
