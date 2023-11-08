<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-grid>
                    <ion-row>
                        <ion-title class="ion-text-center">Lijsten</ion-title>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                            <ion-button @click="toonMedeProj">Toon medewerker/project lijst!</ion-button>
                        </ion-col>
                        <ion-col>
                            <ion-button @click="toonProjecten">Toon projecten lijst!</ion-button>
                        </ion-col>
                        <ion-col>
                            <ion-button @click="toonMedewerkers">Toon Medewerker Lijst</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <TabelMedewerker v-if="toonMedewerkerLijst"></TabelMedewerker>
            <TabelProject v-if="toonProjectLijst"></TabelProject>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
import TabelMedewerker from './viewsTabel/TabelMedewerker.vue';
import TabelProject from './viewsTabel/TabelProject.vue';

const toonMedewerkerLijst = ref(false);
const toonProjectLijst = ref(false);
const toonMedeProjLijst = ref(false);

const toonMedewerkers = () => {
    toonMedewerkerLijst.value = true;
    toonProjectLijst.value = false;
    toonMedeProjLijst.value = false;
}

const toonProjecten = () => {
    toonMedewerkerLijst.value = false;
    toonProjectLijst.value = true;
    toonMedeProjLijst.value = false;
}

const toonMedeProj = () => {
    toonMedewerkerLijst.value = false;
    toonProjectLijst.value = false;
    toonMedeProjLijst.value = true;
}
</script>

<style scoped>

ion-row {
    margin-top: 1em;
}

ion-col{
    border: 1px solid black;
    display: flex;
    justify-content: center;
    padding: 1em;
}
</style>