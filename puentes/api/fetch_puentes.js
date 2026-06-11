export default async function handler(request, response) {
  
  // URL de la API externa a la que realmente quieres consultar
  const API_URL = `https://bwt.cbp.gov/api/waittimes`; 

  try {
    // 1. Configurar las cabeceras de caché de Vercel
    // s-maxage=1800 -> Guarda en caché pública de la CDN por 30 minutos.
    // stale-while-revalidate=2700 -> Si expira, entrega lo viejo y actualiza en segundo plano durante 45 min.
    response.setHeader(
      'Cache-Control', 
      'public, s-maxage=1800, stale-while-revalidate=2700'
    );

    // 2. Hacer el fetch real a la API externa
    const apiResponse = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.MI_API_KEY}`, // Por si usas tokens ocultos en Vercel
        'Content-Type': 'application/json'
      }
    });

    if (!apiResponse.ok) {
       if (apiResponse.status === 429) {
         throw new Error(`Bloqueado por peticiones excesivas (Código ${apiResponse.status})`);
       }

       // Validar si es un error de permisos o autenticación
       if (apiResponse.status === 403 || apiResponse.status === 401) {
         throw new Error(`Acceso denegado o no autorizado por la API (Código ${apiResponse.status})`);
       }

      throw new Error(`Error en la API externa: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // 3. Responder al frontend con los datos obtenidos
    return response.status(200).json(data);

  } catch (error) {
    // NOTA: Si hay un error, removemos o cambiamos el Cache-Control 
    // para evitar que Vercel guarde en caché una respuesta rota (500)
    response.setHeader('Cache-Control', 'no-store');
    
    // Manejo de errores si algo sale mal en el servidor
    return response.status(500).json({ error: error.message });
  }
}