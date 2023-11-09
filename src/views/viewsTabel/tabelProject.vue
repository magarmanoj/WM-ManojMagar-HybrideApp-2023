<template>
    <ion-content :fullscreen="true">
        <ion-list>
            <ion-row class="header-row">
                <ion-col>Naam</ion-col>
                <ion-col>Code</ion-col>
                <ion-col>Omschrijving</ion-col>
                <ion-col>Button</ion-col>
            </ion-row>
            <ion-item v-for="{ project_id, naam, code, beschrijving } in projects" :key="project_id">
                <ion-label class="lbrow" :contenteditable="editAble">{{ naam }}</ion-label>
                <ion-label class="lbrow" :contenteditable="editAble">{{ code }}</ion-label>
                <ion-label class="lbrow" :contenteditable="editAble">{{ beschrijving }}</ion-label>
                <ion-col class="col">
                    <ion-button v-if="!editAble" @click="btnEdit(project_id)" class="btn">Edit</ion-button>
                    <ion-button v-if="editAble" @click="btnSave(project_id)" class="btn">Save</ion-button>
                    <ion-button @click="btnDelete(true, project_id)" class="btn">Delete</ion-button>
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
import { IonContent, IonList, IonItem, IonLabel, IonRow, IonCol, IonButton, IonModal } from '@ionic/vue';

const projects = ref([]);

const axios = inject('axios')

const editAble = ref(false);
const isOpen = ref(false);
const toDeleteId = ref(null);

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

const btnEdit = (project_id) => {
    editAble.value = true;
    projects.value.forEach(project => {
        project.editAble = project.project_id == project_id;
    })
}


// werk nog niet 
const btnSave = () => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/UpdateProject.php',)
        .then(response => {
            if (response.status !== 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                return;
            }
            console.log(response.data);
            projects.value = [];
            for (let i = 0, end = response.data.data.length; i < end; i++) {
                projects.value.push(response.data.data[i]);
            }
        });
    editAble.value = false;
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
            projects.value = [];
            for (let i = 0, end = response.data.data.length; i < end; i++) {
                projects.value.push(response.data.data[i]);
            }
        });
}
onMounted(() => {
    getProjects();
});

</script>