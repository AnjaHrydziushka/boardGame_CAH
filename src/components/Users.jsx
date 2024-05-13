import "../styles/Users.css";

export default function Users({ data }) {
  return (
    <div className="users-container">
      <div className="space-for-image"></div>
      {data.map((user) => (
        <div key={user.id} className="user">
          <b>{user.name}</b>
          <p>Score: {user.score}</p>
        </div>
      ))}
    </div>
  );
}
