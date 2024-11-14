// data.js
const subspeciesData = {
  'High Elf': {  description: "As a high elf, you have a keen mind and mastery of at least basic magical theory. Many of the most powerful mages in history have been high elves.", numFeatures: 4 },
  'Wood Elf': {  description: "As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly and stealthily through your native forests.", numFeatures: 3 },
  'Hill Dwarf': {  description: "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience. You're also more robust than other dwarves, with extra vitality.", numFeatures: 2 },
  'Mountain Dwarf': {  description: "As a mountain dwarf, you're strong and hardy, accustomed to a difficult life in rugged terrain, and you're naturally skilled with various forms of armor.", numFeatures: 2 },
  'Duergar': {  description: "Born of deep subterranean realms, duergar are gray-skinned dwarves who possess potent psionic powers and a strong resistance to magic.", numFeatures: 3 },
  'Lightfoot Halfling': {  description: "As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You're inclined to be affable and get along well with others.", numFeatures: 2 },
  'Stout Halfling': {  description: "As a stout halfling, you're hardier than average and have some resistance to poison. Some say that stouts have dwarven blood.", numFeatures: 2 },
  'Forest Gnome': {  description: "As a forest gnome, you have a natural knack for illusion and inherent quickness and stealth. You possess an innate ability to communicate with small animals.", numFeatures: 3 },
  'Rock Gnome': {  description: "As a rock gnome, you have a natural inventiveness and hardiness beyond that of other gnomes. You're skilled with artisan's tools and have expertise with magical devices.", numFeatures: 3 },
  'Deep Gnome': {  description: "Also known as svirfneblin, deep gnomes are exceptional survivors, blessed with innate magical abilities and a natural knack for stealth and stonework.", numFeatures: 3 },
  'High Half-Elf': {  description: "Combining the best qualities of elves and humans, half-elves are natural leaders and negotiators, with the magical affinity of high elves.", numFeatures: 4 },
  'Wood Half-Elf': {  description: "Combining the best qualities of elves and humans, these half-elves inherit the woodland traits of their wood elf parents.", numFeatures: 2 },
  'Drow Half-Elf': {  description: "Combining the best qualities of drow and humans, these half-elves inherit some of the magical abilities and darkvision of their drow parents.", numFeatures: 3 },
  'Asmodeus Tiefling': {  description: "Bearing the infernal legacy of Asmodeus, these tieflings command fire and darkness, with an innate talent for the arcane.", numFeatures: 3 },
  'Mephistopheles Tiefling': {  description: "Descendants of Mephistopheles, these tieflings possess powerful magical abilities focused on cold and deception.", numFeatures: 3 },
  'Zariel Tiefling': {  description: "Bearing the celestial-turned-fiend Zariel's legacy, these tieflings possess enhanced combat abilities and command divine power.", numFeatures: 3 },
  'Gold Draconic': {  description: "Gold dragonborn command fire breath and embody the ideals of justice, wisdom, and protection.", numFeatures: 2 },
  'Black Draconic': {  description: "Black dragonborn possess acid breath and often reflect their draconic ancestor's cunning nature.", numFeatures: 2 },
  'Blue Draconic': {  description: "Blue dragonborn wield lightning breath and tend to be proud and vainglorious.", numFeatures: 2 },
  'Brass Draconic': {  description: "Brass dragonborn possess fire breath and are often talkative and engaging.", numFeatures: 2 },
  'Bronze Draconic': {  description: "Bronze dragonborn command lightning breath and tend to be warriors and strategists.", numFeatures: 2 },
  'Copper Draconic': {  description: "Copper dragonborn possess acid breath and often share their draconic ancestor's wit and humor.", numFeatures: 2 },
  'Green Draconic': {  description: "Green dragonborn command poison breath and often possess cunning intellects.", numFeatures: 2 },
  'Red Draconic': {  description: "Red dragonborn possess fire breath and often share their ancestor's fiery nature.", numFeatures: 2 },
  'Silver Draconic': {  description: "Silver dragonborn command cold breath and tend to be noble and dedicated to justice.", numFeatures: 2 },
  'White Draconic': {  description: "White dragonborn possess cold breath and often reflect their ancestor's savage nature.", numFeatures: 2 },
  'Drow': {  description: "Descended from an earlier subterranean dark-skinned race of elves, drow retain their unearthly grace and are gifted with innate magic and superior darkvision.", numFeatures: 4 },
  'Human': {  description: "Humans are the most adaptable and ambitious people among the common races. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.", numFeatures: 2 },
  'Githyanki': {  description: "Psionic warriors from the Astral Plane, githyanki are renowned for their martial prowess and their innate psychic abilities, forged through eons of conflict.", numFeatures: 3 },
  'Half-Orc': {  description: "Half-orcs combine the physical power of their orc ancestry with the ambition of their human blood. They are natural-born leaders, fierce warriors, and survivalists.", numFeatures: 3 }
};

const classData = {
  'Barbarian': {  description: 'A fierce warrior of primitive background who can enter a battle rage', numFeatures: 2 },
  'Bard': {  description: 'An inspiring magician whose power echoes the music of creation', numFeatures: 3 },
  'Cleric': {  description: 'A priestly champion who wields divine magic in service of a higher power', numFeatures: 3 },
  'Druid': {  description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms', numFeatures: 2 },
  'Fighter': {  description: 'A master of martial combat, skilled with a variety of weapons and armor', numFeatures: 3 },
  'Monk': {  description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection', numFeatures: 3 },
  'Paladin': {  description: 'A holy warrior bound to a sacred oath', numFeatures: 2 },
  'Ranger': {  description: 'A warrior who combats threats on the edges of civilization', numFeatures: 3 },
  'Rogue': {  description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies', numFeatures: 3 },
  'Sorcerer': {  description: 'A spellcaster who draws on inherent magic from a gift or bloodline', numFeatures: 2 },
  'Warlock': {  description: 'A wielder of magic that is derived from a bargain with an extraplanar entity', numFeatures: 2 },
  'Wizard': {  description: 'A scholarly magic-user capable of manipulating the structures of reality', numFeatures: 2 }
};