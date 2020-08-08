// @to-do
//		Transform into class to use backpack btns

// Get DOM elements
const form = document.getElementById('character-form');
const heroForm = document.getElementById('hero-form');
const objectForm = document.getElementById('object-form');
const card = document.getElementById('character-card');
const create = document.getElementById('play-btn');

// Card Elements
const avatar = document.getElementById('avatar');
const heroName = document.getElementById('card-name');
const heroBio = document.getElementById('card-bio');
const skillsList = document.getElementById('skills');
const lifeCount = document.getElementById('life-count');
const addLife = document.getElementById('add-life');
const delLife = document.getElementById('del-life');
const manaCount = document.getElementById('mana-count');
const addMana = document.getElementById('add-mana');
const delMana = document.getElementById('del-mana');
const strengthCount = document.getElementById('strength-count');
const luckCount = document.getElementById('luck-count');
const addItemBtn = document.getElementById('add-btn');
const backpackList = document.getElementById('backpack');

// Character Objects
let character = {
	img: '',
	name: '',
	class: '',
	race: '',
	home: '',
	skills: [],
	stats: { life: 100, mana: 0, strength: 0, luck: 0 },
	backpack: [
		{ name: 'Agua', qty: 5 },
		{ name: 'Pan', qty: 5 },
		{ name: 'Venda', qty: 2 },
		{ name: 'Antorcha', qty: 1 },
		{ name: 'Encendedor', qty: 3 }
	]
};

// Skills by class
const palaSkills = [ '⚔️ Golpe Mortal', '🛡️ Escudo Helado', '➰ Onda Expansiva', '🎲 Segundo Intento' ];
const rangerSkills = [ '🏹 Disparo Arcano', '🎯 Disparo Letal', '💥 Flecha Infernal', '⏳ Parar Tiempo' ];
const witcherSkills = [ '🔮 Visión Espectral', '🐆 Transmutación', '🌀 Tormenta Elfíca', '📜 Leer Runas' ];
const rogueSkills = [ '🗡️ Puñalada Sigilosa', '🎭 Disfrazarse', '💣 Bomba de humo', '🗝️ Abrir Cerradura' ];

const classSkills = (classType) => {
	switch (classType) {
		case 'Paladín':
			return (character.skills = palaSkills);
			break;
		case 'Nigromante':
			return (character.skills = witcherSkills);
			break;
		case 'Perillán':
			return (character.skills = rogueSkills);
			break;
		case 'Tirador':
			return (character.skills = rangerSkills);
		default:
			return (character.skills = []);
			break;
	}
};

// Items by class
const classItems = (classType) => {
	switch (classType) {
		case 'Paladín':
			return [ ...character.backpack, { name: 'Espada', qty: 1 }, { name: 'Escudo', qty: 1 } ];
			break;
		case 'Nigromante':
			return [ ...character.backpack, { name: 'Bastón', qty: 1 }, { name: 'Orbe', qty: 1 } ];
			break;
		case 'Perillán':
			return [ ...character.backpack, { name: 'Daga', qty: 1 }, { name: 'Máscara', qty: 1 } ];
			break;
		case 'Tirador':
			return [ ...character.backpack, { name: 'Arco', qty: 1 }, { name: 'Flechas', qty: 15 } ];
		default:
			'';
			break;
	}
};

// Items by Race
const raceItems = (raceKind) => {
	switch (raceKind) {
		case 'Humano':
		case 'Humana':
			return [ ...character.backpack, { name: 'Caña de Pescar', qty: 1 }, { name: 'Cebo brillante', qty: 4 } ];
			break;
		case 'Elfo':
		case 'Elfa':
			return [ ...character.backpack, { name: 'Suero de Fallwen', qty: 4 }, { name: 'Cofre Eremita', qty: 1 } ];
			break;
		case 'Enano':
		case 'Enana':
			return [ ...character.backpack, { name: 'Pata de Jabalí', qty: 3 }, { name: 'Hacha Lumpestre', qty: 1 } ];
			break;
		default:
			'';
			break;
	}
};
// Stats by race
const raceStats = (raceKind) => {
	switch (raceKind) {
		case 'Humano':
			return { life: 75, luck: 4, mana: 30, strength: 50 };
			break;
		case 'Humana':
			return { life: 75, luck: 5, mana: 30, strength: 40 };
			break;
		case 'Elfo':
			return { life: 100, luck: 0, mana: 75, strength: 30 };
			break;
		case 'Elfa':
			return { life: 90, luck: 0, mana: 80, strength: 30 };
			break;
		case 'Enano':
			return { life: 80, luck: 6, mana: 20, strength: 80 };
			break;
		case 'Enana':
			return { life: 85, luck: 6, mana: 25, strength: 70 };
			break;

		default:
			return { ...stats };
			break;
	}
};

// Hero Avatar
const raceAvatar = (raceKind) => {
	switch (raceKind) {
		case 'Humano':
			return 'humanmale.png';
			break;
		case 'Humana':
			return 'humanfemale.png';
			break;
		case 'Elfo':
			return 'elfmale.png';
			break;
		case 'Elfa':
			return 'elffemale.png';
			break;
		case 'Enano':
			return 'dwarfmale.png';
			break;
		case 'Enana':
			return 'dwarffemale.png';
			break;

		default:
			return { ...character };
			break;
	}
};
heroForm.onsubmit = (e) => {
	e.preventDefault();
	// Form Values
	const formName = heroForm.elements['name'].value;
	const formClass = heroForm.elements['class'].value;
	const formRace = heroForm.elements['race'].value;
	const formHome = heroForm.elements['home'].value;
	character = {
		img: raceAvatar(formRace),
		name: formName,
		class: formClass,
		race: formRace,
		home: formHome,
		skills: classSkills(formClass),
		stats: raceStats(formRace),
		backpack: classItems(formClass)
	};
	character.backpack = raceItems(formRace);
	// Render Player Info
	heroName.innerText = character.name;
	heroBio.innerText = `${character.class} ${character.race} de ${character.home}`;
	lifeCount.innerText = character.stats.life;
	manaCount.innerText = character.stats.mana;
	strengthCount.innerText = character.stats.strength;
	luckCount.innerText = character.stats.luck;
	avatar.setAttribute('src', `./img/${character.img}`);

	// Build player Skills
	character.skills.map((skill) => {
		skillsList.innerHTML += `<li class="list-group-item">${skill}</li>`;
	});

	// Render Player backpack

	character.backpack.map((item) => {
		backpackList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${item.name} - ${item.qty}
    <div>
    <button type="button" class="btn btn-success btn-sm" id='add-btn'><i class="fas fa-plus-circle"></i></button>
    <button type="button" class="btn btn-warning btn-sm" id='del-btn'><i class="fas fa-minus-circle"></i></button>
    <button type="button" class="btn btn-danger btn-sm" id='rmv-btn'><i class="fas fa-trash"></i></button>
    </div>
    </li>`;
	});

	// Disable Create Btn
	create.classList.add('disabled');
	create.setAttribute('disabled', true);
	form.classList.add('invisible');
	card.classList.remove('invisible');
};

// Add item to Hero
objectForm.onsubmit = (e) => {
	e.preventDefault();
	const objectToAdd = objectForm.elements['add-object'].value;
	character.backpack.push({ name: objectToAdd, qty: 1 });
	backpackList.innerHTML = '';
	// Render Player backpack
	character.backpack.map((item) => {
		backpackList.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${item.name} - ${item.qty}
    <div>
    <button type="button" class="btn btn-success btn-sm" id='add-btn'><i class="fas fa-plus-circle"></i></button>
    <button type="button" class="btn btn-warning btn-sm" id='del-btn'><i class="fas fa-minus-circle"></i></button>
    <button type="button" class="btn btn-danger btn-sm" id='rmv-btn'><i class="fas fa-trash"></i></button>
    </div>
    </li>`;
	});
};

// Stats Buttons
addLife.onclick = () => {
	character.stats.life += 10;
	lifeCount.innerText = character.stats.life;
	if (character.stats.life <= 0) {
		lifeCount.innerText = 'MUERTO';
		character.stats.life = 0;
	} else if (character.stats.life > 100) {
		lifeCount.innerText = 'MÁX';
		character.stats.life = 100;
	}
};

delLife.onclick = () => {
	character.stats.life -= 10;
	lifeCount.innerText = character.stats.life;
	if (character.stats.life <= 0) {
		lifeCount.innerText = 'MUERTO';
		character.stats.life = 0;
	} else if (character.stats.life > 100) {
		lifeCount.innerText = 'MÁX';
		character.stats.life = 100;
	}
};

addMana.onclick = () => {
	character.stats.mana += 5;
	manaCount.innerText = character.stats.mana;
	if (character.stats.mana <= 0) {
		manaCount.innerText = 'SIN MANÁ';
		character.stats.mana = 0;
	} else if (character.stats.mana > 100) {
		manaCount.innerText = 'MÁX';
		character.stats.mana = 100;
	}
};

delMana.onclick = () => {
	character.stats.mana -= 5;
	manaCount.innerText = character.stats.mana;
	if (character.stats.mana <= 0) {
		manaCount.innerText = 'SIN MANÁ';
		character.stats.mana = 0;
	} else if (character.stats.mana > 100) {
		manaCount.innerText = 'MÁX';
		character.stats.mana = 100;
	}
};

// Player backpack buttons
const addBtn = document.getElementById('add-btn');
const delBtn = document.getElementById('del-btn');
const rmvBtn = document.getElementById('rmv-btn');
