# frozen_string_literal: true

require 'json'

class Connection
  class << self
    def pool
      @pool ||= ConnectionPool.new
    end

    def players
      pool.map(&:player)
    end
  end

  attr_accessor :player

  def initialize(socket)
    @socket = socket
    @controller = SimpleRPG.controller.new(self)
  end

  def write(data)
    @socket.write(data)
  end

  def broadcast(data)
    Connection.pool.each do |conn|
      conn.write(data)
    end
  end

  def open(_event)
    Connection.pool.add(self)
  end

  def receive(event)
    data = JSON.parse(event.data)
    @controller.execute(data['command'], data['parameters'])
  end

  def close(_event)
    Connection.pool.remove(self)
  end
end
