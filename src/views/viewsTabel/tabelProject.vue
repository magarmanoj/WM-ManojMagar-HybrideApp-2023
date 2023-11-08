<template>
    <ion-content :fullscreen="true">
        <ion-list>
            <ion-item v-for="{ project_id, naam, code, beschrijving } in projects" :key="project_id">
                <ion-item slot="start">{{ naam }}</ion-item>
                <ion-label :title="project_id">{{ code }}</ion-label>
                <ion-item slot="end">{{ beschrijving }}</ion-item>
            </ion-item>
        </ion-list>
    </ion-content>
</template>
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';

const projects = ref([]);

const axios = inject('axios')
const getProjects = () => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Projectsget.php')
        .then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                return;
            }
            console.log(response.data);
            projects.value = [];
            for (let i = 0, end = response.data.data.length; i < end; i++) {
                projects.value.push(response.data.data[i]);
            }
        });
}
onMounted(() => {
    getProjects();
});

</script>