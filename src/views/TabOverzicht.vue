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
              <ion-col class="ion-text-center">Welke medewerker wil je toevoegen?</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input label="Voornaam" label-placement="stacked" placeholder="Naam" v-model="medewerkerNaam"
                    required="true"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Familienaam" label-placement="stacked" placeholder="familienaam"
                    v-model="medewerkerFamilienaam" required="true"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-select label="Specialisatie" label-placement="stacked" interface="popover"
                    placeholder="Selecteer specialisatie" v-model="specialisatie">
                    <ion-select-option value="0" disabled="true">Welke type product?</ion-select-option>
                    <ion-select-option value="Business & system analyst">Business & system analyst</ion-select-option>
                    <ion-select-option value="System administrator">System administrator</ion-select-option>
                    <ion-select-option value="Software developer">Software developer</ion-select-option>
                    <ion-select-option value="Web developer">Web developer</ion-select-option>
                    <ion-select-option value="Network specialist">Network specialist</ion-select-option>
                    <ion-select-option value="Digital consultant">Digital consultant</ion-select-option>
                    <ion-select-option value="AI & data engineer">AI & data engineer</ion-select-option>
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
              <ion-col class="ion-text-center">Welke project wil je toevoegen?</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input label="Naam" label-placement="stacked" placeholder="Naam project" v-model="projectNaam" required="true"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Code" label-placement="stacked" placeholder="code"  v-model="projectCode" required="true"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Omschrijving" label-placement="stacked" placeholder="Omschrijving" v-model="projectOmschrijving" required="true"></ion-input>
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
              <ion-col class="ion-text-center">Medewerkers toewijzen aan een project en verwijderen van een
                projecten</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-input label="Mederwerker_id" label-placement="stacked" placeholder="medewerker id" type="number"
                    required="true" @ion-blur="logProduct()"></ion-input>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item>
                  <ion-input label="Project_id" label-placement="stacked" placeholder="priject id" type="number"
                    required="true" @ion-blur="logProduct()"></ion-input>
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

        <ion-row> <!-- Derde rij -->
          <ion-col>
            <ion-button @click="toonMedeProj()">Toon medewerker/project lijst!</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="toonProjecten()">Toon projecten lijst!</ion-button>
          </ion-col>
          <ion-col>
            <ion-button @click="toonMedewerkers">Toon Medewerker Lijst</ion-button>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, inject } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonSelect, IonSelectOption, IonButton, modalController  } from '@ionic/vue';
import TabelMedewerker from './viewsTabel/tabelMedewerker.vue';

const medewerkerNaam = ref('');
const medewerkerFamilienaam = ref('');
const specialisatie = ref('');

const projectNaam = ref('');
const projectCode = ref('');
const projectOmschrijving = ref('');

const axios = inject('axios')
const addMedewerker = () => {
  axios
    .post('https://manojmagar.be/RESTfulAPI/Taak1/api/WerkerProjectadd.php', {
      voornaam: medewerkerNaam.value,
      familienaam: medewerkerFamilienaam.value,
      specialisatie: specialisatie.value
    })
    .then(response => {
      console.log(response);
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        medewerkerNaam.value = '';
        medewerkerFamilienaam.value = '';
        specialisatie.value = '';
      }
    })
}

const addProject = () => {
  axios
    .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Projectsadd.php', {
      naam: projectNaam.value,
      code: projectCode.value,
      beschrijving: projectOmschrijving.value
    })
    .then(response => {
      console.log(response);
      if (response.status !== 200) {
        console.log(response.status);
      } else {
        projectNaam.value = '';
        projectCode.value = '';
        projectOmschrijving.value = '';
      }
    })
}

const verzendMedewerker = () => {
  addMedewerker();
};

const verzendProduct = () => {
  addProject();
};

const toonMedewerkers = async () => {
  const modal = await modalController.create({
    component: TabelMedewerker,
    cssClass: 'tabel-medewerker-modal',
  });
  await modal.present();
};
</script>


<style>
.tabel-medewerker-modal {
  max-width: 80%;
  width: 90%;
  height: 80%;
  margin: auto;
}

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
