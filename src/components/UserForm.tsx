import "../styles/UserFormStyles.css";
export const UserForm = () => {
  return (
    <section className="form-user-container">
      <form >
      <h4 style={{
        marginBottom:'30px'
      }}>CREATE USER</h4>
        <input type="text" name="" placeholder="name" />
        <input type="text" name="" placeholder="" />
        <input type="text" name="" placeholder="" />
        <input type="text" name="" placeholder="" />
        <input type="submit" value="Create user" />
      </form>
    </section>
  );
};
