class CreateSessionsTable < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.integer :user_id, null: false
      t.string :token, null: false

      t.timestamps
    end

    add_index :sessions, :token
    remove_column :users, :session_token
  end
end
