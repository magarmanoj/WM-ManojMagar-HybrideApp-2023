<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="ion-text-center">About Us</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Welkom!</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-grid class="about-section">
                        <ion-row>
                            <ion-col class="aboutcol">
                                <ion-img src="https://cdn.discordapp.com/attachments/925348541415698472/1173969493656084550/image.png?ex=6565e34a&is=65536e4a&hm=78ac44c8700430510c4ee866a4983a7d5377c528de676907a29f4b544de3a30b&" alt="Author's Photo" class="photo"></ion-img>
                            </ion-col>
                            <ion-col class="aboutcol">
                                <ion-card-content>
                                    <ion-label>Over de auteur</ion-label>
                                    <p>
                                        Hallo, ik ben Magar Manoj, de auteur van deze app. Ik heb deze applicatie gemaakt om
                                        u te
                                        helpen werknemers en projecten efficiënt te beheren.
                                    </p>
                                    <ion-label>Over de app</ion-label>
                                    <p>
                                        Met deze app kunt u medewerkers en projecten beheren. U kunt medewerkers aanmaken,
                                        bewerken en toewijzen aan projecten.
                                    </p>
                                </ion-card-content>
                            </ion-col>
                        </ion-row>
                    </ion-grid>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>
  
<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonImg, IonCol, IonLabel } from '@ionic/vue';
</script>
  
<style>
@import '@/theme/styles.css';
</style>
