class Product < ActiveRecord::Base
	
	def self.actives
		all
	end
end
