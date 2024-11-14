// script.js
let character = {
    species: '',
    subspecies: '',
    class: '',
    abilities: {},
    spells: [],
    racialSpells: [],
    flavour: ''
};

const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
let scores = {  str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8};
let pointsSpent = 0;
let spellManager;

document.addEventListener('DOMContentLoaded', function() {
    spellManager = new SpellManager();
});

function replaceContentInContainer(target, source) {
    const targetElement = document.getElementById(target);
    const sourceElement = document.getElementById(source);
    const characterSummary = document.getElementById('characterSummary');

    if (source === "homepage") {
        characterSummary.style.display = 'none';
    } else {
        characterSummary.style.display = 'block';
    }
    
    targetElement.innerHTML = sourceElement.innerHTML;
}

function showSpeciesFeatures(speciesId) {
    document.getElementById('speciesTextBoxes').style.display = 'block'
    // Remove 'Box' from the end of the id
    let species = speciesId.replace('Box', '');

    // Clear previous species features
    document.getElementById('speciesFeaturesContainer').innerHTML = '';

    let description = '';
    let numFeatures = 0;
    let speciesFeatureText = '';

    // Set description and number of features based on species
    switch(speciesId) {
    case 'elfBox':
        description = 'elf text';
        break;
    case 'tieflingBox':
        description = 'elf text';
        break;
    case 'drowBox':
        description = 'elf text';
        break;
    case 'humanBox':
        description = 'elf text';
        break;
    case 'githBox':
        description = 'elf text';
        break;
    case 'dwarfBox':
        description = 'elf text';
        break;
    case 'half-elfBox':
        description = 'tester';
        break;
    case 'halflingBox':
        description = 'elf text';
        break;
    case 'gnomeBox':
        description = 'elf text';
        break;
    case 'dragonBox':
        description = 'githyanki text';
        break;
    case 'halforcBox':
        description = 'githyanki text';
        break;
    }

    // Update species description
    document.querySelector('.speciesName').nextElementSibling.textContent = description;

    // Update character object
    character.species = speciesId.replace('Box', '');
    character.subspecies = ''; // Reset subspecies when a new species is selected
    updateCharacterSummary();

    // Generate species feature boxes
    for (let i = 0; i < numFeatures; i++) {
    const speciesFeaturesBox = document.createElement('div');
    speciesFeaturesBox.speciesName = 'speciesFeaturesBox';
    speciesFeaturesBox.textContent = `${ speciesFeatureText} ${i + 1}`;
    document.getElementById('speciesFeaturesContainer').appendChild(speciesFeaturesBox);
    }

    // Update species name
    updateSpeciesName(speciesId.replace('Box', '').charAt(0).toUpperCase() + speciesId.replace('Box', '').slice(1));
    // Open subspecies modal
    openSubspecies(speciesId.replace('Box', ''));
}

function openSubspecies(selectedSpecies) {
    var modal = document.getElementById("subspeciesModal");
    var span = document.getElementsByClassName("close")[0];
    var title = document.getElementById("subspeciesTitle");
    var buttonContainer = document.getElementById("subspeciesButtons");
    var leftBox = document.getElementById("default");
    selectedSpecies = selectedSpecies.toLowerCase();

    // Clear previous buttons
    buttonContainer.innerHTML = '';

    let subspecies = [];

    // Handle species with subspecies
    if (!['drow', 'human', 'githyanki', 'half-orc'].includes(selectedSpecies)) {
        modal.style.display = "block";
        console.log(selectedSpecies, "subspecies opened");
        title.textContent = `Choose ${ selectedSpecies} Subspecies`;

        switch(selectedSpecies) {
            case 'elf':
                subspecies = ['High Elf', 'Wood Elf'];
                break;
            case 'tiefling':
                subspecies = ['Asmodeus Tiefling', 'Mephistopheles Tiefling', 'Zariel Tiefling'];
                break;
            case 'dwarf':
                subspecies = ['Hill Dwarf', 'Mountain Dwarf', 'Duergar'];
                break;
            case 'half-elf':
                subspecies = ['High Half-Elf', 'Wood Half-Elf', 'Drow Half-Elf'];
                break;
            case 'halfling':
                subspecies = ['Lightfoot Halfling', 'Stout Halfling'];
                break;
            case 'gnome':
                subspecies = ['Forest Gnome', 'Rock Gnome', 'Deep Gnome'];
                break;
            case 'dragonborn':
                subspecies = [
                    'Gold Draconic',
                    'Black Draconic',
                    'Blue Draconic',
                    'Brass Draconic',
                    'Bronze Draconic',
                    'Copper Draconic',
                    'Green Draconic',
                    'Red Draconic',
                    'Silver Draconic',
                    'White Draconic'
                ];
                break;
        }

        if (subspecies.length > 0) {
            subspecies.forEach(sub => {
                let button = document.createElement('button');
                button.textContent = sub;
                button.className = 'modal-button';
                button.onclick = function() {
                    updateSpeciesName(sub);
                    console.log(`Selected subspecies: ${ sub}`);
                    modal.style.display = "none";
                };
                buttonContainer.appendChild(button);
            });

            // Position the modal next to the leftBox
            var rect = leftBox.getBoundingClientRect();
            modal.style.left = (rect.right + 10) + 'px';
            modal.style.top = rect.top + 'px';
            modal.style.display = "block";
        }
    } else {
        // Handle species without subspecies
        modal.style.display = "none";
        // Capitalize first letter of species name
        const capitalizedSpecies = selectedSpecies.charAt(0).toUpperCase() + selectedSpecies.slice(1);
        updateSpeciesName(capitalizedSpecies);
    }
}

function updateSpeciesName(name) {
    document.querySelector('.speciesName').textContent = name;
        
    // Update description and features if it's a subspecies
    if (subspeciesData[name]) {
        document.querySelector('.speciesName').nextElementSibling.textContent = subspeciesData[name].description;
        updateFeatures(subspeciesData[name].numFeatures, name.toLowerCase().replace(' ', '-'), 'speciesFeaturesContainer');
    }

    if (subspeciesData[name]) {
        character.subspecies = name;
        // Check for racial spells from subspecies
        if (racialSpells[name]) {
            character.racialSpells = racialSpells[name].innateSpells || [];
            spellManager.initializeRacialSpells(name);
        }
    } else {
        character.species = name;
        character.subspecies = '';
        // Check for racial spells from species
        if (racialSpells[name]) {
            character.racialSpells = racialSpells[name].innateSpells || [];
            spellManager.initializeRacialSpells(name);
        }
    }
    updateCharacterSummary();
}

function updateClass(charClass) {
    document.getElementById("classTextBoxes").style.display = "block"
    document.querySelector('.className').textContent = charClass;
    
    // Update description and features if it's a subspecies
    if (classData[charClass]) {
    document.querySelector('.className').nextElementSibling.textContent = classData[charClass].description;
    updateFeatures(classData[charClass].numFeatures, charClass.toLowerCase().replace(' ', '-'), 'classFeaturesContainer');
    }

    // // Update character object
    character.class = charClass;
    // Initialize spells combining racial and class spells
    if (['Wizard', 'Sorcerer', 'Warlock', 'Bard', 'Cleric', 'Druid', 'Paladin', 'Ranger'].includes(charClass)) {
        spellManager.initializeClassSpells(charClass);
        document.getElementById('spellsContainer').style.display = 'block';
    } else {
        // If not a spellcasting class, only show racial spells if any
        if (character.racialSpells.length > 0) {
            document.getElementById('spellsContainer').style.display = 'block';
        } else {
            document.getElementById('spellsContainer').style.display = 'none';
        }
    }

    updateCharacterSummary();
}

function updateFeatures(numFeatures, thing, containerID) {
    console.log(thing)
    const featuresContainer = document.getElementById(containerID);
    featuresContainer.innerHTML = ''; // Clear existing features
    
    // Extract the base species name (text after the hyphen)
    const basething = thing.includes('-') ? thing.split('-')[1].toLowerCase() : thing.toLowerCase();
    
    for (let i = 0; i < numFeatures; i++) {
      const featuresBox = document.createElement('div');
      featuresBox.className = 'featuresBox';
      
      const img = document.createElement('img');
      if (thing.includes('-')) {
        img.src = i === 0 ? `${ basething}-base.jpg` : `${thing}-${i}.jpg`;
        console.log("test",img.src)
      }
      else {
        img.src = `${thing}-${i}.jpg`;
      }
      img.alt = `${ thing} feature ${i + 1}`;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.borderRadius = 'inherit';
      
      featuresBox.appendChild(img);
      featuresContainer.appendChild(featuresBox);
    }
}

function updateCharacterSummary() {
    const element = document.getElementById('charSummary');
    let summaryHTML = '<h2>Character Summary</h2>';
    
    if (character.subspecies) {
        speciesSummary.textContent = "Species: " + character.subspecies;
        speciesSummary.style.display = "block";
    }
    if (character.class) {
        classSummary.textContent = "Class: " + character.class;
        classSummary.style.display = "block";
    }
    if (Object.keys(character.abilities).length > 0) {
        for (let ability in character.abilities) {
        const score = document.getElementById(`${ ability}Score`).textContent;
        const modifier = document.getElementById(`${ ability}Mod`).textContent;
        const summaryAbilityElement = document.getElementById(`summary${ ability.toUpperCase()}`);
        if (summaryAbilityElement) {
            summaryAbilityElement.textContent = `${ score} (${modifier})`;
        } else {
            console.error(`Element with id summary${ ability.toUpperCase()} not found`);
        }
        }
        summaryAbilityScores.style.display = "block";
    }
    if (character.spells && character.spells.length > 0) {
        const spellsList = document.getElementById('spellsSummary');
        if (spellsList) {
            spellsList.innerHTML = '<h3>Spells</h3>' + 
                character.spells.map(spell => `<div>${spell}</div>`).join('');
            spellsList.style.display = 'block';
        }
    }
}

// Add a function to handle spell selection/preparation
function toggleSpellPrepared(spellName) {
    spellManager.toggleSpellPrepared(spellName);
    updateCharacterSummary();
}

function updateDisplay() {
    abilities.forEach(ability => {
        const score = scores[ability];
        const modifier = Math.floor((score - 10) / 2);
        const modifierString = modifier >= 0 ? `+${ modifier}` : `${modifier}`;
        
        // Update ability selection area
        document.getElementById(`${ ability}Score`).textContent = score;
        document.getElementById(`${ ability}Mod`).textContent = modifierString;
    });
    
    document.getElementById('pointsRemaining').textContent = 27 - pointsSpent;
    
    // Update character object
    character.abilities = {  ...scores};
    updateCharacterSummary();

    if (character.class && ['Wizard', 'Cleric', 'Druid'].includes(character.class)) {
        spellManager.updateSpellsFromAbilityScores(character.abilities);
    }
    
    // Update AC
    updateAC();
}

function getPointCost(score) {
    if (score < 13) return 1;
    if (score < 15) return 2;
    return 3;
}

function changeScore(ability, change) {
    const currentScore = scores[ability];
    const newScore = currentScore + change;
    
    if (newScore < 8 || newScore > 15) return;
    
    const currentCost = getPointCost(currentScore);
    const newCost = getPointCost(newScore);
    const pointChange = change > 0 ? newCost : -currentCost;
    
    if (pointsSpent + pointChange > 27) return;
    
    scores[ability] = newScore;
    pointsSpent += pointChange;
    
    updateDisplay();
}

function updateAC() {
    const dexScore = scores['dex'];
    const dexModifier = Math.floor((dexScore - 10) / 2);
    
    // Base AC calculation (10 + DEX modifier)
    let baseAC = 10 + dexModifier;
    
    // Update the display
    document.getElementById('baseAC').textContent = baseAC;
    document.getElementById('ACSummary').style.display = 'block';
}

function resetScores() {
    abilities.forEach(ability => {
        scores[ability] = 8;
    });
    pointsSpent = 0;
    updateDisplay();
}
