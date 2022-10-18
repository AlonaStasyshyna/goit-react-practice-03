import { useState, useContext } from 'react';
import { AuthContext } from 'authContext/AuthContext';

export const RegForm = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const { register } = useContext(AuthContext);

  const handleInput = e => {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    register({ name, password });
    setName('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" value={name} onChange={handleInput} />
      </label>
      <label>
        Password
        <input type="text" name="password" value={password} onChange={handleInput} />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};
