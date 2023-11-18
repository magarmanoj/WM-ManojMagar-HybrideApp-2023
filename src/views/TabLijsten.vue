<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-grid>
                    <ion-title class="ion-text-center">Lijsten</ion-title>
                    <ion-row>
                        <ion-col class="btnLijst">
                            <ion-button @click="toggleTable('medeProj')">Toon medewerker/project lijst!</ion-button>
                        </ion-col>
                        <ion-col class="btnLijst">
                            <ion-button @click="toggleTable('project')">Toon projecten lijst!</ion-button>
                        </ion-col>
                        <ion-col class="btnLijst">
                            <ion-button @click="toggleTable('medewerker')">Toon Medewerker Lijst</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <TabelMedewerker v-if="toonMedewerkerLijst"></TabelMedewerker>
            <TabelProject v-if="toonProjectLijst"></TabelProject>
            <TabelMedeProj v-if="toonMedeProjLijst"></TabelMedeProj>
        </ion-content>
    </ion-page>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
import TabelMedewerker from './viewsTabel/tabelMedewerker.vue';
import TabelProject from './viewsTabel/tabelProject.vue';
import TabelMedeProj from './viewsTabel/tabelMedeProj.vue';

const toonMedewerkerLijst = ref(false);
const toonProjectLijst = ref(false);
const toonMedeProjLijst = ref(false);

const toggleTable = (table) => {
    toonMedewerkerLijst.value = table == 'medewerker' ? !toonMedewerkerLijst.value : false;
    toonProjectLijst.value = table == 'project' ? !toonProjectLijst.value : false;
    toonMedeProjLijst.value = table == 'medeProj' ? !toonMedeProjLijst.value : false;
};

onMounted(() => {
    const savedDarkMode = localStorage.getItem('darkmode');
    if (savedDarkMode != null) {
        const shouldAdd = savedDarkMode == 'true';
        document.body.classList.toggle('dark', shouldAdd);
    }
});
</script>
  
<style>
@import '@/theme/styles.css';
</style>
  