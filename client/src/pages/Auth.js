import React from 'react'
import { useState } from 'react'


export const AuthPage = () => {
  const [form, setForm] = useState({email: "", password: ""})

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }


  return (<>
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сокращение ссылки</h1>
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
                Введите Email
              </label>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-4">Войти</button>
            <button className="btn transparent">Регистрация</button>
          </div>
        </div>
      </div>
    </div>
  </>)
}