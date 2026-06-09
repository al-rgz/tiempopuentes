

export default async function handler(request, response) {
  

  // URL de la API externa a la que realmente quieres consultar
  const API_URL = `https://bwt.cbp.gov/api/waittimes`; 

  try {
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

  // 2. Validar si es un error de permisos o autenticación (opcional pero muy útil)
       if (apiResponse.status === 403 || apiResponse.status === 401) {
     throw new Error(`Acceso denegado o no autorizado por la API (Código ${apiResponse.status})`);
        }

      throw new Error(`Error en la API externa: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // 3. Responder al frontend con los datos obtenidos
    return response.status(200).json(data);

  } catch (error) {
    // Manejo de errores si algo sale mal en el servidor
    return response.status(500).json({ error: error.message });
  }
}