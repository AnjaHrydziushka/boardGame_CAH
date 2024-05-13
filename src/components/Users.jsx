export default function Users({ data }) {
  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Score: {user.score}</p>
        </div>
      ))}
    </div>
  );
}
