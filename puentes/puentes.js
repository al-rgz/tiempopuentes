// Front-end
async function getCountriesAndDisplay() {

const main = document.getElementById('container');

    try {
        const response = await fetch('/api/fetch_puentes'); // ✅ 
        
        if (!response.ok) {
            throw new Error('Error de red: ' + response.statusText);
        }
        
        const data = await response.json();

        

        const traducciones = {
         "Bridge of the Americas (BOTA)": "Puente Libre",
         "Paso Del Norte (PDN)": "Puente Santa Fe",
         "Stanton DCL": "Stanton",
         "Ysleta": "Puente Zaragoza",
         "Santa Teresa": "Puente San Jeronimo"
               };


               const linksSur = {
         "Bridge of the Americas (BOTA)": "https://www.youtube.com/embed/CZM5TpXLzE8",
         "Paso Del Norte (PDN)": "https://www.youtube.com/embed/IcvugJWPXz8",
         "Ysleta": "https://www.youtube.com/embed/GC5RY3zipa4",
         "Stanton DCL":"https://www.youtube.com/embed/RVXhhbkBGbI?si=jFWMkkRFU7Gei24h",
         "Santa Teresa": "https://www.youtube.com/embed/IcvugJWPXz8"
               };


               const linkNorte = { 
       "Paso Del Norte (PDN)": "https://www.youtube.com/embed/0Pg3S6s76IE?si=njJpiY3oBuuvOxn9",
        "Bridge of the Americas (BOTA)": "https://www.youtube.com/embed/mp3RS0y77tY?si=0Xg1SeWZPql_o1Yj",
        "Ysleta": "https://www.youtube.com/embed/o5h9RB7qwY8?si=vB-BFL4OA8Y6OGtA",
        "Stanton DCL": "https://www.youtube.com/embed/CYhISA_wFQ8?si=x1YIV4rgUt3lzkkJ"
 };

            
        //Objetos para precios de cobro en los puentes

        const carros = {
         "Bridge of the Americas (BOTA)": "gratis",
         "Paso Del Norte (PDN)": "41 pesos",
         "Stanton DCL": "SENTRI",
         "Ysleta": "41 pesos",
             };

          const peatones = {
         "Bridge of the Americas (BOTA)": "gratis",
         "Paso Del Norte (PDN)": "6 pesos",
         "Stanton DCL": "",
         "Ysleta": "6 pesos",
             };
             
             const motos = {
         "Bridge of the Americas (BOTA)": "gratis",
         "Paso Del Norte (PDN)": "21 pesos",
         "Stanton DCL": "SENTRI",
         "Ysleta": "21 pesos",
             };

                
        const ElPasoBorders = data.filter(port => port.port_name === 'El Paso' && port.crossing_name !=='');
        const horaActualizacion = data.find(port => port.crossing_name =='Paso Del Norte (PDN)');

        const actualizacion = horaActualizacion?.passenger_vehicle_lanes?.standard_lanes?.update_time || 'Esperando Actualizacion';
        const horaLimpia = actualizacion?.slice(3, -4);


         //Console logs importantes para debuggear

         console.log(ElPasoBorders);        
         //console.log(actualizacion); kt
        //console.log(actualizacion);
         
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
          const horaFormat = hora.toLocaleString('es-MX',{hour:'2-digit',minute:'2-digit',second:'2-digit'});

          horaDisplay.innerText= `Hora: ${horaFormat}`;

          },1000)
          

          //contenedor donde va el boton para abrir el contenedor 
          // donde va el video youtube detials

          const displayDiv= document.createElement('div');
          displayDiv.classList.add('boton_camara');
          displayDiv.innerHTML= ` <img src='/assets/car.png' class='logo3'>Cámara</img>`
                  
           displayDiv.addEventListener('click', (e) =>{ 
              
              const blur_bg = document.querySelector('main');
              
              
              const rect = e.currentTarget.getBoundingClientRect();
              
           // Esto posiciona el modal justo debajo del botón que clickeaste
           // sumando window.scrollY para que funcione aunque hayas hecho scroll
    
           display.style.top = `${rect.top + window.scrollY + 20}px`;
           
              display.classList.toggle('hidden'); 
              blur_bg.classList.toggle('show');

              display.innerHTML= `
              
          <div id='boton_cerrar_display'>
                 <h2>Cámara en vivo</h2><hr>
                 <p class='hora' id='hora'></p>
                 <p class='boton_cerrar_display' id='boton_cerrar_display'>X</p>

            </div> 
               <iframe  src="${videoSur}"> </iframe>
               <iframe  src="${videoNorte}"> </iframe>  
               
               <ul class= "lista_precios" id="lista_precios">              

                <li class="">
                 Precios de cruce
                 <img class="flecha" id="flecha" src="/assets/arrow-right.png">

                <span class ="hidden_precio">

                 <p> <img src="/assets/auto (1).png"> Carros: ${carro}</p>
                 <p> <img src="/assets/moto.png"> Motos: ${moto}</p>
                 <p> <img src="/assets/peatonal.png"> Peatones: ${peaton}</p>
                 </span>

               </li>

               </ul>                  
               
               
               
               `;

                const cerrar_display_boton = document.getElementById('boton_cerrar_display');
                cerrar_display_boton.addEventListener('click', (e)=> {
                    
                   display.classList.toggle('hidden');
                   blur_bg.classList.toggle('show');
                   
                });

                   //Funcion accordion

                const ul_accordion = document.getElementById ('lista_precios');

                function accordion (e) {
 

                    if(e.target.tagName === 'IMG'){

                        const li = e.target.closest('LI');
                        const span = li.querySelector('span');

                        span.classList.toggle('hidden_precio')

                        e.target.classList.toggle('flecha_ul_click');
                    }      

                    } 

                ul_accordion.addEventListener('click', accordion);



              });
          

              //Nombre de los puentes

          const portName = port?.crossing_name; 
           const puenteEspaniol = traducciones[portName];

           //Link a el video del puente en vivo
           const videoSur =linksSur[portName];
           const videoNorte = linkNorte[portName];          


           //Delay time y numero de lineas avbiertas para peatones
          const pedestrianDelay = port?.pedestrian_lanes?.standard_lanes?.delay_minutes || '0';
          const pedestrianLanes = port?.pedestrian_lanes?.standard_lanes?.lanes_open || '0';

          //Standar Lanes
          const carDelay = port?.passenger_vehicle_lanes?.standard_lanes?.delay_minutes || '0';       
          const carLanes = port?.passenger_vehicle_lanes?.standard_lanes?.lanes_open || '0';
             
            //Variables formateadas de numero de lineas y delay en Standar lineas
           const carLanesFormat = parseFloat(carLanes);
           const carDelayFormat = parseFloat(carDelay);
          
          //Ready Lane

          const readylanes = port?.passenger_vehicle_lanes?.ready_lanes?.lanes_open || '0';
          const readylane_delay=port?.passenger_vehicle_lanes?.ready_lanes?.delay_minutes || '0';

           const readylanesFormat = parseFloat(readylanes);
           const readyLaneDelayFormat = parseFloat (readylane_delay);



           // If else statement para declara el valor de totalDelayFromat
           //Asi si la api aroja un 0 en un tiempo de cruce usa el valor de 
           //standar lines or sentry lanes o la suma de las dos.

          let totalDelayFormat;

          if (carDelayFormat === 0){

            totalDelayFormat = readyLaneDelayFormat
            
          }  else if (readyLaneDelayFormat === 0) {

              totalDelayFormat = carDelayFormat

          } else {
            
            totalDelayFormat = (carDelayFormat+readyLaneDelayFormat)/2;
          }



           
          //Sentry lane

          const sentryLanes = port?.passenger_vehicle_lanes?.NEXUS_SENTRI_lanes?.lanes_open || '0';
          const sentrylanes_delay = port?.passenger_vehicle_lanes?.NEXUS_SENTRI_lanes?.delay_minutes || '0';

          //Regular lanes + ready lanes

          const totalLanes = carLanesFormat + readylanesFormat;
          const totalDelay = (carDelayFormat + readyLaneDelayFormat)/2;

          //Suma del delay de las lineas regulares y las ready lanes

          totalDelayFormat = Math.floor(totalDelay);

          //precio local   
           
           const carro = carros[portName] ;
           const moto = motos[portName]
           const peaton = peatones[portName]
          

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
            <p>${totalDelayFormat} min  
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

      
        // Funcion para mostrar la hora en que se actualizo la infomacion de los puentes

        const reloj = document.getElementById('reloj');
        /*reloj.innerHTML = `Ultima actualización: ${horaLimpia}`;*/

        
        

        

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



//Funcion de entrada del body



document.addEventListener('DOMContentLoaded',() =>{

    setTimeout(() => {
        const mainPage = document.querySelector('body');
mainPage.classList.remove('body');
    }, 700); 

})
