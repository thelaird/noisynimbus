class UpdateUsersColumns < ActiveRecord::Migration
  def change
    rename_column :users, :email, :username
    add_column :users, :email, :string, null: false
  end
end
