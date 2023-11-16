<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Setting</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-toggle @click="toggleDark()">Dark Mode</ion-toggle>
        </ion-content>
    </ion-page>
</template>

<script setup>
/**https://www.youtube.com/watch?v=7_mqThfC_yM */
import { watch } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonToggle } from '@ionic/vue';
import {useDark, useToggle} from '@vueuse/core'


const darkmode = useDark();
const toggleDark = useToggle(darkmode);
watch(() => darkmode.value, (newValue) => {
    console.log(newValue);
});
</script>
  
