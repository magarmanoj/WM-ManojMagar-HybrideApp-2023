<template>
    <ion-content>
        <ion-list>
            <ion-row class="header-row">
                <ion-col>Naam</ion-col>
                <ion-col>Voornaam</ion-col>
                <ion-col>Familienaam</ion-col>
                <ion-col>Specialisatie</ion-col>
                <ion-col>Button</ion-col>
            </ion-row>
            <ion-item v-for="{ naam, voornaam, familienaam, specialisatie, medewerker_id, project_id } in medeProject"
                :key="medewerker_id">
                <ion-label class="lbrow">{{ naam }}</ion-label>
                <ion-label class="lbrow">{{ voornaam }}</ion-label>
                <ion-label class="lbrow">{{ familienaam }}</ion-label>
                <ion-label class="lbrow">{{ specialisatie }}</ion-label>
                <ion-col class="col">
                    <ion-button @click="btnDelete(true, medewerker_id, project_id)" class="btn">Delete</ion-button>
                </ion-col>
            </ion-item>
            <ion-modal :is-open="isOpen">
                <p>Ben je zeker dat je dit wil verwijderen?</p>
                <ion-button @click="btnOk(toDeleteMedeId, toDeletePrID)">OK</ion-button>
                <ion-button @click="btnCancel(false)">Cancel</ion-button>
            </ion-modal>
        </ion-list>
    </ion-content>
</template>
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton, IonModal } from '@ionic/vue';

const medeProject = ref([]);

const axios = inject('axios')
const isOpen = ref(false);
const toDeleteMedeId = ref(null);
const toDeletePrID = ref(null);


const btnDelete = (open, medewerker_id, project_id) => {
    if (open) {
        isOpen.value = true;
        toDeleteMedeId.value = medewerker_id;
        toDeletePrID.value = project_id;
    } else {
        isOpen.value = false;
    }
}

const btnCancel = () => {
    isOpen.value = false;
}

const btnOk = (toDeleteMedeId, toDeletePrID) => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/VerwijderMedeProject.php', {
            medewerker_id: toDeleteMedeId,
            project_id: toDeletePrID
        })
        .then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                return;
            }
            console.log(response.data);
            isOpen.value = false;
            getMedewerkerProject();
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('Je kan de medewerker niet verwijderen omdat er een serverfout is opgetreden!');
        });
}

const getMedewerkerProject = () => {
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
    getMedewerkerProject();
});
</script>


<style>
@import '@/theme/styles.css';
</style>
