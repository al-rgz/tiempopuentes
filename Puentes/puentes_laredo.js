// Front-end
async function getCountriesAndDisplay() {

const main = document.getElementById('container');

    try {
        const response = await fetch('/api/fetch_puentes'); // ✅ Fetch a la funcion en la carpeta api.
        
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }
        
        const data = await response.json();

        

        const traducciones = {
         "Bridge I": "Puente Americas",
         "Bridge II": "Puente Juárez-Lincoln",
         "Colombia Solidarity": "Puente Solidaridad",
         "World Trade Bridge": "Puente Negocios"
               };


               const linksSur = {
         "Bridge I": "Dirección: Av. 15 de Junio y Calle Ocampo, Sector Centro, C.P. 88000. Ideal para: Cruzar caminando directo al outlet o al centro de Laredo, Texas.",
         "Bridge II": "Dirección: Blvd. Luis Donaldo Colosio y Av. Santos Degollado (o entrada por Leandro Valle), Sector Centro. Ideal para: Viajes familiares y turistas. Conecta directamente con la Interestatal 35 (I-35) en EE. UU.",
         "Colombia Solidarity": "Dirección: Carretera Nuevo Laredo - Piedras Negras Km 34.5, Colombia, Nuevo León. Ideal para: Personas que viajan desde Monterrey o Saltillo y prefieren un cruce más rápido y despejado.",
         "World Trade Bridge":"Dirección: Carretera Nuevo Laredo – Piedras Negras Km 12.5, Ejido el Canelo. Uso: Cruce comercial masivo."
               };

               const linksNorte = {
         "Bridge of the Americas (BOTA)": "",
         "Paso Del Norte (PDN)": "",
         "Ysleta": "",
         "Santa Teresa": ""
               };

        const ElPasoBorders = data.filter(port => port.port_name === 'Laredo');
        const stanton = data.find(port => port.crossing_name =='Paso Del Norte (PDN)');


       // console.log(ElPasoBorders);
       // console.log(stanton);
       // console.log(data);

        const actualizacion = stanton?.passenger_vehicle_lanes?.standard_lanes?.update_time
        const horaLimpia = actualizacion?.slice(3, -4);

       // console.log(actualizacion);
         
         ElPasoBorders.forEach (port => {

            //Display video puente
             const display = document.getElementById('display_video');             
             

             //Contenedor puentes
             
          const contenedor_puente=  document.createElement('div');
          contenedor_puente.classList.add('contenedor_puentes');

          //Titulo del puente

          const titulo =document.createElement('div');
          titulo.classList.add ('titulo');

          //Contenedor donde va la imagen del carro y los datos del tiempo de cruce
          //y lineas abiertas

          const contenedorPuentes = document.createElement ('div');
          contenedorPuentes.classList.add('contenedor_puentes_info');
          contenedorPuentes.id = 'contenedor_puentes_info'

          //Hora del dia
          setInterval( ()=> {
            const horaDisplay = document.getElementById('hora');

           const hora = new Date();
          const horaFormat = hora.toLocaleString('en-EN',{hour:'2-digit',minute:'2-digit',second:'2-digit'});

          horaDisplay.innerText= `Hora: ${horaFormat}`;

          },1000)
          

          //contenedor donde va el boton para abrir el contenedor 
          // donde va el video youtube detials

          const displayDiv= document.createElement('div');
          displayDiv.classList.add('boton_camara');
          displayDiv.innerHTML= ` <img src='/assets/daylight-saving-time.png' class='logo3'>Info</img>`
                  
          displayDiv.addEventListener('click', (e) =>{ 
              display.classList.toggle('hidden'); 

              display.innerHTML= `
              
          <div id='boton_cerrar_display'>
                 <h2>Información</h2><hr>

                 <p class='hora' id='hora'></p>
                 <p class='boton_cerrar_display' id='boton_cerrar_display'>X</p>

            </div> 

            <p> ${videoSur} </p>`;

                const cerrar_display_boton = document.getElementById('boton_cerrar_display');
                cerrar_display_boton.addEventListener('click', (e)=> {
                   display.classList.toggle('hidden');
                   //display.style.top= linksNorte;

                });

              });
          
          

          const portName = port?.crossing_name; 
           const puenteEspaniol = traducciones[portName];
           const videoSur =linksSur[portName];
           const videoNorte =linksNorte[portName];

          const pedestrianDelay = port?.pedestrian_lanes?.standard_lanes?.delay_minutes || '0';
          const pedestrianLanes = port?.pedestrian_lanes?.standard_lanes?.lanes_open || '0';

          
          const carDelay = port?.passenger_vehicle_lanes?.standard_lanes?.delay_minutes || '0';       
          const carLanes = port?.passenger_vehicle_lanes?.standard_lanes?.lanes_open || '0';
             
           const carLanesFormat = parseFloat(carLanes);
           const carDelayFormat = parseFloat(carDelay);
          
          //Ready Lane

          const readylanes = port?.passenger_vehicle_lanes?.ready_lanes?.lanes_open || '0';
          const readylane_delay=port?.passenger_vehicle_lanes?.ready_lanes?.delay_minutes || '0';

           const readylanesFormat = parseFloat(readylanes);
           const readyLaneDelayFormat = parseFloat (readylane_delay);
           
          //Sentry lane

          const sentryLanes = port?.passenger_vehicle_lanes?.NEXUS_SENTRI_lanes?.lanes_open || '0';
          const sentrylanes_delay = port?.passenger_vehicle_lanes?.NEXUS_SENTRI_lanes?.delay_minutes || '0';

          //Regular lanes + ready lanes

          const totalLanes = carLanesFormat + readylanesFormat;
          const totalDelay = (carDelayFormat + readyLaneDelayFormat)/2;

          //Suma del delay de las lineas regulares y las ready lanes

          const totalDelayFortmat = Math.floor(totalDelay);

          //Actualizacion de informacion de puentes
           //const actualizacion = 

          

          titulo.innerHTML = 
          `<div>
          <p class='nombre_puente'> ${puenteEspaniol} </p> 
          <small> ${portName}</small>
          </div>

        
          <br><br></br>`;

          contenedorPuentes.innerHTML =
           `
         <div class='informacion'>

            <img src='assets/3d-car.png' class='icono'> 
            <div class='letras'>
            <p>${totalDelayFortmat} min  
            <p class='lineas_abiertas'>Lineas abiertas : ${totalLanes}</p> 
            </div>

        </div>

              
              

        <div class='informacion'>

              <img src='assets/Sentri_logo.svg.png' class='icono'> 
              <div class='letras'>
              <p>${sentrylanes_delay} min  
              <p class='lineas_abiertas'>Lineas abiertas : ${sentryLanes}</p>
              </div>

        </div> 

            

        <div class='informacion'>

            
             <img class='logo4' src='assets/walk.png'> 
             <div class='letras'>
             <p> ${pedestrianDelay} min </p>
             <p class='lineas_abiertas'>  Lineas abiertas : ${pedestrianLanes}</p> 
             </div> 

        </div>
          `; 

           
      
           titulo.append(displayDiv);
          contenedor_puente.append(titulo);      
          contenedor_puente.append(contenedorPuentes);   
          main.append(contenedor_puente);

          


         });

          //Hora de actualizacion de los puentes. 
          // (Se pauso esta variable pues el CBP no esta actualizando este dato.)       
        
          
        const reloj = document.getElementById('reloj');
        reloj.innerHTML = `(Ultima actualización: ${horaLimpia})`;

        
        

        

    } catch (error) {
        console.error('Hubo un problema:', error);
        
        main.innerHTML = 'No se pudieron cargar los datos de los países.';
    }
}

getCountriesAndDisplay();

//Funcion para mostar la fecha del dia

const fechaDia = new Date ();

const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let fechaTexto = fechaDia.toLocaleDateString('es-ES',opciones);

fechaTexto = fechaTexto.charAt(0).toUpperCase() + fechaTexto.slice(1);

const fecha = document.getElementById('fecha');
fecha.innerText = fechaTexto;

