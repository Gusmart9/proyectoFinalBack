## Proyecto Final de Backend

### Consigna:

- Desde el router de `/api/users`, crear las siguientes rutas:

    - **GET /**: Deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol).

    - **DELETE /**: Deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad

- Crear una vista para poder visualizar, modificar el rol y eliminar un usuario. Esta vista únicamente será accesible para el administrador del ecommerce.

- Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario premium, le envíe un correo indicándole que el producto fue eliminado.

- Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.

- Finalizar las vistas pendientes para la realización de flujo completo de compra. NO ES NECESARIO tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.
