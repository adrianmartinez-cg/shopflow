defmodule Backend do
  use Application
  def start(_type,_args) do
    IO.puts(Backend.hello())
    Supervisor.start_link([], strategy: :one_for_one)
  end

  def hello do
    :world
  end

end
