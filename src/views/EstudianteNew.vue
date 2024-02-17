<script>
import { RouterLink } from 'vue-router';
import {mostrarAlerta, enviarSolicitud} from '../funciones';
export default {
    data() {
        return {
            nombre: '',
            apellido: '',
            foto: '',
            url: 'http://127.0.0.1:8000/api/v1/estudiantes',
            cargando: false
        };
    },
    methods: {
        guardar() {
            event.preventDefault();
            var mifoto = document.getElementById('fotoimg');
            this.foto = mifoto.src;
            if (this.nombre.trim()==='') {
              mostrarAlerta('Ingrese un nombre','warning','nombre');
            }else if (this.apellido.trim()=='') {
              mostrarAlerta('Ingrese un apellido', 'warning', 'apellido');
            }else{
              var parametros = {nombre:this.nombre.trim(), apellido:this.apellido.trim(), foto:this.foto.trim()}
              enviarSolicitud('POST',parametros,this.url,'Estudiante registrado!!!');
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
          Registrar estudiantes
        </div>
        <div class="card-body">
          <form v-on:submit="guardar">
            <div class="d-grid col-6 mx-auto mb-3">
              <img v-if="this.foto" :src="this.foto" style="height: 100px;" id="fotoimg" class="img-thumbnail" alt=""/>
              <img v-else="est.foto" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-64.png" style="height: 100px;" id="fotoimg" class="img-thumbnail" alt=""/>
            
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <input type="text" v-model="nombre" id="nombre" placeholder="ingrese su nombre" required maxlength="50" class="form-control" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
              <input type="text" v-model="apellido" id="apellido" placeholder="ingrese su apellido" required maxlength="50" class="form-control" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
              <input v-on:change="previsualizadFoto" type="file" accept="image/png, image/jpeg, image/gif" class="form-control" />
            </div>
            <div class="d-grid col-6 mx-auto mb-3">
              <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i>Registrar</button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  </template>