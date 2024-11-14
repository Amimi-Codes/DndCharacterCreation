class SpellManager {
    constructor() {
        this.character = {
            class: '',
            species: '',
            level: 1,
            racialSpells: [],
            classSpells: [],
            spellsPrepared: []
        };
    }

    initializeRacialSpells(race) {
        if (racialSpells[race]) {
            this.character.racialSpells = racialSpells[race].innateSpells || [];
            this.displaySpells();
        }
    }

    initializeClassSpells(characterClass) {
        this.character.class = characterClass;
        this.calculateSpellSlots();
        this.displaySpells();
    }

    calculateSpellSlots() {
        const classInfo = classSpellLists[this.character.class];
        if (!classInfo) return;

        this.cantripsKnown = classInfo.cantripsKnown;
        this.spellsKnown = classInfo.spellsKnown;
        
        if (classInfo.preparedSpells === 'int') {
            const intMod = Math.floor((character.abilities.int - 10) / 2);
            this.preparedSpells = Math.max(1, intMod + this.character.level);
        }
    }

    displaySpells() {
        const spellsContainer = document.getElementById('spellsContainer');
        if (!spellsContainer) return;
        
        spellsContainer.style.display = 'block';

        // Display racial spells
        const racialSpellsList = document.getElementById('racialSpellsList');
        if (racialSpellsList && this.character.racialSpells.length > 0) {
            racialSpellsList.innerHTML = '<h3>Racial Spells</h3>';
            this.character.racialSpells.forEach(spell => {
                racialSpellsList.innerHTML += `<div class="col-4 spell-item">${ spell}</div>`;
            });
        }

        // Display class spells if applicable
        if (this.character.class && classSpellLists[this.character.class]) {
            const classSpellsDiv = document.getElementById('classSpellsList');
            if (classSpellsDiv) {
                classSpellsDiv.innerHTML = `
                    <h3>Class Spells</h3>
                    <div>Cantrips Known: ${ this.cantripsKnown}</div>
                    <div>Spells Known: ${ this.spellsKnown === 'all' ? 'All' : this.spellsKnown}</div>
                    <div>Spells Prepared: ${ this.preparedSpells || 'N/A'}</div>
                `;
            }
        }
    }

    updateSpellsFromAbilityScores(abilities) {
        if (this.character.class && ['Wizard', 'Cleric', 'Druid'].includes(this.character.class)) {
            this.calculateSpellSlots();
            this.displaySpells();
        }
    }

    toggleSpellPrepared(spellName) {
        const index = this.character.spellsPrepared.indexOf(spellName);
        if (index === -1) {
            this.character.spellsPrepared.push(spellName);
        } else {
            this.character.spellsPrepared.splice(index, 1);
        }
        this.displaySpells();
    }
}