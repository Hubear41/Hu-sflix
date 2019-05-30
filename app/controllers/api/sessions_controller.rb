class Api::SessionsController < ApplicationController
    def create
        errors = []
        errors.concat(['email']) if params[:user][:email] == ""
        errors.concat(['password']) if params[:user][:password] == ""  

        if errors.empty?
            @user = User.find_by_credentials(
                params[:user][:email],
                params[:user][:password]
            )
            
            unless @user.nil?
                login!(@user)

                render :create
            else
                render json: ['login'], status: 401
            end    
        else
            render json: errors, status: 404 
        end
    end

    def destroy
        user = User.find(params[:id])
        
        if user
            logout!

            render json: {}
        else
            render json: 'Can not logout if not logged', status: 404
        end
    end
end