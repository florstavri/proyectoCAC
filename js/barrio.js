// var barrios ={
//     {barrio:"Palermo",nombreLugar:"Plaza las Heras", ubicacion:"Av. Cnel. Díaz 2500", link:"https://goo.gl/maps/PT12jfQhByDZP3NT6"},
//     {barrio:"Palermo",nombreLugar:"Jardín Botánico Carlos Thays", ubicacion:"Gral. Las Heras 4266", link:"https://goo.gl/maps/pvC6tUg2vmsC4rLi7"}
// }

// function myFunction(){
//     for(bar in barrios){
//         console.log(bar.barrio + " "+ bar.nombreLugar);
//     }
// }
var barrioVisualizado;

const barrios = [
  {
    id: 1,
    barrio: "Palermo",
    nombreLugar: "Plaza las Heras",
    ubicacion: "Av. Cnel. Díaz 2500",
    link: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1642.4078861866608!2d-58.406284600000006!3d-34.5835278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb56029c809a1%3A0xdafd25ed9a860bd9!2sJade%20Plaza!5e0!3m2!1ses-419!2sar!4v1666019730479!5m2!1ses-419!2sar",
  },
  {
    id: 2,
    barrio: "Palermo",
    nombreLugar: "Jardín Botánico Carlos Thays",
    ubicacion: "Gral. Las Heras 4266",
    link: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3284.9381624970856!2d-58.4254394!3d-34.5804312!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb581fe35595f%3A0x801e76c3f778715e!2sJard%C3%ADn%20Bot%C3%A1nico%20Carlos%20Thays!5e0!3m2!1ses-419!2sar!4v1666019629354!5m2!1ses-419!2sar",
  },
];

function myFunction() {
  let barrioHtml = "<ul>";
  // document.body.innerHTML +=
  barrios.map((elemento) => {
    //renderiza codigo html
    barrioHtml += `<li class="barrio_caja">
    <div >
    <p>${elemento.barrio} </p><br>

    <p>${elemento.nombreLugar}</p><br>
    <p link_id= ${elemento.id} onclick= "change_display(event)">${elemento.ubicacion}</p><br>
    <p id=${elemento.id} class="detalles_escondidos">
    
    <iframe src=${elemento.link} width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </p><br>
    </div>
    </li>    
    `;
  });
  barrioHtml += "</ul>";

  document.body.innerHTML += barrioHtml;
}

function Params(url) {
  var urlParams = url.split("?")[1].split("=")[1];
  console.log(urlParams);
  return urlParams;
}

function change_display(event, id_img) {
  let id = event.currentTarget.attributes.link_id.nodeValue;
  if (barrioVisualizado && barrioVisualizado !== id) {
    document
      .getElementById(barrioVisualizado)
      .classList.add("detalles_escondidos");
  }

  // console.log(event.currentTarget.attributes.link_id.nodeValue);
  let elemento = document.getElementById(id);

  elemento.classList.remove("detalles_escondidos");
  // .style.display = "block";
  barrioVisualizado = id;

  carousel(id_img);
}

var myIndex = 1;

function carousel(id_img) {
  var i;
  var max_id;
  var min_id;
  var flag = 1;
  
  var x = document.getElementsByClassName("fotos" + id_img);
  // var x = document.getElementById("img_"+id_img);
  for (i = 0; i < x.length ; i++) {

      x[i].style.display = "none";

  }
  myIndex++;
  if (myIndex > x.length) {
    myIndex = 1;
  }
  // x[myIndex-1].style.display = "block";
  x[myIndex - 1].style.display = "block";
  // document.getElementsByClassName("fotos")[myIndex-1].style.display = "block";
  setTimeout(() => carousel(id_img), 2000);
}

async function fetchLugaresJSON() {
  const response = await fetch("./json/lugares.json", {
    mode: "no-cors" 
  });
  const lugares = await response.json();
  return lugares;
}

fetchLugaresJSON().then((lugares) => {
  let barrioHtml = "<ul>";
  
  lugares.forEach((lugar) => {
    if (lugar.barrio == Params(document.location.href).replace("+", " ")) {
      barrioHtml += `<li class="barrio_caja">
            <div class="barrio_plaza">
            
            <br>
            <p class="nombrelugar" link_id= ${lugar.id} onclick= "change_display(event, ${lugar.id})">${lugar.nombreLugar} </p>
            <br>
            </div>
            <div id=${lugar.id} class="detalles_escondidos"  >
            <p class="barriodescripcion">${lugar.descripcion} </p><br>
            <section >
            
                <div  class="image-container-caja">
                  <div  class="fotos${lugar.id}" style="display:block">
                    <img id="img_barrio" src=${lugar.img1} alt="image">
                    </div>
                    <div  class="fotos${lugar.id}" style="display:none">
                    <img id="img_barrio" src=${lugar.img2} alt="image">
                    </div>
                    <div  class="fotos${lugar.id}" style="display:none">
                    <img id="img_barrio" src=${lugar.img3} alt="image">
                    </div>
                </div>
                
                
            
          </section>
            <p >${lugar.ubicacion} </p><br>
            <p  >
            
            <iframe class ="mapframe" src=${lugar.link}  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </p>
            </div>
            </li>    
            `;
    }

  });
  barrioHtml += "</ul>";

  document.body.innerHTML += barrioHtml;
});
