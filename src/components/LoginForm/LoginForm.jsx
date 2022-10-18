import { useState, useContext } from 'react';
import { AuthContext } from 'authContext/AuthContext';

export const LoginForm = () => {
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const handleInput = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
      login(password);
      setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Password
        <input type="text" name="password" value={password} onChange={handleInput} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};
