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
                <ion-input class="lbrow" :value="voornaam" :readonly="editAble"
                    @ionInput="onInputChange('voornaam', medewerker_id, $event)"></ion-input>
                <ion-input class="lbrow" :value="familienaam" :readonly="editAble"
                    @ionInput="onInputChange('familienaam', medewerker_id, $event)"></ion-input>
                <ion-input class="lbrow" :value="specialisatie" :readonly="editAble"
                    @ionInput="onInputChange('specialisatie', medewerker_id, $event)"></ion-input>
                <ion-col class="col">
                    <ion-button v-if="editAble" @click="btnEdit()" class="btn">
                        <ion-icon :icon="create" />
                    </ion-button>
                    <ion-button v-if="!editAble" @click="btnSave(medewerker_id)" class="btn">
                        <ion-icon :icon="save" />
                    </ion-button>
                    <ion-button @click="btnDelete(true, medewerker_id)" class="btn">
                        <ion-icon :icon="trash" />
                    </ion-button>
                </ion-col>
            </ion-item>
            <ion-modal :is-open="isOpen">
                <p>Ben je zeker dat je dit wil verwijderen?</p>
                <ion-button @click="btnOk(toDeleteId)">OK</ion-button>
                <ion-button @click="btnCancel(false)">Cancel</ion-button>
            </ion-modal>
        </ion-list>
    </ion-content>
</template>
  
  
<script setup>
import { ref, onMounted, inject } from 'vue';
import { IonContent, IonList, IonItem, IonInput, IonRow, IonCol, IonButton, IonModal, IonIcon } from '@ionic/vue';
import { trash, save, create } from 'ionicons/icons';


const axios = inject('axios')
const medewerkers = ref([]);
const editAble = ref(true);
const isOpen = ref(false);
const toDeleteId = ref(null);


// https://stackoverflow.com/questions/63343859/whats-the-difference-between-input-and-change-in-vue-input-type-file

const onInputChange = (field, medewerker_id, event) => {
    const updatedInput = medewerkers.value.find(mede => mede.medewerker_id == medewerker_id);
    updatedInput[field] = event.detail.value;
}

const btnEdit = () => {
    editAble.value = false;
}

// werk nog niet 
const btnSave = (medewerker_id) => {
    const { voornaam, familienaam, specialisatie } = medewerkers.value.find(mede => mede.medewerker_id == medewerker_id);
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
                editAble.value = true;
                return;
            }
            console.log(response.data);
            medewerkers.value = [];
            for (let i = 0, end = response.data.data.length; i < end; i++) {
                medewerkers.value.push(response.data.data[i]);
            }
            window.alert("Het opslagen was gelukt!");
            editAble.value = true;
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

<style>@import '@/theme/styles.css';</style>
