<template>
    <ion-content>
        <ion-list>
            <ion-row class="header-row">
                <ion-col>Naam</ion-col>
                <ion-col>Voornaam</ion-col>
                <ion-col>Familienaam</ion-col>
                <ion-col>Specialisatie</ion-col>
            </ion-row>
            <ion-item v-for="{ naam, voornaam, familienaam, specialisatie, medewerker_id } in medeProject"
                :key="medewerker_id">
                <ion-label class="col">{{ naam }}</ion-label>
                <ion-label class="col">{{ voornaam }}</ion-label>
                <ion-label class="col">{{ familienaam }}</ion-label>
                <ion-label class="col">{{ specialisatie }}</ion-label>
            </ion-item>
        </ion-list>
    </ion-content>
</template>
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonList, IonLabel, IonItem } from '@ionic/vue';

const medeProject = ref([]);

const axios = inject('axios')
const getMedewerker = () => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/WerkerProjectget.php')
        .then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                return;
            }
            console.log(response.data);
            medeProject.value = [];
            for (let i = 0, end = response.data.data.length; i < end; i++) {
                medeProject.value.push(response.data.data[i]);
            }
        });
}

onMounted(() => {
    getMedewerker();
});
</script>


<style>
@import '@/theme/styles.css';
</style>
