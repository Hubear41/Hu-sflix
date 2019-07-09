class Api::MyListShowsController < ApplicationController 
    def create 
        my_list_show = MyListShow.new(my_list_params)

        if my_list_show.save
            @user = User.find(my_list_show.profile_id)
            render 'api/users/show'
        else
            render json: my_list_show.errors.full_messages
        end
    end

    def destroy 
        my_list_show = MyListShow.find_by(profile_id: params[:profile_id], show_id: params[:show_id])        
        my_list_show.destroy
        
        @user = User.find(my_list_show.profile_id)
        render 'api/users/show'
    end

    private

    def my_list_params 
        params.require(:my_list).permit(:show_id, :profile_id)
    end
end