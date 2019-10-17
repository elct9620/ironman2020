# frozen_string_literal: true

class Inflector < Zeitwerk::Inflector
  def camelize(basename, _abspath)
    case basename
    when 'websocket' then 'WebSocket'
    when 'websocket_server' then 'WebSocketServer'
    else
      super
    end
  end
end
