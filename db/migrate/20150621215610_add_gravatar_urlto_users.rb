class AddGravatarUrltoUsers < ActiveRecord::Migration
  def change
    add_column :users, :gravatar_url, :string
    rename_column :users, :username, :email
  end
end
