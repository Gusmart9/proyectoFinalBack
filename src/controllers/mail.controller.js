import nodemailer from 'nodemailer'
import config from '../config/config.js';

export const getbill = async (req, res) => {
    let configMail = {
        service: 'gmail',
        auth: {
            user: config.mailDelEcommerce,
            pass: config.mailPasswordDelEcommerce
        }
    }
    let transporter = nodemailer.createTransport(configMail)

    const mailUser = req.session.user.email;
    const purchasedProducts = req.body; // Acceder a los datos de los productos comprados directamente desde el cuerpo de la solicitud POST

    // Construir la tabla HTML con los detalles de la compra
    let purchaseDetails = '<h2>Detalle de la Compra</h2><table border="1"><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th></tr>';

    purchasedProducts.forEach(product => {
        purchaseDetails += `<tr>
            <td>${product.product.title}</td>
            <td>${product.quantity}</td>
            <td>${product.product.price}</td>
        </tr>`;
    });

    // Cierra la tabla HTML
    purchaseDetails += '</table>';

    // Crear el mensaje del correo electrónico
    let message = {
        from: config.mailDelEcommerce,
        to: mailUser,
        subject: 'Gracias por su compra',
        html: `
            <p>El detalle de tu compra es:</p>
            ${purchaseDetails}
        `
    };

    transporter.sendMail(message)
        .then(() => res.status(201).json({ status: 'success' }))
        .catch(error => res.status(500).json({ error }));
}

export const deletedAccount = async (emailAddresses) => {
    let configMail = {
        service: 'gmail',
        auth: {
            user: config.mailDelEcommerce,
            pass: config.mailPasswordDelEcommerce,
        },
    };
    
    let transporter = nodemailer.createTransport(configMail);

    const results = [];

    // Bucle para enviar correos a todas las direcciones de correo electrónico proporcionadas.
    for (const email of emailAddresses) {
        // Se crea el mensaje del correo electrónico
        let message = {
            from: config.mailDelEcommerce,
            to: email,
            subject: 'Cuenta eliminada por inactividad',
            html: 'Tu cuenta ha sido eliminada debido a la inactividad.',
        };

        try {
            await transporter.sendMail(message);
            results.push({ email, status: 'Correo electrónico enviado - Cuenta eliminada' });
        } catch (error) {
            results.push({ email, status: 'Error al enviar el correo electrónico: ' + error });
        }
    }

    return results;
};

export const sendDeletedProductEmail = async (product, userEmail) => {
    try {
      let configMail = {
        service: 'gmail',
        auth: {
          user: config.mailDelEcommerce,
          pass: config.mailPasswordDelEcommerce,
        },
      };
  
      let transporter = nodemailer.createTransport(configMail);
  
      const message = {
        from: config.mailDelEcommerce,
        to: product.owner, // El propietario del producto
        subject: 'Producto eliminado',
        html: `
          <p>Estimado usuario,</p>
          <p>Su producto "${product.title}" ha sido eliminado.</p>
        `,
      };
  
      await transporter.sendMail(message);
      return { status: 'Correo electrónico enviado con éxito' };
    } catch (error) {
      return { status: 'Error al enviar el correo electrónico: ' + error };
    }
  };