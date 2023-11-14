<template>
    <ion-content :fullscreen="true">
        <ion-grid>
            <ion-row class="header-row">
                <ion-col class="lbrow">Voornaam</ion-col>
                <ion-col class="lbrow">Familienaam</ion-col>
                <ion-col class="lbrow">Specialisatie</ion-col>
                <ion-col class="lbrow">Button</ion-col>
            </ion-row>
            <ion-row class="item" v-for="{ medewerker_id, voornaam, familienaam, specialisatie, editable } in medewerkers" :key="medewerker_id">
                <ion-input class="lbrow" :value="voornaam" :readonly="!editable" :class="{ 'editable': editable }"
                    @ionInput="onInputChange('voornaam', medewerker_id, $event)"></ion-input>
                <ion-input class="lbrow" :value="familienaam" :readonly="!editable" :class="{ 'editable': editable }"
                    @ionInput="onInputChange('familienaam', medewerker_id, $event)"></ion-input>
                <ion-input class="lbrow" :value="specialisatie" :readonly="!editable" :class="{ 'editable': editable }"
                    @ionInput="onInputChange('specialisatie', medewerker_id, $event)"></ion-input>
                <ion-col class="lbrow">
                    <ion-button v-if="!editable" @click="btnEdit(medewerker_id)">
                        <ion-icon :icon="create" />
                    </ion-button>
                    <ion-button v-if="editable" @click="btnSave(medewerker_id)">
                        <ion-icon :icon="save" />
                    </ion-button>
                    <ion-button @click="btnDelete(true, medewerker_id)">
                        <ion-icon  class="icon" :icon="trash" />
                    </ion-button>
                </ion-col>
            </ion-row>
            <ion-modal :is-open="isOpen">
                <p>Ben je zeker dat je dit wil verwijderen?</p>
                <ion-button @click="btnOk(toDeleteId)">OK</ion-button>
                <ion-button @click="btnCancel(false)">Cancel</ion-button>
            </ion-modal>
        </ion-grid>
    </ion-content>
</template>
  
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonGrid, IonInput, IonRow, IonCol, IonButton, IonModal, IonIcon } from '@ionic/vue';
import { trash, save, create } from 'ionicons/icons';


const axios = inject('axios')
const medewerkers = ref([]);
const isOpen = ref(false);
const toDeleteId = ref(null);


// https://stackoverflow.com/questions/63343859/whats-the-difference-between-input-and-change-in-vue-input-type-file

const onInputChange = (field, medewerker_id, event) => {
    const updatedInput = medewerkers.value.find(mede => mede.medewerker_id == medewerker_id);
    updatedInput[field] = event.detail.value;
}

const btnEdit = (medewerker_id) => {
    medewerkers.value.forEach(medwk => {
        medwk.editable = medwk.medewerker_id == medewerker_id;
        
    });
}

// werk nog niet 
const btnSave = (medewerker_id) => {
    const editedMedewerker = medewerkers.value.find(mede => mede.medewerker_id == medewerker_id);
    const { voornaam, familienaam, specialisatie } = editedMedewerker;
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/UpdateMedewerker.php', {
            medewerker_id: medewerker_id,
            voornaam: voornaam,
            familienaam: familienaam,
            specialisatie: specialisatie
        })
        .then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                window.alert('je hebt niets verandert.')
                editedMedewerker.editable = false;
                return;
            }
            console.log(response.data);
            window.alert("Het opslagen was gelukt!");
            editedMedewerker.editable = false;
            getMedewerker();
        });

}

const btnDelete = (open, medewerker_id) => {
    if (open) {
        isOpen.value = true;
        toDeleteId.value = medewerker_id;
    } else {
        isOpen.value = false;
    }
}

const btnCancel = () => {
    isOpen.value = false;
}

const btnOk = (toDeleteId) => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/DeleteMedewerker.php', {
            medewerker_id: toDeleteId
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
            getMedewerker();
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('Je kan de medewerker niet verwijderen omdat er een serverfout is opgetreden!');
        });
}




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
            medewerkers.value = response.data.data.map(medewerker => ({
                ...medewerker, 
                editable:false
            }));
        });
}

onMounted(() => {
    getMedewerker();
});
</script>

<style>
@import '@/theme/styles.css';
</style>
