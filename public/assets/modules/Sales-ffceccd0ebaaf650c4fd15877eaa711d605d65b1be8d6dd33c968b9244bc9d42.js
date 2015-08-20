(function(){

	var app = angular.module("sales_module", []);

	app.controller('SalesController',[ '$http', '$scope', function($http, $scope){
		var self = this;
		this.products = [];
		this.products = JSON.parse($('#input_products').val());
		this.saveProducts = [];  
		this.productsVaucher = [];  
		this.productsTshirt = [];  
		console.log("loadSales");
		this.total_payment = 0;
		this.total_not_discount_payment = 0;

		this.addToCart = function(product){
			self.total_payment = 0;
			self.total_not_discount_payment = 0;
			var auxTotal = 0;
			var auxTotalDiscount = 0;
			var auxDiscountProduct = 0;
			var response_calculates = {};
			var auxTotalPayement = 0;
			var auxTotalNotDiscountPayement = 0;

			if (self.saveProducts.length == 0 && product.quantity > 0) {

				self.saveProducts.push(product);
				response_calculates = self.calculateTotal();
				//				self.saveProducts[0].discount = response_calculates.cfo.total_pay + response_calculates.marketing.total_pay;
				if(product.code === "VOUCHER"){
					//					debugger;
					self.saveProducts[ 0 ].discount = response_calculates.marketing.total_promo;
				}else if(product.code === "TSHIRT"){
					self.saveProducts[ 0 ].discount = response_calculates.cfo.total_promo;
				}else{
					console.log("IN")
					self.saveProducts[ 0 ].discount = self.saveProducts[ 0 ].price *  self.saveProducts[ 0 ].quantity;
				}				
			}else{
				var isSelf = false;
				$.each(self.saveProducts, function(i, obj){
					if (obj.code === product.code){
						isSelf = true;
						if (product.quantity == 0 || product.quantity == null){
							self.saveProducts.splice(i, 1);
							return false;
						}else{
							self.saveProducts[i] = product;
							response_calculates = self.calculateTotal();
							if(product.code === "VOUCHER"){
								self.saveProducts[ i ].discount = response_calculates.marketing.total_promo;
							}else if(product.code === "TSHIRT"){
								self.saveProducts[ i ].discount = response_calculates.cfo.total_promo;
							}else{
								self.saveProducts[ self.saveProducts.length-1 ].discount = self.saveProducts[ self.saveProducts.length-1 ].price * self.saveProducts[ self.saveProducts.length-1 ].quantity;	
							}
							return false;
						}
					}
				});

				if (isSelf == false && product.quantity > 0){
					self.saveProducts.push(product);
					response_calculates = self.calculateTotal();
					if(product.code === "VOUCHER"){
						self.saveProducts[ self.saveProducts.length-1 ].discount = response_calculates.marketing.total_promo;
					}else if(product.code === "TSHIRT"){
						self.saveProducts[ self.saveProducts.length-1 ].discount = response_calculates.cfo.total_promo;
					}else{
						self.saveProducts[ self.saveProducts.length-1 ].discount = self.saveProducts[ self.saveProducts.length-1 ].price * self.saveProducts[ self.saveProducts.length-1 ].quantity;
					}					


				}

			};
			
			$.each(self.saveProducts, function(i, obj){
				auxTotalPayement += obj.discount;
				auxTotalNotDiscountPayement += (obj.quantity * obj.price);

			})
				self.total_payment += auxTotalPayement;
				self.total_not_discount_payment += auxTotalNotDiscountPayement;
		};

		this.verifyMarketing  = function(){
			//			VOUCHER
			var auxTotalPromo = 0;
			var auxTotalPay = 0;

			var quatityPromo = parseInt(self.productsVaucher[0].quantity / 2);
			var quatityNotPromo = self.productsVaucher[0].quantity % 2;

			//			auxTotalPromo = (quatityPromo * self.productsVaucher[0].price);
			auxTotalPromo = ( self.productsVaucher[0].quantity * self.productsVaucher[0].price) - (quatityPromo  * self.productsVaucher[0].price);
			auxTotalNotPromo = (quatityNotPromo * self.productsVaucher[0].price);

			auxTotalPay = (auxTotalPromo + auxTotalNotPromo);

			var response = {
				total_promo: auxTotalPromo,
				total_not_promo: auxTotalNotPromo,
				total_pay: auxTotalPay,
				quantity_promos: quatityPromo
			};

			return response;
		}		

		this.verifyCFO  = function(){
			//			TSHIRT
			var auxTotalPromo = 0;
			var auxTotalPay = 0;

			var quatityPromo = 0;
			var quatityNotPromo = 0;
			var auxTotalNotPromo = 0;
			var auxValueQuantity = (self.productsTshirt[0].quantity * self.productsTshirt[0].price);

			if(self.productsTshirt[0].quantity >= 3){
				quatityPromo = self.productsTshirt[0].quantity;
				//				auxTotalPromo = (auxValueQuantity - ( auxValueQuantity - self.productsTshirt[0].quantity ));
				auxTotalPromo = (auxValueQuantity -   self.productsTshirt[0].quantity );
				auxTotalPay = auxTotalPromo;
			}else{
				quatityNotPromo =self.productsTshirt[0].quantity;
				auxTotalNotPromo = (self.productsTshirt[0].quantity * self.productsTshirt[0].price );
				auxTotalPromo = auxTotalNotPromo;
				auxTotalPay = auxTotalNotPromo;	
			}			


			var response = {
				total_promo: auxTotalPromo,
				total_not_promo: auxTotalNotPromo,
				total_pay: auxTotalPay,
				quantity_promos: quatityPromo
			};



			return response;
		}

		this.calculateTotal = function(){
			var total = 0;
			var response_marketing = {};
			var response_cfo = {};
			$.each(self.saveProducts, function(i, obj){
				if (obj.code === "TSHIRT"){
					self.productsTshirt.push(obj);
				}else if (obj.code === "VOUCHER"){
					self.productsVaucher.push(obj);
				}else{
					total += obj.price;
				}

			});

			if(self.productsVaucher.length >0){
				response_marketing = self.verifyMarketing();
			}
			if (self.productsTshirt.length > 0 ){
				response_cfo = self.verifyCFO();
			}
			total += response_marketing.total_pay;
			total += response_cfo.total_pay;

			var response={
				total: total,
				marketing: response_marketing,
				cfo: response_cfo
			}



			return response;

		}

	}]);



})();
