require 'factory_bot_rails'
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  FactoryBot.definition_file_paths = [File.expand_path('../factories', __FILE__)]
end