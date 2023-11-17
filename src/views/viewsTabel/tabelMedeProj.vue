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
            <ion-row class="item"
                v-for="{ naam, voornaam, familienaam, specialisatie, medewerker_id, project_id } in medeProject"
                :key="medewerker_id">
                <ion-input class="lbrow" :value="naam"></ion-input>
                <ion-input class="lbrow" :value="voornaam"></ion-input>
                <ion-input class="lbrow" :value="familienaam"></ion-input>
                <ion-input class="lbrow" :value="specialisatie"></ion-input>
                <ion-col class="lbrow">
                    <ion-button @click="btnDelete(true, medewerker_id, project_id)">
                        <ion-icon class="icon" :icon="trash" /></ion-button>
                </ion-col>
            </ion-row>
            <ion-modal :is-open="isOpen">
                <ion-grid class="modal-wrapper">
                    <ion-row class="ion-align-items-center ion-justify-content-center">
                        <ion-col :size="12" class="modal-content">
                            <p>Ben je zeker dat je dit wil verwijderen?</p>
                            <ion-row class="modal-buttons ion-justify-content-center">
                                <ion-col>
                                    <ion-button @click="btnOk(toDeleteMedeId, toDeletePrID)" expand="full">
                                        OK <ion-icon :icon="happy" />
                                    </ion-button>
                                </ion-col>
                                <ion-col>
                                    <ion-button @click="btnCancel(false)" expand="full">
                                        Cancel <ion-icon :icon="sad"></ion-icon>
                                    </ion-button>
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-modal>
        </ion-grid>
    </ion-content>
</template>
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonGrid, IonInput, IonRow, IonCol, IonButton, IonModal, IonIcon } from '@ionic/vue';
import { trash, sad, happy } from 'ionicons/icons';


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
        .then(response => response.data)
        .then(responseData => {
            if (responseData.status == 'ok') {
                console.log(responseData.data);
                isOpen.value = false;
                getMedewerkerProject();
            }
        })
        .catch(error => {
            console.error('Error deleting:', error);
            window.alert('Je kan dit niet verwijderen!');
        });
}

const getMedewerkerProject = () => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/WerkerProjectget.php')
        .then(response => {
            if (response.status != 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                return;
            }
            console.log(response.data);
            medeProject.value = response.data.data.map(medeProject => ({
                ...medeProject
            }));
        })
        .catch(error => {
            console.error('Error fetching:', error);
        });
}

onMounted(() => {
    getMedewerkerProject();
});
</script>


<style>
@import '@/theme/styles.css';
</style>
