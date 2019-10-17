# frozen_string_literal: true

class Player < Sequel::Model
  def move_to(x, y)
    self.x = x
    self.y = y
    save
  end

  def change_avatar(idx)
    self.avatar_index = idx
    save
  end
end
