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

        <ion-row class="row1"> <!-- Eerste rij -->
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
                  <ion-input label="Naam" label-placement="stacked" placeholder="Naam project" v-model="projectNaam"
                    required="true"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Code" label-placement="stacked" placeholder="code" v-model="projectCode"
                    required="true"></ion-input>
                </ion-item>
                <ion-item>
                  <ion-input label="Omschrijving" label-placement="stacked" placeholder="Omschrijving"
                    v-model="projectOmschrijving" required="true"></ion-input>
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

        <ion-row class="row2"> <!-- Tweede rij -->
          <ion-col>
            <ion-row>
              <ion-col class="ion-text-center">Medewerkers toewijzen aan een project en verwijderen van een
                projecten</ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-item>
                  <ion-select label="Selecteer Medewerker" label-placement="stacked" interface="popover"
                    placeholder="Selecteer Medewerker"  v-model="selectedMedewerker">
                    <ion-select-option v-for="{ medewerker_id, voornaam, familienaam } in medewerkers" :key="medewerker_id" :value="medewerker_id">
                {{ voornaam }} {{ familienaam }}
              </ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-col>
              <ion-col>
                <ion-item>
                  <ion-select label="Selecteer Project" label-placement="stacked" interface="popover"
                    placeholder="Selecteer Project"  v-model="selectedProject">
                    <ion-select-option v-for="{ project_id, naam } in projects" :key="project_id"
                      :value="project_id">
                      {{ naam }}
                    </ion-select-option>
                  </ion-select>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col>
                <ion-button @click="toewijzen()">Toewijzen!</ion-button>
              </ion-col>
              <ion-col>
                <ion-button @click="verwijderen()">Verwijderen!</ion-button>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonInput, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';

const axios = inject('axios')

const projects = ref([]);
const medewerkers = ref([]);

// medewerkers toevoegen
const medewerkerNaam = ref('');
const medewerkerFamilienaam = ref('');
const specialisatie = ref('');

// projecten toevoegen
const projectNaam = ref('');
const projectCode = ref('');
const projectOmschrijving = ref('');

// projecten toewijzen aan een medewerkers of verwijderen.
const selectedMedewerker = ref('');
const selectedProject = ref('');

const getMedewerkersAndProjects = () => {
  axios
    .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Medewerkerget.php')
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
      }
      if (!response.data.data) {
        console.log('response.data.data is not ok');
        return;
      }
      medewerkers.value = response.data.data.map(medewerker => ({
        ...medewerker
      }));
    })
    .catch(error => {
      console.error('Error fetching Medewerkers:', error);
    });

  axios
    .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Projectsget.php')
    .then(response => {
      if (response.status !== 200) {
        console.log(response.status);
      }
      if (!response.data.data) {
        console.log('response.data.data is not ok');
        return;
      }
      /** Maak een lijst en voegd alle data toe in dit array
       * projects.value = [];
            for (let i = 0, end = response.data.data.length; i < end; i++) {
                projects.value.push(response.data.data[i]);
            } 
            Onderaan is kortere versie     
            */
      projects.value = response.data.data.map(project => ({
        ...project
      }));
    })
    .catch(error => {
      console.error('Error fetching Projects:', error);
    });
}


const addMedewerker = () => {
  if (medewerkerNaam.value.trim() == '' || medewerkerFamilienaam.value.trim() == '' || specialisatie.value.trim() == '') {
    window.alert('Een of meerdere waardes zijn leeg!');
    return;
  }
  axios
    .post('https://manojmagar.be/RESTfulAPI/Taak1/api/WerkerProjectadd.php', {
      voornaam: medewerkerNaam.value,
      familienaam: medewerkerFamilienaam.value,
      specialisatie: specialisatie.value
    })
    .then(response => response.data)
    .then(responseData => {
      if (responseData.status == 'ok') {
        medewerkerNaam.value = '';
        medewerkerFamilienaam.value = '';
        specialisatie.value = '';
        window.alert('Medewerker toegevoegd.');
      } else {
        window.alert('Er is een fout opgetreden bij het toevoegen van de medewerker.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      window.alert('Er is een fout opgetreden bij het toevoegen van de medewerker.');
    });
}

const addProject = () => {
  if (projectNaam.value.trim() == '' || projectCode.value.trim() == '' || projectOmschrijving.value.trim() == '') {
    window.alert('Een of meerdere waardes zijn leeg!');
    return;
  }
  axios
    .post('https://manojmagar.be/RESTfulAPI/Taak1/api/Projectsadd.php', {
      naam: projectNaam.value,
      code: projectCode.value,
      beschrijving: projectOmschrijving.value
    })
    .then(response => response.data)
    .then(responseData => {
      if (responseData.status == 'ok') {
        projectNaam.value = '';
        projectCode.value = '';
        projectOmschrijving.value = '';
        window.alert('Project toegevoegd.');
      } else {
        window.alert('Er is een fout opgetreden bij het toevoegen van het project.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      window.alert('Er is een fout opgetreden bij het toevoegen van het project.');
    });
}

// combobox: show all the medewerkers en voor project alle de project 
const toewijzen = () => {
  if (!selectedMedewerker.value || !selectedProject.value) {
  window.alert('Selecteer een medewerker en een project.');
  return;
}
  axios
    .post('https://manojmagar.be/RESTfulAPI/Taak1/api/ToewijzenMedeProject.php', {
      medewerker_id: selectedMedewerker.value,
      project_id: selectedProject.value
    })
    .then(response => response.data)
    .then(responseData => {
      if (responseData.status == 'ok') {
        selectedMedewerker.value = '';
        selectedProject.value = '';
        window.alert('Medewerker aan een project toegewezen.');
      } else {
        window.alert('Er is een fout opgetreden bij het toevoegen.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      window.alert('Er is een fout opgetreden bij het toevoegen.');
    });
}

const verwijderenProjectMedewerker = () => {
  if (!selectedMedewerker.value || !selectedProject.value) {
    window.alert('Selecteer een medewerker en een project.');
    return;
  }

  axios
    .post('https://manojmagar.be/RESTfulAPI/Taak1/api/VerwijderMedeProject.php', {
      medewerker_id: selectedMedewerker.value,
      project_id: selectedProject.value
    })
    .then(response => response.data)
    .then(responseData => {
      if (responseData.status == 'ok') {
        selectedMedewerker.value = '';
        selectedProject.value = '';
        window.alert('Verwijderen is gelukt.');
      } else {
        window.alert('Er is een fout opgetreden bij het verwijderen.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      window.alert('Er is een fout opgetreden bij het verwijderen.');
    });
};



const verzendMedewerker = () => {
  addMedewerker();
};

const verzendProduct = () => {
  addProject();
};



const verwijderen = () => {
  verwijderenProjectMedewerker();
};

onMounted(() => {
  getMedewerkersAndProjects();
});

</script>

<style>@import '@/theme/styles.css';</style>
