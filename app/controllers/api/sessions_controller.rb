class Api::SessionsController < ApplicationController
    def create
        @user = User.find_by_credentials(
            email: params[:user][:email],
            password: params[:user][:password]
        )

        if @user
            login!(@user)

            render :show
        else
            render json: 'Invalid Email or Password', status: 401
        end
    end

    def destroy
        user = User.find(params[:id])

        if user
            user.destroy
            logout(user)

            render json: {}
        else
            render json: 'Can not logout if not logged', status: 404
        end
    end
end