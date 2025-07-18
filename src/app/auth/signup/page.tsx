'use client';

import { registerUser } from '@/services/auth/authApi';
import styles from './signup.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState, MouseEvent } from 'react';
import { AxiosError } from 'axios';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChange =
    (setter: (Value: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim || !password.trim || !username.trim) {
      return setErrorMessage('Заполните все поля');
    }
    setIsLoading(true);

    registerUser({ email, password, username })
      .then((res) => {
        console.log(res);
        alert('Регистрация прошла успешно!');
        window.location.href = '/auth/signin';
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log(error);

          if (error.response) {
            const message = error.response.data.message;
            const fieldErrors = error.response.data.data?.errors;

            if (fieldErrors?.password) {
              setErrorMessage(fieldErrors.password[0]); // Покажет: The password must be at least 6 characters.
            } else {
              setErrorMessage(message); // Общее сообщение
            }
          } else if (error.request) {
            setErrorMessage('Проверьте интернет-соединение и попробуйте позже');
          } else {
            setErrorMessage('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={classNames(styles.modal__input, styles.login)}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChange(setEmail)}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChange(setPassword)}
      />
      <input
        className={styles.modal__input}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        onChange={onChange(setUserName)}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
    </>
  );
}
