<template>
    <ion-content :fullscreen="true">
        <ion-list>
            <ion-item v-for="{ medewerker_id, voornaam, familienaam, specialisatie } in medewerkers" :key="medewerker_id">
                <ion-item slot="start">{{ voornaam }}</ion-item>
                <ion-label :title="medewerker_id">{{ familienaam }}</ion-label>
                <ion-item slot="end">{{ specialisatie }}</ion-item>
            </ion-item>
        </ion-list>
    </ion-content>
</template>
  
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/vue';

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