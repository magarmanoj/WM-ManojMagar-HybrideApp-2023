<template>
    <ion-content :fullscreen="true">
        <ion-list>
            <ion-row class="header-row">
                <ion-col>Naam</ion-col>
                <ion-col>Code</ion-col>
                <ion-col>Omschrijving</ion-col>
                <ion-col>Button</ion-col>
            </ion-row>
            <ion-row>
                <ion-item v-for="{ project_id, naam, code, beschrijving } in projects" :key="project_id">
                    <ion-input class="lbrow" :value="naam" :readonly="editAble"
                        @ionInput="onInputChange('naam', project_id, $event)"></ion-input>
                    <!--readonly zo dat je niet direct op input field kan schrijven-->
                    <ion-input class="lbrow" :value="code" :readonly="editAble"
                        @ionInput="onInputChange('code', project_id, $event)"></ion-input>
                    <ion-input class="lbrow" :value="beschrijving" :readonly="editAble"
                        @ionInput="onInputChange('beschrijving', project_id, $event)"></ion-input>
                    <ion-col class="col">
                        <ion-button v-if="editAble" @click="btnEdit(project_id)" class="btn">
                            <ion-icon :icon="create" />
                        </ion-button>
                        <ion-button v-if="!editAble" @click="btnSave(project_id)" class="btn">
                            <ion-icon :icon="save" />
                        </ion-button>
                        <ion-button @click="btnDelete(true, project_id)" class="btn">
                            <ion-icon :icon="trash" />
                        </ion-button>
                    </ion-col>
                </ion-item>
            </ion-row>
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

const projects = ref([]);

const axios = inject('axios')

const editAble = ref(true);
const isOpen = ref(false);
const toDeleteId = ref(null);


// https://stackoverflow.com/questions/63343859/whats-the-difference-between-input-and-change-in-vue-input-type-file

const onInputChange = (field, project_id, event) => {
    const updatedInput = projects.value.find(project => project.project_id == project_id); // kijkt de value van de project_id (naam, code, beschrijving en update het)
    updatedInput[field] = event.detail.value;
};

const btnEdit = () => {
    editAble.value = false;
}

const btnSave = (project_id) => {
    const { naam, code, beschrijving } = projects.value.find(project => project.project_id == project_id);
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/UpdateProject.php', {
            project_id: project_id,
            naam: naam,
            code: code,
            beschrijving: beschrijving
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
            window.alert("Het opslagen was gelukt!");
            console.log(response.data);
            editAble.value = true;
            getProjects();
        });
}

const btnDelete = (open, project_id) => {
    if (open) {
        isOpen.value = true;
        toDeleteId.value = project_id;
    } else {
        isOpen.value = false;
    }
}

const btnCancel = () => {
    isOpen.value = false;
}

const btnOk = (toDeleteId) => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Delete.php', {
            project_id: toDeleteId
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
            getProjects();
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('Je kan de medewerker niet verwijderen omdat er een serverfout is opgetreden!');
        });
}

const getProjects = () => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Projectsget.php')
        .then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                return;
            }
            console.log(response.data);
            projects.value = response.data.data;
        });
}

onMounted(() => {
    getProjects();
});
</script>
  
