<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="overzicht" href="/tabs/tabOverzicht">
          <ion-icon aria-hidden="true" :icon="addCircle" />
          <ion-label>Nieuw</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="lijsten" href="/tabs/tabLijsten">
          <ion-icon aria-hidden="true" :icon="listOutline" />
          <ion-label>Lijsten</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="about" href="/tabs/tabAbout">
          <ion-icon aria-hidden="true" :icon="listOutline" />
          <ion-label>About</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup>
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { addCircle, listOutline } from 'ionicons/icons';

</script>
