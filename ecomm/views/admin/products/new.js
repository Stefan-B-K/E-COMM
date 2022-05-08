
import layout from '../layout.js'
import { getError } from '../../helpers.js'

export default ({ errors }) => {
  return layout({
    title: 'Add New Product',
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Add New Product</h1>

          <form method="POST" enctype="multipart/form-data">

            <div class="field">
              <label class="label">Product Title</label>
              <input required class="input" placeholder="Title" name="title" />
              <p class="help is-danger">${getError(errors, 'title')}</p>
            </div>

            <div class="field">
              <label class="label">Price</label>
              <input required class="input" placeholder="Price" name="price" />
              <p class="help is-danger">${getError(errors,'price')}</p>
            </div>
            
            <div class="field">
              <label class="label">Image</label>            
              <input required type="file" name="image" />
              <p class="help is-danger">${getError(errors,'image')}</p>
            </div>
            <br />
            <button class="button is-primary">Add</button>
          </form>
        </div>
      </div>   
    `
  })
}