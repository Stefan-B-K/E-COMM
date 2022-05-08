import layout from '../layout.js'

export default ({ products }) => {
  const renderedProducts = products
    .map(product => {
      return `
        <div class="column is-one-quarter">
          <div class="card product-card">
            <figure>
              <img src="data:image/png;base64, ${product.image}"/>
            </figure>
            <div class="card-content">
              <h2 class="title is-4">${product.title}</h2>
              <h5>$${product.price}</h5>
            </div>
            <footer class="card-footer">
              <form method="POST" action="/cart/add/">
                <input hidden name="productID"  value="${product.id}" />
                <button class="button has-icon is-inverted">
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
              </form>
            </footer>
          </div>
        </div>
      `;
    })
    .join('\n');

  return layout({
    title: 'iStef Demo Shop',
    content: `
      <section class="banner">
        <div class="container">
          <div class="columns is-centered">
            <img src="/images/banner.jpg" />
          </div>
        </div>
      </section>
      
      <section>
        <div class="container">
          <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
              <div>
                <h2 class="title text-center">Featured Items</h2>
                <div class="columns products">
                  ${renderedProducts}  
                </div>
              </div>
            </div>
            <div class="column "></div>
          </div>
        </div>
      </section>
    `
  })
}