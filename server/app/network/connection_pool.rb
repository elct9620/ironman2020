# frozen_string_literal: true

class ConnectionPool
  include Enumerable

  def initialize
    @mutex = Mutex.new
    @connections = []
  end

  def each(&block)
    @connections.each(&block)
  end

  def add(conn)
    @mutex.synchronize do
      @connections.push(conn)
    end
  end

  def remove(conn)
    @mutex.synchronize do
      @connections.delete(conn)
    end
  end
end
