class User < ApplicationRecord
    validates :password_digest, :session_token, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, length: { minimum: 6 }, allow_nil: true

    attr_reader :password
    after_initialize :ensure_session_token
    
    def self.find_by_credentials(email, password) 
        user = User.find_by(email: email)
        
        return nil if user.nil?
        return user if user && user.is_password?(password)
    end

    def is_password?(password)
        curr_password = BCrypt::Password.new(self.password_digest);

        curr_password.is_password?(password)
    end

    def password=(password)
        @password = password

        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save

        self.session_token
    end

    private

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
end 