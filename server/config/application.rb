# frozen_string_literal: true

require 'rubygems'
require 'bundler'
require 'singleton'
require 'logger'

Bundler.require

require 'config/inflector'

class SimpleRPG
  include Singleton

  class << self
    attr_accessor :controller

    def run!(server)
      instance.run!(server)
    end

    def migrate!
      Sequel.extension :migration
      Sequel.connect(database_url, logger: Logger.new($stderr)) do |db|
        Sequel::Migrator.run(
          db,
          "#{root}/db/migrations",
          use_transactions: true
        )
      end
    end

    def root
      @root ||= File.absolute_path('../..', __FILE__)
    end

    def database_url
      ENV['DATABASE_URL'] ||
        "sqlite://#{root}/db/development.sqlite"
    end

    def database
      @database ||=
        Sequel.connect(database_url)
    end
  end

  def initialize
    @fsevent = FSEvent.new
    @loader = Zeitwerk::Loader.new
    @autoload_paths = Dir["#{self.class.root}/app/*"]
    self.class.database # Prepare Database
    setup_loader
    setup_auto_reloading
  end

  def setup_loader
    @loader.inflector = Inflector.new
    @autoload_paths.each do |path|
      @loader.push_dir(path)
    end
  end

  def setup_auto_reloading
    return if ENV['DEV'].nil?

    @loader.enable_reloading
    @fsevent.watch @autoload_paths do |path|
      @loader.reload
    end
  end

  def run!(server)
    @loader.setup
    Thread.new { @fsevent.run } if ENV['DEV']
    SimpleRPG.controller = controller_of(server)
    Rack::Handler.default.run(WebSocketServer)
  end

  def controller_of(server)
    Kernel.const_get("#{server.capitalize}Controller")
  end
end
