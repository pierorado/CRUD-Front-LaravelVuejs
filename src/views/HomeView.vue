<script>
import { RouterLink } from 'vue-router';
import TheWelcome from '../components/TheWelcome.vue'
import axios from 'axios'

export default {
    data() {
        return {
            estudiantes: null,
            cargando: false
        };
    },
    mounted() {
        this.getEstudiantes();
    },
    methods: {
        getEstudiantes() {
            this.cargando = true;
            axios.get('http://127.0.0.1:8000/api/v1/estudiantes').then(res => {
                this.estudiantes = res.data;
                this.cargando = false;
            });
        }
    },
    components: { RouterLink }
}
</script>

<template>
  <div class="row">
    <div class="col-lg-8 offset-lg-2">
      <table class="table table-hover">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Foto</th>              
              <th>Nombre</th>              
              <th>Apellido</th>              
              <th>Registro</th>              
            </tr>
          </thead>
          <tbody class="table-group-divider" id="contenido">
           <tr v-if="this.cargando">
            <td colspan="6"><h3>Cargando...</h3></td>
           </tr>
           <tr v-else v-for="est, i in estudiantes" :key="est.id">
            <td v-text="(i+1)"></td>
            <td v-text="est.id"></td>
            <td v-text="est.foto"></td>
            <td v-text="est.nombre"></td>
            <td v-text="est.apellido"></td>
            <td v-text="new Date(est.created_at).toLocaleDateString('es-PE')"></td>
            <td>
              <RouterLink :to="{path:'view/'+ est.id}" class="btn btn-info">
                <i class="fa-solid fa-eye"></i>
              </RouterLink>
                &nbsp;
                <RouterLink :to="{path:'edit/'+ est.id}" class="btn btn-warning">
                <i class="fa-solid fa-edit"></i>
              </RouterLink>
              &nbsp;
                <button class="btn btn-danger">
                <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
           </tr>
          </tbody>
</table>
      </table>
    </div>
  </div>
</template>
