<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center">Home</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="homeContent">
            <ion-grid class="homeGrid">
                <ion-row>
                    <ion-col class="ion-text-center">
                        <ion-button class="homeBtn" expand="full" href="/tabs/tabOverzicht">
                            <ion-icon class="homeIcon" :icon="desktop"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col class="ion-text-center">
                        <ion-button class="homeBtn" expand="full" href="/tabs/tabLijsten">
                            <ion-icon class="homeIcon" :icon="listOutline"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col class="ion-text-center">
                        <ion-button class="homeBtn" expand="full" href="/tabs/tabAbout">
                            <ion-icon class="homeIcon" :icon="informationCircle"></ion-icon>
                        </ion-button>
                    </ion-col>
                    <ion-col class="ion-text-center">
                        <ion-button class="homeBtn" expand="full" href="/tabs/tabSetting">
                            <ion-icon class="homeIcon" :icon="settings"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>


<script setup>

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/vue';
import { desktop, listOutline, settings, informationCircle } from 'ionicons/icons';

/** Zo wordt de darkmode value van localstorage geladen in home page */
import {onMounted} from 'vue';

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