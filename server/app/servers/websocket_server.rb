# frozen_string_literal: true

module WebSocketServer
  def self.call(env)
    conn = Protocol::WebSocket.new(env)
    conn.response
  rescue NotWebsocketRequest
    [200, { 'Content-Type' => 'text/plain' }, []]
  end
end
