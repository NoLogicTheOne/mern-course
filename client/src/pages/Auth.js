import React from 'react'
import { useState, useEffect, useContext } from 'react'

import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/authContext'


export const AuthPage = () => {
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({email: "", password: ""})
  const message = useMessage()
  const auth = useContext(AuthContext)

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (error) {
      
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (error) {
      
    }
  }


  return (<>
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Мотивация</h1>
      </div>
    </div>
    <div className="row">
      <div className="col s12 m6 offset-m3">
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Введите данные для входа</span>
            <br/>
            <div className="input-field">
                <input 
                  type="email"
                  id="email"
                  name="email"
                  placeholder="ivanov@gmail.com"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.email}
                />
              <label htmlFor="email">
                Введите Email
              </label>
            </div>
            <div className="input-field">
                <input 
                  type="password"
                  id="password"
                  name="password"
                  placeholder="************"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.password}
                />
              <label htmlFor="password">
                Введите Пароль
              </label>
            </div>
          </div>
          <div className="card-action">
            <button 
              className="btn yellow darken-4"
              disabled={loading}
              onClick={loginHandler}
            >
              Войти
            </button>
            <button 
              className="btn transparent"
              onClick={registerHandler}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  </>)
}