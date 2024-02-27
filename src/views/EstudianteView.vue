<script>
import { RouterLink } from 'vue-router';
import {mostrarAlerta, enviarSolicitud} from '../funciones';
import { useRoute } from 'vue-router';
import axios from 'axios'

export default {
    data() {
        return {
            id:0,
            nombre: '',
            apellido: '',
            foto: '',
            url: 'http://127.0.0.1:8000/api/v1/estudiantes',
            cargando: false
        }
    },
    mounted(){
      const route = useRoute();
      this.id = route.params.id;
      this.url += '/' + this.id;
      this.getEstudiante();
    },
    methods: {
       getEstudiante(){
        axios.get(this.url).then(
          res=>{
            this.nombre = res.data.data.nombre;   
            this.apellido = res.data.data.apellido;   
            this.foto = res.data.data.foto;     
          }
        );

       },
        actualizar() {
            event.preventDefault();
            var mifoto = document.getElementById('fotoimg');
            this.foto = mifoto.src;
            if (this.nombre.trim()==='') {
              mostrarAlerta('Ingrese un nombre','warning','nombre');
            }else if (this.apellido.trim()=='') {
              mostrarAlerta('Ingrese un apellido', 'warning', 'apellido');
            }else{
              var parametros = {nombre:this.nombre.trim(), apellido:this.apellido.trim(), foto:this.foto.trim()}
              enviarSolicitud('PUT',parametros,this.url,'Estudiante actualizado!!!');
            }
        },
        previsualizadFoto(event){
          var reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = function(){
            var mifoto = document.getElementById('fotoimg');
            mifoto.src = reader.result;
            this.foto = mifoto.src;
          }
        }
        
    },
    components: { RouterLink }
}
</script>
<template>
    <div class="row mt-3">
      <div class="col-md-6 offset-md-3">
        <div class="card">
        <div class="card-header bg-dark text-white text-center">
          Detalles estudiantes
        </div>
        <div class="card-body">
          <div class="d-grid col-6 mx-auto mb-3">
          <routerLink :to="{path:'/'}" class="btn btn-info">
            <i class="fa-regular fa-circle-left"></i>Regresar a la lista
          </routerLink>
          </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="this.foto" :src="this.foto" style="height: 200px;width: 200px;" id="fotoimg" class="img-thumbnail rounded mx-auto d-block" alt=""/>
              <img v-else="est.foto" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-64.png" style="height: 100px;" id="fotoimg" class="img-thumbnail" alt=""/>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <label  v-text="nombre" class="form-control"></label>
              
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <label  v-text="apellido" class="form-control"></label>
            </div>
        </div>
      </div>
      </div>
    </div>
  </template>
  