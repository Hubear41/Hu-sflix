# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_09_185628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "genres", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "my_list_shows", force: :cascade do |t|
    t.integer "profile_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "show_id", null: false
    t.index ["profile_id", "show_id"], name: "index_my_list_shows_on_profile_id_and_show_id"
  end

  create_table "show_genres", force: :cascade do |t|
    t.integer "show_id", null: false
    t.integer "genre_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["show_id", "genre_id"], name: "index_show_genres_on_show_id_and_genre_id"
  end

  create_table "shows", force: :cascade do |t|
    t.string "title", null: false
    t.string "director", null: false
    t.string "tagline", null: false
    t.integer "year"
    t.string "maturity_rating"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "view_count", null: false
    t.string "show_type", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token"
  end

  create_table "videos", force: :cascade do |t|
    t.integer "show_id", null: false
    t.string "name", null: false
    t.string "description", null: false
    t.integer "runtime", null: false
    t.integer "credits_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "video_type", null: false
    t.integer "episode_num"
    t.index ["show_id"], name: "index_videos_on_show_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
