# frozen_string_literal: true

Sequel.migration do
  change do
    create_table :players do
      primary_key :id
      String :name, null: false, index: true, unique: true
      Integer :x, default: 0
      Integer :y, default: 0
      String :avatar_name, default: 'Actor1'
      Integer :avatar_index, default: 0
    end
  end
end
