<template>
    <ion-content :fullscreen="true">
        <ion-grid>
            <ion-row class="header-row">
                <ion-col class="lbrow">Naam</ion-col>
                <ion-col class="lbrow">Code</ion-col>
                <ion-col class="lbrow">Omschrijving</ion-col>
                <ion-col class="lbrow">Button</ion-col>
            </ion-row>
            <ion-row class="item" v-for="{ project_id, naam, code, beschrijving, editable } in projects" :key="project_id">
                <!-- :class of chatgpt make a class where you can set a condition that you can style accordingly -->
                <ion-input class="lbrow" :value="naam" :readonly="!editable" :class="{ 'editable': editable }"
                    @ionInput="onInputChange('naam', project_id, $event)"></ion-input>
                <!--readonly so that you cannot directly write on the input field-->
                <ion-input class="lbrow" :value="code" :readonly="!editable" :class="{ 'editable': editable }"
                    @ionInput="onInputChange('code', project_id, $event)"></ion-input>
                <ion-input class="lbrow" :value="beschrijving" :readonly="!editable" :class="{ 'editable': editable }"
                    @ionInput="onInputChange('beschrijving', project_id, $event)"></ion-input>
                <ion-col class="lbrow">
                    <ion-button v-if="!editable" @click="btnEdit(project_id)">
                        <ion-icon :icon="create" />
                    </ion-button>
                    <ion-button v-if="editable" @click="btnSave(project_id)">
                        <ion-icon :icon="save" />
                    </ion-button>
                    <ion-button @click="btnDelete(true, project_id)">
                        <ion-icon class="icon" :icon="trash" />
                    </ion-button>
                </ion-col>
            </ion-row>
            <ion-modal :is-open="isOpen">
                <ion-grid class="modal-wrapper">
                    <ion-row class="ion-align-items-center ion-justify-content-center">
                        <ion-col :size="12" class="modal-content">
                            <p>Ben je zeker dat je dit wil verwijderen?</p>
                            <ion-row class="modal-buttons ion-justify-content-center">
                                <ion-col>
                                    <ion-button @click="btnOk(toDeleteId)" expand="full">
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
import { trash, save, create, happy, sad } from 'ionicons/icons';

const projects = ref([]);

const axios = inject('axios')
const isOpen = ref(false);
const toDeleteId = ref(null);


// https://stackoverflow.com/questions/63343859/whats-the-difference-between-input-and-change-in-vue-input-type-file

const onInputChange = (field, project_id, event) => {
    const updatedInput = projects.value.find(project => project.project_id == project_id); // kijkt de value van de project_id (naam, code, beschrijving en update het)
    updatedInput[field] = event.detail.value;
};

const btnEdit = (project_id) => {
    projects.value.forEach(project => {
        project.editable = project.project_id == project_id
    });
}

const btnSave = (project_id) => {
    const editedProject = projects.value.find(project => project.project_id == project_id);
    const { naam, code, beschrijving } = editedProject;
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/UpdateProject.php', {
            project_id: project_id,
            naam: naam,
            code: code,
            beschrijving: beschrijving
        })
        .then(response => response.data)
        .then(responseData => {
            if (responseData.status == 'ok') {
                window.alert('Het opslaan was gelukt!');
                console.log(responseData.data);
                editedProject.editable = false;
                getProjects();
            } else {
                console.log('Response data is not ok');
                window.alert('Je hebt niets veranderd.');
                editedProject.editable = false;
            }
        })
        .catch(error => {
            console.error('Error saving project:', error);
            window.alert('Er is een fout opgetreden bij het opslaan van het project.');
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
        .then(response => response.data)
        .then(responseData => {
            if (responseData && responseData.status == 'ok') {
                console.log(responseData.data);
                isOpen.value = false;
                getProjects();
            } else {
                window.alert('Je kan het project niet verwijderen omdat er een serverfout is opgetreden!');
            }
        })
        .catch(error => {
            console.error('Error deleting project:', error);
            window.alert('Je kan het project niet verwijderen omdat er een serverfout is opgetreden!');
        });
}

const getProjects = () => {
    axios
        .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Projectsget.php')
        .then(response => {
            if (response.status != 200) {
                console.log(response.status);
            }
            if (!response.data.data) {
                console.log('response.data.data is not ok');
                return;
            }
            console.log(response.data);
            projects.value = response.data.data.map(project => ({
                ...project,
                editable: false
            }));
        })
        .catch(error => {
            console.error('Error fetching Projects:', error);
        });
}

onMounted(() => {
    getProjects();
});
</script>
  
<style scoped>
@import '@/theme/styles.css';
</style>

