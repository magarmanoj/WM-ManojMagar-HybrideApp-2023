<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>About Us</ion-title>
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
                            <ion-col>
                                <ion-img
                                    src="https://avatars.githubusercontent.com/u/113712069?s=400&u=a54d56b1cbbabf8ef745b80d3f8cf7430af0b1e9&v=4"
                                    alt="Author's Photo" class="photo"></ion-img>
                            </ion-col>
                            <ion-col>
                                <ion-card-content>
                                    <ion-label color="primary">Over de auteur</ion-label>
                                    <p>
                                        Hallo, ik ben Magar Manoj, de auteur van deze app. Ik heb deze applicatie gemaakt om u te
                                        helpen werknemers en projecten efficiënt te beheren.
                                    </p>
                                    <ion-label color="primary">Over de app</ion-label>
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
.photo {
  width: 35em; 
  height: 35em; 
}
</style>

<style scoped>
/* Style for ion-row and ion-col elements */
ion-row {
  margin-bottom: 10px;
}

ion-col {
  padding: 10px;
  border: 1px solid #ccc;
}

/* Style for ion-button elements */
ion-button {
  margin-right: 10px;
}

/* Style for ion-input elements */
ion-input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 10px;
}

/* Center the text in ion-col with class ion-text-center */
.ion-text-center {
  text-align: center;
}

/* Style for labels */
ion-label {
  font-weight: bold;
}

/* Style for ion-select elements */
ion-select {
  width: 100%;
}

/* Style for ion-select-option elements */
ion-select-option {
  font-weight: normal;
}

/* Style for ion-card elements */
ion-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Add more styles as needed */
</style>
