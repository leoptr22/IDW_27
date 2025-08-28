

class Libro:
    def __init__ (self, titulo, autor, precio, stock):
        self.titulo = titulo
        self.autor = autor
        self.precio = precio
        self.stock = stock
        
        
    def obtener_informacion(self):
        return f"Título: {self.titulo}, Autor: {self.autor}, Precio: {self.precio}, Stock: {self.stock}"


class CarritoDeCompras:
    
    def __init__(self):
        self.items = []
        
    def agregar_libro(self, libro, cantidad):
        if libro.stock >= cantidad:
            item = [libro, cantidad]
            self.items.append(item)
            libro.stock -= cantidad
        else:
            print(f"No hay suficiente stock para {libro.titulo}. Stock disponible: {libro.stock}, solicitado: {cantidad}.")
    
    
    def calcular_total(self):
        total = sum(item[0].precio * item[1] for item in self.items)
        return total
    
    def ver_carrito(self):
        for item in self.items:
            libro, cantidad = item
            print(f"{libro.obtener_informacion()}, Cantidad: {cantidad}")
        
        
        
        
# 1. Crear algunos objetos de la clase Libro
libro1 = Libro("El Señor de los Anillos", "J.R.R. Tolkien", 30.00, 5)
libro2 = Libro("Cien Años de Soledad", "Gabriel García Márquez", 25.50, 1)
libro3 = Libro("1984", "George Orwell", 18.75, 10)

# 2. Imprimir información de un libro
print(libro1.obtener_informacion())
print(libro2.obtener_informacion())

# 3. Crear un objeto de la clase CarritoDeCompras
mi_carrito = CarritoDeCompras()

# 4. Agregar libros al carrito
print("\n--- Agregando libros al carrito ---")
mi_carrito.agregar_libro(libro1, 2)  # Debe agregar 2 unidades
mi_carrito.agregar_libro(libro2, 1)  # Debe agregar 1 unidad
mi_carrito.agregar_libro(libro3, 15) # No hay suficiente stock, debe fallar

# 5. Imprimir el contenido del carrito
print("\n--- Contenido de mi carrito ---")
mi_carrito.ver_carrito()

# 6. Calcular e imprimir el total
print("\n--- Total de mi carrito ---")
total_a_pagar = mi_carrito.calcular_total()
print(f"El total a pagar es: ${total_a_pagar:.2f}")

# 7. Verificar que el stock de los libros se haya actualizado
print("\n--- Verificación de stock después de la compra ---")
print(libro1.obtener_informacion()) # El stock de este libro debe ser 3 ahora
print(libro2.obtener_informacion()) # El stock de este libro debe ser 0 ahora 