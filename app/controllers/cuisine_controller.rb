class CuisineController < ApplicationController
  def index
    @cuisines = Cuisine.all
  end

  def new
    @cuisine = Cuisine.new
  end

  def create
    @cuisine = Cuisine.new(cuisine_params)

    respond_to do |format|
      if @cuisine.save
        format.json { render :show, status: :created, location: @cuisine }
      else
        format.json { render json: @cuisine.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @cuisine.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
  end

  def update
    respond_to do |format|
      if @cuisine.update(cuisine_params)
        format.html { redirect_to @cuisine, notice: 'Restaurant was successfully updated.' }
        format.json { render :show, status: :ok, location: @cuisine }
      else
        format.html { render :edit }
        format.json { render json: @cuisine.errors, status: :unprocessable_entity }
      end
    end
  end

  def show; end

  def edit; end

  private

  def set_cuisine
    @cuisine = Cuisine.find(params[:id])
  end

  def cuisine_params
    params.require(:cuisine).permit(:name, :icon)
  end


end
