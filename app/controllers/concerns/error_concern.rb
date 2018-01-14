module ErrorConcern
  extend ActiveSupport::Concern

  included do

    rescue_from(Exception) do |e|
      render_error(e.message, :internal_server_error)
    end

    rescue_from(ActionController::ParameterMissing) { |e| render_error(e.message, :bad_request, param: e.param) }
    rescue_from(ActionController::BadRequest) { |e| render_error(e.message, :bad_request) }
    rescue_from(ActiveRecord::StatementInvalid) { |e| render_error(e.message, :bad_request) }

    rescue_from(ActiveRecord::RecordInvalid) do |e|
      render_error(e.message, :bad_request, errors: e.record.errors.full_messages)
    end
    rescue_from(ActiveRecord::RecordNotFound) do |e|
      render_error(e.message, :not_found)
    end

    def render_error(message, status, info = {})
      render json: { message: message }.merge(info), status: status
    end


  end
end