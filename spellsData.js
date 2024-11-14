const racialSpells = {
    'High Elf': {
        innateSpells: ['Dancing Lights'],
        spellProgression: [1]
    },
    'Drow': {
        innateSpells: ['Dancing Lights', 'Faerie Fire', 'Darkness'],
        spellProgression: [1, 3, 5]
    },
    'Tiefling': {
        innateSpells: ['Thaumaturgy', 'Hellish Rebuke', 'Darkness'],
        spellProgression: [1, 3, 5]
    },
    'Deep Gnome': {
        innateSpells: ['Nondetection'],
        spellProgression: [1]
    },
    'Githyanki': {
        innateSpells: ['Mage Hand', 'Jump', 'Misty Step'],
        spellProgression: [1, 3, 5]
    }
};

const classSpellLists = {
    'Wizard': {
        cantripsKnown: 3,
        spellsKnown: 'all',
        preparedSpells: 'int',
        spellList: [
            // Cantrips
            'Acid Splash', 'Dancing Lights', 'Fire Bolt', 'Light', 'Mage Hand', 
            'Minor Illusion', 'Poison Spray', 'Ray of Frost', 'Shocking Grasp',
            // Level 1
            'Burning Hands', 'Chromatic Orb', 'Color Spray', 'Disguise Self', 
            'False Life', 'Feather Fall', 'Find Familiar', 'Grease', 'Ice Knife',
            'Jump', 'Longstrider', 'Mage Armor', 'Magic Missile', 'Protection from Evil and Good',
            'Shield', 'Sleep', 'Tasha\'s Hideous Laughter', 'Thunderwave', 'Witch Bolt'
        ]
    },
    'Sorcerer': {
        cantripsKnown: 4,
        spellsKnown: 2,
        preparedSpells: 'fixed',
        spellList: [
            // Cantrips
            'Acid Splash', 'Dancing Lights', 'Fire Bolt', 'Light', 'Mage Hand',
            'Minor Illusion', 'Poison Spray', 'Ray of Frost', 'Shocking Grasp',
            // Level 1
            'Burning Hands', 'Chromatic Orb', 'Color Spray', 'Disguise Self',
            'False Life', 'Feather Fall', 'Mage Armor', 'Magic Missile',
            'Shield', 'Sleep', 'Thunderwave'
        ]
    },
    'Warlock': {
        cantripsKnown: 2,
        spellsKnown: 2,
        preparedSpells: 'fixed',
        spellList: [
            // Cantrips
            'Chill Touch', 'Eldritch Blast', 'Mage Hand', 'Minor Illusion', 'Poison Spray',
            // Level 1
            'Arms of Hadar', 'Charm Person', 'Hex', 'Protection from Evil and Good',
            'Witch Bolt'
        ]
    },
    'Cleric': {
        cantripsKnown: 3,
        spellsKnown: 'all',
        preparedSpells: 'wis',
        spellList: [
            // Cantrips
            'Guidance', 'Light', 'Resistance', 'Sacred Flame', 'Spare the Dying', 'Thaumaturgy',
            // Level 1
            'Bless', 'Command', 'Create or Destroy Water', 'Cure Wounds', 'Detect Evil and Good',
            'Detect Magic', 'Detect Poison and Disease', 'Guiding Bolt', 'Healing Word',
            'Inflict Wounds', 'Protection from Evil and Good', 'Purify Food and Drink',
            'Sanctuary', 'Shield of Faith'
        ]
    },
    'Druid': {
        cantripsKnown: 2,
        spellsKnown: 'all',
        preparedSpells: 'wis',
        spellList: [
            // Cantrips
            'Guidance', 'Poison Spray', 'Produce Flame', 'Resistance', 'Shillelagh',
            // Level 1
            'Animal Friendship', 'Cure Wounds', 'Detect Magic', 'Detect Poison and Disease',
            'Entangle', 'Faerie Fire', 'Fog Cloud', 'Goodberry', 'Healing Word',
            'Jump', 'Longstrider', 'Speak with Animals', 'Thunderwave'
        ]
    },
    'Bard': {
        cantripsKnown: 2,
        spellsKnown: 4,
        preparedSpells: 'fixed',
        spellList: [
            // Cantrips
            'Dancing Lights', 'Light', 'Mage Hand', 'Minor Illusion', 'True Strike', 'Vicious Mockery',
            // Level 1
            'Animal Friendship', 'Bane', 'Charm Person', 'Cure Wounds', 'Detect Magic',
            'Disguise Self', 'Dissonant Whispers', 'Faerie Fire', 'Healing Word',
            'Heroism', 'Identify', 'Sleep', 'Speak with Animals', 'Tasha\'s Hideous Laughter',
            'Thunderwave'
        ]
    },
    'Ranger': {
        cantripsKnown: 0,
        spellsKnown: 2,
        preparedSpells: 'fixed',
        spellList: [
            // Level 1 (Rangers start getting spells at level 2)
            'Animal Friendship', 'Cure Wounds', 'Detect Magic', 'Detect Poison and Disease',
            'Fog Cloud', 'Goodberry', 'Hunter\'s Mark', 'Jump', 'Longstrider',
            'Speak with Animals'
        ]
    },
    'Paladin': {
        cantripsKnown: 0,
        spellsKnown: 'all',
        preparedSpells: 'cha',
        spellList: [
            // Level 1 (Paladins start getting spells at level 2)
            'Bless', 'Command', 'Cure Wounds', 'Detect Evil and Good', 'Detect Magic',
            'Detect Poison and Disease', 'Divine Favor', 'Heroism', 'Protection from Evil and Good',
            'Shield of Faith'
        ]
    }
};