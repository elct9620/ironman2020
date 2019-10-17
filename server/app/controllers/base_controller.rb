# frozen_string_literal: true

class BaseController
  attr_accessor :conn

  def initialize(conn)
    @conn = conn
  end

  def response(command, *parameters)
    @conn.write({
      command: command,
      parameters: parameters
    }.to_json)
  end

  def broadcast(command, *parameters)
    @conn.broadcast({
      command: command,
      parameters: parameters
    }.to_json)
  end

  def current_player
    @conn.player
  end

  def negotiate(id, _token)
    player = Player[id]
    return response(:negotiate, false) if player.nil?

    @conn.player = player
    response(:negotiate, true)
  end

  def execute(command, parameters = [])
    return unless respond_to?(command)
    return if command != 'negotiate' && current_player.nil?

    send(command, *parameters)
  end
end
