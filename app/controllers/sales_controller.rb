class SalesController < ApplicationController
  def index
	  @products = Product.actives
  end

  def show
  end
end
