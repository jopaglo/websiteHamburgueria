let cart = [];
let quantityItensInModal;
let keyItemModal;

// pegar os itens do array e preparar o modal
burguerJson.map((item, index) => {

    //criar um clone da div para adicionar na área de produtos
    let itemBurguer = document.querySelector('.models .products-area-item').cloneNode(true);

    //preciso setar a key
    itemBurguer.setAttribute('data-key', index); //para eu usar no modal como chave primaria
    itemBurguer.querySelector('.products-area-item-name').innerHTML = item.name;
    itemBurguer.querySelector('.products-area-item-description').innerHTML = item.description;
    itemBurguer.querySelector('.products-area-item-image img').src = item.image;
    itemBurguer.querySelector('.products-area-item-price').innerHTML = 'R$ ' + item.price.toFixed(2);


    //abertura do modal
    itemBurguer.querySelector('a').addEventListener('click', (event) => {

        /* PRECISO FAZER 3 COISAS ANTES DE ABRIR O MODAL
        1-nao atualizar a pagina
        2-ter um numero de chave pra carregar o item lá dentro(funcao closest que pega o item proximo)
        3-inserir uma quantidade no carrinho
        */

        event.preventDefault();

        let key = event.target.closest('.products-area-item').getAttribute('data-key');
        keyItemModal = key;

        quantityItensInModal = 1;

        // animacao modal com opacity - eu coloco um timer pra gerar efeito
        document.querySelector('.modal').style.opacity = '0';


        document.querySelector('.modal').style.display = 'flex';

        setTimeout(() => {
            document.querySelector('.modal').style.opacity = '1';
        }, 50);



        //setar as informações no modal
        document.querySelector('.modal-area-image img').src = burguerJson[keyItemModal].image;
        document.querySelector('.modal-area-info-title').innerHTML = burguerJson[keyItemModal].name;
        document.querySelector('.modal-area-info-description').innerHTML = burguerJson[keyItemModal].description;
        document.querySelector('.modal-area-info-quantity-item').innerHTML = quantityItensInModal;
        document.querySelector('.modal-area-info-price').innerHTML = 'R$ ' + burguerJson[keyItemModal].price;
    });



    document.querySelector('.products-area').append(itemBurguer);

});


function closeModal() {
    document.querySelector('.modal').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.modal').style.display = 'none';
    }, 300);
}

document.querySelectorAll('.modal-close , .modal-area-info-action-cancel').forEach((item) => {
    item.addEventListener('click', closeModal);
});

document.querySelector('.modal-area-info-quantity-decrement').addEventListener('click', () => {
    if (quantityItensInModal > 1) {
        quantityItensInModal = quantityItensInModal - 1;
    }
    document.querySelector('.modal-area-info-quantity-item').innerHTML = quantityItensInModal;
});

document.querySelector('.modal-area-info-quantity-increment').addEventListener('click', () => {
    quantityItensInModal = quantityItensInModal + 1;
    document.querySelector('.modal-area-info-quantity-item').innerHTML = quantityItensInModal;
});


//adicionar item no carrinho
document.querySelector('.modal-area-info-action-addCart').addEventListener('click', () => {

    //primeiro ponto eu crio um ID pra nao adicionar duplicado
    let identifier = burguerJson[keyItemModal].id + '@#$' + keyItemModal;

    //eu avalio se esse ID já existe no meu array ou nao antes de incluir
    let ifIndexExists = cart.findIndex((item) => item.identifier == identifier);

    if (ifIndexExists > -1) {
        cart[ifIndexExists].quantityItem = cart[ifIndexExists].quantityItem + quantityItensInModal;
    } else {
        cart.push({
            identifier: identifier,
            idItem: burguerJson[keyItemModal].id,
            quantityItem: quantityItensInModal
        });
    }
    updateCart();
    closeModal();
})

function updateCart(){
    //habilito o carrinho e faço ações somente se houver itens dentro dele
    if (cart.length > 0) {
        //eu habilito o carrinho na tela
        document.querySelector('.cart-area').style.flex = 1;

        //eu apago todos os itens que estao dentro da área do carrinho;
        document.querySelector('.cart-area-items').innerHTML = '';

        let subtotal = 0;
        let desconto = 0.1;
        let total = 0;

        for (let i in cart) {
            let item = burguerJson.find((item) => item.id == cart[i].idItem);
            let valueSalesOfItem = item.price * cart[i].quantityItem;
            subtotal = subtotal + valueSalesOfItem;

            //vou clonar a estrutura para jogar os itens la dentro do cart
            let modelBuild = document.querySelector('.models .cart-area-item').cloneNode(true);

            modelBuild.querySelector('.cart-area-item-top-img img').src = item.image;
            modelBuild.querySelector('.cart-area-item-top-title').innerHTML = item.name;
            modelBuild.querySelector('.cart-area-item-top-price').innerHTML = item.price;
            modelBuild.querySelector('.cart-area-item-bottom-quantity').innerHTML = cart[i].quantityItem;

            //acao nos botoes de adicionar e de excluir o item
            modelBuild.querySelector('.cart-area-item-bottom-decrement').addEventListener('click', () => {
                if (cart[i].quantityItem > 1) {
                    cart[i].quantityItem = cart[i].quantityItem - 1;
                }
                updateCart();
            });

            modelBuild.querySelector('.cart-area-item-bottom-increment').addEventListener('click', () => {
                cart[i].quantityItem = cart[i].quantityItem + 1;
                updateCart();
            });

            modelBuild.querySelector('.cart-area-item-bottom-delete').addEventListener('click', () => {
                cart.splice(i, 1);
                updateCart();
            });

            document.querySelector('.cart-area-items').append(modelBuild);
        }

        desconto = subtotal * desconto;
        total = subtotal - desconto;

        document.querySelector('.cart-area-invoice-subtotal').innerHTML = 'Subtotal: R$ ' + subtotal.toFixed(2);
        document.querySelector('.cart-area-invoice-discount').innerHTML = 'Desconto: R$ ' + desconto.toFixed(2);
        document.querySelector('.cart-area-invoice-total').innerHTML = 'Total: R$ ' + total.toFixed(2);
    } else {
        document.querySelector('.cart-area').style.flex = 0;
    }
}
