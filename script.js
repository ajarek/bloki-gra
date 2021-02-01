const grid = document.querySelector('.grid')
const wynik = document.querySelector('.wynik')
let punkty = 0

let pozPaletkaY = 10
let pozPaletkaX = 310
let pozPilkaY = 30
let pozPilkaX = 385
let zmianaX = 2
let zmianaY = 2
const szerBlok = 180
const wysBlok = 20
const srednicaPilki = 30

class Block {
    constructor(pozBlokX, pozBlokY) {
        this.bottomLeft = [pozBlokX, pozBlokY]
        this.bottomRight = [pozBlokX + szerBlok, pozBlokY]
        this.topLeft = [pozBlokX, pozBlokY + wysBlok]
        this.topRight = [pozBlokX + szerBlok, pozBlokY + wysBlok]
    }
}
const pozBloki = [
    new Block(24, 580),
    new Block(214, 580),
    new Block(404, 580),
    new Block(594, 580),
    new Block(24, 550),
    new Block(214, 550),
    new Block(404, 550),
    new Block(594, 550),
    new Block(24, 520),
    new Block(214, 520),
    new Block(404, 520),
    new Block(594, 520),
]

//wyswietla bloki
const dodajBloki = () => {
    for (var i = 0; i < 12; i++) {
        const blok = document.createElement('div');

        blok.classList.add('blok')

        grid.appendChild(blok);
    }
}
dodajBloki()

//paletka
const ustawPaletke = () => {
    paletka.style.left = pozPaletkaX + 'px'
    paletka.style.bottom = pozPaletkaY + 'px'
}
const paletka = document.createElement('div')
paletka.classList.add('paletka')
ustawPaletke()
grid.appendChild(paletka);

//przesuw paletki
const przesunPaletke = (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            if (pozPaletkaX > 0) {
                pozPaletkaX -= 10
                paletka.style.left = pozPaletkaX + 'px'
                ustawPaletke()
                break;
            }
            case 'ArrowRight':
                if (pozPaletkaX < 620) {
                    pozPaletkaX += 10
                    paletka.style.left = pozPaletkaX + 'px'
                    ustawPaletke()
                    break;
                }
    }
}
document.addEventListener('keydown', przesunPaletke)

//pilka
const ustawPilke = () => {
    pilka.style.left = pozPilkaX + 'px'
    pilka.style.bottom = pozPilkaY + 'px'
}
const pilka = document.createElement('div')
pilka.classList.add('pilka')
ustawPilke()
grid.appendChild(pilka);
const ruchPilki = () => {
    pozPilkaX += zmianaX;
    pozPilkaY += zmianaY;
    ustawPilke()
    zderzenie()
}
czas1 = setInterval(ruchPilki, 10)

//zmiana kirunku pilki
const zmienKierunek = () => {
    if (zmianaX === 2 && zmianaY === 2) {
        zmianaY = -2
        return
    }
    if (zmianaX === 2 && zmianaY === -2) {
        zmianaX = -2
        return
    }
    if (zmianaX === -2 && zmianaY === -2) {
        zmianaY = 2
        return
    }
    if (zmianaX === -2 && zmianaY === 2) {
        zmianaX = 2
        return
    }
}

//zderzenia ze ścianami
const zderzenie = () => {
    if (pozPilkaX >= 770 || pozPilkaY >= 570 || pozPilkaX < 0) {
        zmienKierunek()
    }

    //zderzenie z blokiem
    for (i = 0; i < pozBloki.length; i++) {

        if (pozPilkaX > pozBloki[i].bottomLeft[0] && pozPilkaX < pozBloki[i].bottomRight[0] && (pozPilkaY + srednicaPilki) > pozBloki[i].bottomLeft[1] && pozPilkaY < pozBloki[i].topLeft[1]) {
            const wszystkieBloki = Array.from(document.querySelectorAll('.blok'))

            wszystkieBloki[i].classList.remove('blok');
            pozBloki.splice(i, 1)
            zmienKierunek()
            punkty++
            wynik.innerHTML = punkty
        }
    }

    //odbicie paletki
    if (
        (pozPilkaX > pozPaletkaX && pozPilkaX < (pozPaletkaX + szerBlok)) &&
        (pozPilkaY > pozPaletkaY) && pozPilkaY < (pozPaletkaY + wysBlok)) {
        zmienKierunek()
    }

    //koniec gry
    if (pozPilkaY <= 0) {
        clearInterval(czas1)
        wynik.innerHTML = 'Przegrałeś! Twój wynik to : ' + punkty
        document.removeEventListener('keydown', przesunPaletke)
    }

    //wygrana
    if (pozBloki.length === 0) {
        wynik.innerHTML = 'Brawo Wygrałeś 🏆'
        wynik.style.color = '#0f9d58'
        clearInterval(czas1)
        document.removeEventListener('keydown', przesunPaletke)
    }
}
