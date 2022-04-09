require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with a email and password" do
    user = User.new(
        name: "hoge1",
        email: "hogehoge@gmail.com",
        password: "password"
    )
    expect(user).to be_valid
  end
 
  it "is invalid without a name" do
    user = User.new(
      email: "hogehoge@gmail.com",
      password: "password"
    )
    expect(user).not_to eq be_valid
  end
  
  it "is invalid without an email address" do
    user = User.new(
      name: "hoge1",
      password: "password"
    )
    expect(user).not_to eq be_valid
  end

  it "is invalid without a duplicate email address" do
    user = User.new(
      name: "hoge1",
      email: "hogehoge@gmail.com",
      password: "password"
    )
    expect(user["email"]).not_to eq "hogehoge_1@gmail.com"
  end
  # pending "add some examples to (or delete) #{__FILE__}"
end
