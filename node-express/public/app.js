const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency'
  }).format(price);
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = toCurrency(node.textContent);
})

const cart = document.getElementById('cart');
if (cart) {
  cart.addEventListener('click', ev => {
    if (ev.target.classList.contains('js-remove')) {
      const id = ev.target.dataset.id;

      fetch('/cart/remove/' + id, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        if (data.courses.length) {
          const html = data.courses.map(c => {
            return `
            <td>${c.title}</td>
              <td>${c.count}</td>
              <td>
                <button class="btn btn-small js-remove" data-id="${c.id}">Remove</button>
              </td>
            </tr>
            `
          }).join('');
          cart.querySelector('tbody').innerHTML = html;
          cart.querySelector('.price').textContent = toCurrency(data.price);
        } else {
          cart.innerHTML = '<p>Cart is empty</p>'
        }
      })
    }
  })
}