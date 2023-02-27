class SalesTransactionsController < ApplicationController
    before_action :authorized

    def create
        transaction = SalesTransaction.create(transaction_params)
        current_user.salesTransactions << transaction
        params[:items].map do |item|
            transaction.sales<< Sale.new(item_id: item[:id], item_price_at_sale: item[:price_per_item], qty:item[:total_sold])
            itemSold = Item.find_by(id: item[:id])
            itemSold.update(qty: itemSold.qty - item[:total_sold])
        end
        render json: transaction, status: :created
    end

    def index
        render json: current_user.salesTransactions
    end

    private
    
    def transaction_params
        params.permit(:change, :amount, :recieved)
    end
end
