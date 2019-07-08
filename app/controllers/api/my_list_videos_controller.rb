class Api::MyListVideosController < ApplicationController 
    def create 
        my_list_video = MyListVideo.new(my_list_params)

        if my_list_video.save
            @user = User.find(params[:user_id]);
            render 'api/users/user'
        else
            render json: my_list_video.full_error_messages
        end
    end

    def destroy 
        my_list_video = MyListVideo.find(params[:id]);
        @user = User.find(my_list_video.user_id);

        my_list_video.destroy
        render 'api/users/user'
    end

    private

    def my_list_params 
        params.require(:my_list).permit(:video_id, :user_id)
    end
end