# frozen_string_literal: true

module Protocol
  class WebSocket
    class NotWebsocketRequest < RuntimeError; end

    def initialize(env)
      @env = env
      @conn = Connection.new(self)
      setup
    end

    def write(data)
      @ws.send(data)
    end

    def websocket?
      Faye::WebSocket.websocket?(@env)
    end

    def response
      @ws.rack_response
    end

    private

    def open(event)
      # TODO: Register Connection
      @conn.open(event)
    end

    def receive(event)
      @conn.receive(event)
    end

    def close(event)
      # TODO: Unregister Connection
      @conn.close(event)
    end

    def setup
      raise NotWebsocketRequest unless websocket?

      @ws = Faye::WebSocket.new(@env)
      @ws.on :open, method(:open)
      @ws.on :message, method(:receive)
      @ws.on :close, method(:close)
    end
  end
end
