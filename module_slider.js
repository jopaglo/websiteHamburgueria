let arrayBanners = [];
let numberBanners = 5;
let areaBanner; 
let firstImage;
let lastImage;
let changeOfTime;
let changeOfTimeInterval = 200;


// criar um elemento imagem com as propriedades e armazenar em array
function preLoadBanners(){
    for (let i = 0 ; i < numberBanners ; i = i + 1){
        let newImage = document.createElement('img');
        newImage.src = 'carousel/banner' + (i + 1) + '.jpg';
        newImage.width = 1280;
        newImage.height = 400;
        newImage.alt = 'Photo Carousel';
        arrayBanners[i] = newImage;
    }
}

function insertBannerInArea(imageIndex){
    areaBanner.style.backgroundImage = 'url(' +  arrayBanners[imageIndex].src + ')';
}

function changePhoto(direction){
    //quando alguem clicar eu zero o tempo de troca
    changeOfTime = 0;
    firstImage = firstImage + direction; // 1 ou -1

    /*************** REGRA DA DIRECAO ************/
    if(firstImage > lastImage){
        firstImage = 0; // se ela for maior que a quantidade maxima do meu array eu zero
    } else if (firstImage < 0){
        firstImage = lastImage; // se for menor ela recebe o valor máximo
    }
    insertBannerInArea(firstImage);
}

function animationSlider(){
    //ele que vai controlar o processo de transicao
    changeOfTime = changeOfTime + 1;

    if(changeOfTime >= changeOfTimeInterval){
        changeOfTime = 0;
        changePhoto(1); //adiciono um slide
    }
    window.requestAnimationFrame(animationSlider);
}

function startBanners(){
    //carrego as imagens
    preLoadBanners();

    //preciso saber a quantidade de imagens que consta no array
    firstImage = 0;
    lastImage = arrayBanners.length - 1;

    //preciso carregar a área que será trabalhada
    areaBanner = document.querySelector('.banner');

    //setar o indice da imagem no bacground da área
    insertBannerInArea(firstImage);

    changeOfTime = 0;

    //executo a animacao com intervalo de troca
    animationSlider();
      
}

//carrega o slider ao começar a pagina
window.addEventListener('load' , startBanners)
