<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Medewerkers</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-list>
                <ion-item v-for="{ medewerker_id, voornaam, familienaam, specialisatie } in medewerkers"
                    :key="medewerker_id">
                    <ion-item slot="start">{{ voornaam }}</ion-item>
                    <ion-label :title="medewerker_id">{{ familienaam }}</ion-label>
                    <ion-item slot="end">{{ specialisatie }}</ion-item>
                </ion-item>
            </ion-list>
        </ion-content>
        <ion-button @click="closePopup">Close</ion-button>
        <ion-backdrop @ionBackdropTap="closePopup"></ion-backdrop> <!-- Deze popup heeft een backdrop "function" die je hier gwn aan button kunt verbinden-->
    </ion-page>
</template>
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonBackdrop } from '@ionic/vue';

const medewerkers = ref([]);

const axios = inject('axios')
const getMedewerker = () => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Medewerkerget.php')
        .then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                return;
            }
            console.log(response.data);
            medewerkers.value = [];
            for (let i = 0, end = response.data.data.length; i < end; i++) {
                medewerkers.value.push(response.data.data[i]);
            }
        });
}
onMounted(() => {
    getMedewerker();
});

</script>