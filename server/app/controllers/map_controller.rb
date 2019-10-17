# frozen_string_literal: true

class MapController < BaseController
  def join
    broadcast(:join, current_player.id, current_player.avatar_index, current_player.x, current_player.y)
  end

  def player_list
    items = Connection.players.map do |player|
      [player.avatar_id, player.avatar_index, player.x, player.y]
    end

    response(:player_list, items)
  end

  def move(x, y)
    current_player.move_to(x, y)
    broadcast(:move, current_player.id, current_player.x, current_player.y)
  end

  def avatar(idx)
    current_player.change_avatar(idx)
    broadcast(:avatar, current_player.id, current_player.avatar_index)
  end
end
