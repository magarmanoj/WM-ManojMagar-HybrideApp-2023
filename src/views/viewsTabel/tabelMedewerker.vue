<template>
    <ion-content :fullscreen="true">
        <ion-list>
            <ion-row class="header-row">
                <ion-col>Voornaam</ion-col>
                <ion-col>Familienaam</ion-col>
                <ion-col>Specialisatie</ion-col>
                <ion-col>Button</ion-col>
            </ion-row>
            <ion-item v-for="{ medewerker_id, voornaam, familienaam, specialisatie } in medewerkers" :key="medewerker_id">
                <ion-label class="lbrow">{{ voornaam }}</ion-label>
                <ion-label class="lbrow">{{ familienaam }}</ion-label>
                <ion-label class="lbrow">{{ specialisatie }}</ion-label>
                <ion-col class="col">
                    <ion-button class="btn">Edit</ion-button>
                    <ion-button class="btn">Delete</ion-button>
                </ion-col>
            </ion-item>
        </ion-list>
    </ion-content>
</template>
  
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton } from '@ionic/vue';

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

<style>
@import '@/theme/styles.css';
</style>
