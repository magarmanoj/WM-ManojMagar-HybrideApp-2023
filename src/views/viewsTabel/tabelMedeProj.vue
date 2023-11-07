<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Producten</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Tab 2</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-popover>
                <ion-content>
                    <ion-list>
                        <ion-item v-for="{ medewerker_id, voornaam, familienaam, specialisatie } in producten"
                            :key="medewerker_id">
                            <ion-item slot="start">€{{ voornaam }}</ion-item>
                            <ion-label :title="medewerker_id">{{ familienaam }}</ion-label>
                            <ion-item slot="end">{{ specialisatie }}</ion-item>
                        </ion-item>
                    </ion-list>
                </ion-content>
            </ion-popover>
        </ion-content>
    </ion-page>
</template>
  
<script setup>
import { ref, inject } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle,IonPopover, IonContent, IonList, IonLabel, IonItem, onIonViewWillEnter } from '@ionic/vue';

const wedewerker = ref([]);

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
            wedewerker.value = [];
            for (let i = 0, end = response.data.data.length; i < end; i++) {
                wedewerker.value.push(response.data.data[i]);
            }
        });
}

onIonViewWillEnter(() => {
    getMedewerker();
});
</script>