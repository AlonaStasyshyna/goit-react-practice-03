import { useState, useContext } from 'react';
import { AuthContext } from 'authContext/AuthContext';
import { LoginForm } from 'components/LoginForm/LoginForm';
import { RegForm } from 'components/RegForm/RegForm';

export const AuthNav = () => {
  const [isRegFormShown, setIsRegFormShown] = useState(false);
  const [isLoiginFormShown, setIsLoiginFormShown] = useState(false);

    const { name, isAuth, logout } = useContext(AuthContext);
    
    const clickHandler = e => {
        logout()
        setIsLoiginFormShown(false)
        setIsRegFormShown(false)
    }

  return (
    <>
      {isAuth ? (
        <>
          <p>{name}, welcome!</p>
          <button type="button" onClick={clickHandler}>
            Log out
          </button>
        </>
      ) : (
        <>
          <ul>
            <li>
              <button type="button" onClick={() => setIsLoiginFormShown(true)}>
                Log in
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setIsRegFormShown(true)}>
                Sign up
              </button>
            </li>
          </ul>

          {isLoiginFormShown && <LoginForm />}
          {isRegFormShown && <RegForm />}
        </>
      )}
    </>
  );
};
