class Producto{
    /* 
        nom = Nombre del producto
        pre = Precio del producto
        anio = Año en que fue fabricado el producto
    */
    constructor(nom,pre,anio){
        this.nombre = nom;
        this.precio = pre;
        this.anio = anio;
    }
}

class UI{
    // Agregamos el producto creado al html
    addProduct(producto){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Producto:</strong> ${producto.nombre} -
                    <strong>Precio:</strong> ${producto.precio} -
                    <strong>Año:</strong> ${producto.anio}
                    <a href="#" name="delete" class="btn btn-danger ml-3">Eliminar</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
        this.showMessage('Producto agregado correctamente', 'success');
    }
    // Elminamos el producto del html
    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado correctamente', 'danger');
        }
    }
    // Mostramos un mensaje tipo notificación
    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // Lo mostramos en el DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#app');
        container.insertBefore(div, app);
        // Le agregamos un tiempo de espera
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
    // Resetea el formulario
    resetForm(){
        document.getElementById('product-form').reset();
    }
}

// Eventos del DOM
document.getElementById('product-form').addEventListener('submit', function(e){
    e.preventDefault();
    // Variables del formulario
    const nombre = document.getElementById('name').value;
    const precio = document.getElementById('price').value;
    const anio = document.getElementById('year').value;
    // Clase producto
    const producto = new Producto(nombre, precio, anio);
    // Llamamos a la clase UI para crear el producto
    const ui = new UI();
    // Verificamos que vengan datos
    if(nombre==='' || precio==='' || anio===''){
        ui.showMessage('Debe llenar todos los campos', 'warning');
    } else{
        ui.addProduct(producto);
        ui.resetForm(); // Reseteamos el formulario
    }
})

document.getElementById('product-list').addEventListener('click', function(e){
    // Llamamos a la clase UI para eliminar un producto
    const ui = new UI();
    ui.deleteProduct(e.target);
})