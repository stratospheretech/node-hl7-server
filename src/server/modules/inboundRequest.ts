import { Message } from "node-hl7-client";
import { Socket } from "node:net";
import { HL7ListenerError } from "../../utils/exception.js";

/**
 * Inbound Request Props
 * @since 1.0.0
 */
export interface InboundRequestProps {
  type: string;
}

/**
 * Inbound Request
 * @since 1.0.0
 */
export class InboundRequest {
  /** @internal */
  private readonly _message?: Message;
  /** @internal */
  private readonly _fromType: string;
  /** @internal */
  private readonly _socket: Socket;

  public get message() {
    return this._message;
  }
  public get fromType() {
    return this._fromType;
  }
  public get socket() {
    return this._socket;
  }

  /**
   * @since 1.0.0
   * @param message
   * @param props
   * @param socket
   */
  constructor(message: Message, props: InboundRequestProps, socket: Socket) {
    this._fromType = props.type;
    this._message = message;
    this._socket = socket;
  }

  /** '
   * Get Stored Message
   * @since 1.0.0
   */
  getMessage(): Message {
    if (typeof this._message !== "undefined") {
      return this._message;
    }
    throw new HL7ListenerError("Message is not defined.");
  }

  getType(): string {
    return this._fromType;
  }

  getSocket(): Socket {
    return this._socket;
  }
}
