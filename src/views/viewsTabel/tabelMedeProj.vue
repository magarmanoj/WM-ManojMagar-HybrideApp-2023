<template>
    <ion-content :fullscreen="true">
        <ion-grid>
            <ion-row class="header-row">
                <ion-col class="lbrow">Naam</ion-col>
                <ion-col class="lbrow">Voornaam</ion-col>
                <ion-col class="lbrow">Familienaam</ion-col>
                <ion-col class="lbrow">Specialisatie</ion-col>
                <ion-col class="lbrow">Button</ion-col>
            </ion-row>
            <ion-row class="item" v-for="{ naam, voornaam, familienaam, specialisatie, medewerker_id, project_id } in medeProject"
                :key="medewerker_id">
                <ion-input class="lbrow" :value="naam" :readonly="editAble"></ion-input>
                <ion-input class="lbrow" :value="voornaam" :readonly="editAble"></ion-input>
                <ion-input class="lbrow" :value="familienaam" :readonly="editAble"></ion-input>
                <ion-input class="lbrow" :value="specialisatie" :readonly="editAble"></ion-input>
                <ion-col class="lbrow">
                    <ion-button @click="btnDelete(true, medewerker_id, project_id)" class="btn">
                        <ion-icon class="icon" :icon="trash"/></ion-button>
                </ion-col>
            </ion-row>
            <ion-modal :is-open="isOpen">
                <p>Ben je zeker dat je dit wil verwijderen?</p>
                <ion-button @click="btnOk(toDeleteMedeId, toDeletePrID)">OK</ion-button>
                <ion-button @click="btnCancel(false)">Cancel</ion-button>
            </ion-modal>
        </ion-grid>
    </ion-content>
</template>
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonGrid, IonInput, IonRow, IonCol, IonButton, IonModal, IonIcon } from '@ionic/vue';
import { trash } from 'ionicons/icons';


const medeProject = ref([]);

const axios = inject('axios')
const isOpen = ref(false);
const toDeleteMedeId = ref(null);
const toDeletePrID = ref(null);
const editAble = ref(true)


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
