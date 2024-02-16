import Swal from "sweetalert2";
import axios from "axios";

export function mostrarAlerta(titulo,icono, foco=''){
    if (foco!='') {
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:titulo,
        icon:icono,
        customClass:{confirmButton:'btn btn-primary', popup:'animated zooIn'},
        buttonsStyling:false
    });
}
export function confirmar(urlConSlash,id,titulo,mensaje){
    var url = urlConSlash+id;
    const swalWithBootstrapButton = Swal.mixin({
        customClass:{confirmButton:'btn btn-success me-3', cancelButton:'btn btn-danger'}
    });

    swalWithBootstrapButton.fire({
        title:titulo,
        text:mensaje,
        icon:'question',
        showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-circle-check"></i> Si, eliminar',
        cancelButtonText: '<i class="fa-solid fa-trash-can"></i> Cancelar'
    }).then((res)=>{
        if (res.isConfirmed) {
            enviarSolicitud('DELETE',{id:id},url,'Eliminado con éxito');
        }else{
            mostrarAlerta('Operación cancelada', 'info');
        }
    });


    Swal.fire({
        title:titulo,
        icon:icono,
        customClass:{confirmButton:'btn btn-primary', popup:'animated zooIn'},
        buttonsStyling:false
    });
}
export function enviarSolicitud(metodo, parametro,url, mensaje){
    axios({method:metodo, url:url, data:parametro}).then(function(res){
        var estado = res.status;
        if (estado == 200) {
            mostrarAlerta(mensaje,'success');
            window.setTimeout(function(){
                window.location.href='/'
            },1000);
        }else{
            mostrarAlerta('No se pudo capturar la respuesta','error');
        }
    }).catch(function(error){
        mostrarAlerta('error de servidor no disponible','error');
    });
}