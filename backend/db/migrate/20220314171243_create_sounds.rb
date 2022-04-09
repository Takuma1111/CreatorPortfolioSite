class CreateSounds < ActiveRecord::Migration[6.0]
  def change
    create_table :sounds do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.text :text
      t.text :url

      t.timestamps
    end
  end
end
