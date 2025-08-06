defmodule Backend.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Bcrypt

  schema "users" do
    field :name, :string
    field :role, :string, default: "user"
    field :email, :string
    field :password_hash, :string

    field :password, :string, virtual: true

    timestamps(type: :utc_datetime)
  end

  @doc false
  def registration_changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password, :role])
    |> validate_required([:name, :email, :password, :role])
    |> validate_length(:password, min: 8)
    |> validate_format(:email, ~r/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    |> validate_inclusion(:role, ["user", "admin"])
    |> unique_constraint(:email)
    |> put_password_hash()
  end

  defp put_password_hash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(changeset, :password_hash, Bcrypt.hash_pwd_salt(pass))
      _ ->
        changeset
    end
  end
end
