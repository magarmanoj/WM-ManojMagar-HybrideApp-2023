<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Beheren van medewerkers en projecten</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Voeg een medewerker toe</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-grid>

        <ion-row> <!-- Eerste rij -->
          <ion-col>
            <ion-row>
              <ion-col class="ion-text-center">Welk medewerker wil je toevoegen?</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input 
                  label="Voornaam" 
                  label-placement="stacked" 
                  placeholder="Naam" 
                  required="true"
                  @ion-blur="logProduct()"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input 
                  label="Familienaam" 
                  label-placement="stacked" 
                  placeholder="familienaam" 
                  required="true"
                  @ion-blur="logProduct()"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-select 
                  label="Specialisatie" 
                  label-placement="stacked" 
                  interface="popover"
                  placeholder="Selecteer specialisatie" 
                  @ion-change="logProduct()">
                    <ion-select-option value="0" disabled="true">Welk type product?</ion-select-option>
                    <ion-select-option value="1">Business & system analyst</ion-select-option>
                    <ion-select-option value="2">System administrator</ion-select-option>
                    <ion-select-option value="3">Software developer</ion-select-option>
                    <ion-select-option value="4">Web developer</ion-select-option>
                    <ion-select-option value="5">Network specialist</ion-select-option>
                    <ion-select-option value="6">Digital consultant</ion-select-option>
                    <ion-select-option value="7">AI & data engineer</ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-button @click="verzendMedewerker()">Voeg medewerkers toe!</ion-button>
              </ion-col>
            </ion-row>
          </ion-col>

          <ion-col>
            <ion-row> 
              <ion-col class="ion-text-center">Welk project wil je toevoegen?</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input 
                  label="Naam" 
                  label-placement="stacked" 
                  placeholder="Naam project" 
                  required="true"
                  @ion-blur="logProduct()"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input 
                  label="Code" 
                  label-placement="stacked"
                  placeholder="code" 
                  type="number" 
                  required="true"
                  @ion-blur="logProduct()"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input 
                  label="Omschrijving" 
                  label-placement="stacked" 
                  placeholder="Omschrijving" 
                  required="true"
                  @ion-blur="logProduct()"></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-button @click="verzendProduct()">Voeg projecten toe!</ion-button>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <ion-row> <!-- Tweede rij -->
          <ion-col>
            <ion-row>
            <ion-col class="ion-text-center">Medewerkers toewijzen aan een project en verwijderen van een projecten</ion-col>
          </ion-row>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input 
                  label="Mederwerker_id" 
                  label-placement="stacked" 
                  placeholder="medewerker id" 
                  type="number"
                  required="true" 
                  @ion-blur="logProduct()"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item>
                  <ion-input 
                  label="Project_id" 
                  label-placement="stacked" 
                  placeholder="priject id" 
                  type="number"
                  required="true" 
                  @ion-blur="logProduct()"></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-button @click="verzendProduct()">Toewijzen!</ion-button>
              </ion-col>
              <ion-col>
                <ion-button @click="verzendProduct()">Verwijderen!</ion-button>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <ion-row>   <!-- Derde rij -->
          <ion-col>
            <ion-button @click="verzendProduct()">Toon medewerker/project lijst!</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="verzendProduct()">Toon projecten lijst!</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="verzendProduct()">Toon medewerker lijst!</ion-button>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';


const verzendMedewerker = () => {
  logProduct();
};

</script>


<style>

ion-row {
  margin-bottom: 1em;
}

ion-col {
  padding: 1em;
}

ion-button {
  margin-right: 1em; 
  display: flex;
  justify-content: center;
  --background: green;
}


ion-input {
  margin-bottom: 1em; 
}

ion-select {
  width: 50%;
  margin-bottom: 1em; 

}

ion-select-option {
  font-weight: normal;
}

.ion-text-center {
  margin-bottom: 1em;
}

</style>
