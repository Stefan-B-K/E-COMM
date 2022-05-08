
import layout from '../layout.js'
import { getError } from '../../helpers.js'

export default ({ errors }) => {
  return layout({
    title: 'Sign Up',
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-half">
            <form method="POST">
              <h1 class="title">Sign Up</h1>
              <div class="field">
                <label class="label">Email</label>
                <input required class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <input required class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <div class="field">
                <label class="label">Password Confirmation</label>
                <input required class="input" placeholder="Password Confirmation" name="passwordConfirm" type="password" />
                <p class="help is-danger">${getError(errors,'passwordConfirm')}</p>
              </div>
              <button class="button is-primary">Sign Up</button>
            </form>
            <a href="/login">Already have an account?  Log In</a>
          </div>
        </div>
      </div>
    `
  })
}