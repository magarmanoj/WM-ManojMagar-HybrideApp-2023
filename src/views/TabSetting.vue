<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Setting</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list class="settingContent">
                <ion-item>
                    <ion-toggle :checked="darkmode" @ion-change="toggleDarkMode">Darkmode <ion-icon :icon="moon"></ion-icon></ion-toggle>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup>

/**https://ionicframework.com/docs/theming/dark-mode */
import {onMounted, ref} from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonToggle, IonList, IonItem, IonIcon } from '@ionic/vue';
import {moon} from 'ionicons/icons';

const darkmode = ref(false);

const toggleDarkMode = () => {
    darkmode.value = !darkmode.value;
    toggleDarkTheme(darkmode.value);
    localStorage.setItem('darkmode', darkmode.value.toString());
}

const toggleDarkTheme = (shouldAdd) => {
  document.body.classList.toggle('dark', shouldAdd);
};

onMounted(() => {
  // Initialize dark mode based on the saved preference
  const savedDarkMode = localStorage.getItem('darkmode');
    if (savedDarkMode != null) {
        darkmode.value = savedDarkMode == 'true';
        toggleDarkTheme(darkmode.value);
    }
});

</script>

<style>
.settingContent {
    align-items: center;
}
</style>