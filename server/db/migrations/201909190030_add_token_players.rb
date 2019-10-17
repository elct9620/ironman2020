# frozen_string_literal: true

Sequel.migration do
  change do
    alter_table :players do
      add_column :token, String
    end
  end
end
