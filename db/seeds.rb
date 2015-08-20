# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

products = Product.create([{ name: 'Cabify Voucher', code: 'VOUCHER', price: 5 }, { name: 'Cabify T-Shirt', code: 'TSHIRT', price: 20 }, { name: 'Cafify Coffee Mug', code: 'MUG', price: 7.5 }])