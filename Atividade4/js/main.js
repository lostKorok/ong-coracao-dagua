document.addEventListener('DOMContentLoaded', () => {

    const inputCPF = document.getElementById('cpf');
    const inputTelefone = document.getElementById('telefone');
    
    const formVoluntario = document.querySelector('.form-voluntario');
    const formDoacao = document.querySelector('.form-doacao');
    
    function formatCPF(value) {
        value = value.replace(/\D/g, ''); 
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        return value.substring(0, 14); 
    }

    function formatTelefone(value) {
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); 
        
        if (value.length > 15) { 
            value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
        } else if (value.length > 14) { 
            value = value.replace(/(\d{4})(\d{4})$/, '$1-$2');
        }
        
        return value.substring(0, 15);
    }

    if (inputCPF) {
        inputCPF.addEventListener('input', (e) => { e.target.value = formatCPF(e.target.value); });
    }
    if (inputTelefone) {
        inputTelefone.addEventListener('input', (e) => { e.target.value = formatTelefone(e.target.value); });
    }

    const modalCadastro = document.getElementById('modal-cadastro-sucesso');
    const fecharModalCadastro = document.querySelector('.fechar-modal-cadastro');

    if (formVoluntario && modalCadastro) {
        formVoluntario.addEventListener('submit', (event) => {
            if (formVoluntario.checkValidity()) {
                event.preventDefault(); 
                modalCadastro.style.display = 'flex'; 
            }
        });

        if (fecharModalCadastro) {
            fecharModalCadastro.addEventListener('click', () => { modalCadastro.style.display = 'none'; });
        }
        window.addEventListener('click', (event) => {
            if (event.target === modalCadastro) { modalCadastro.style.display = 'none'; }
        });
    }

    if (formDoacao) {

        const modalHTML = `
             <div id="modal-doacao" class="modal-sucesso" style="display: none;">
                <div class="modal-conteudo">
                    <span class="fechar-modal">&times;</span>
                    <h3 class="modal-titulo">Obrigado! Doação Registrada!</h3>
                    <p>Sua contribuição fará uma diferença imediata na vida marinha. Juntos, somos a Coração D'Água.</p>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modalDoacao = document.getElementById('modal-doacao');
        const fecharModalDoacao = document.querySelector('.fechar-modal');
        const valorPersonalizado = document.getElementById('valor_personalizado'); 

        formDoacao.addEventListener('submit', (event) => {
            
            if (valorPersonalizado && parseFloat(valorPersonalizado.value) < 10) {
                 event.preventDefault();
                 alert("O valor mínimo para doação é R$ 10,00.");
                 return;
            }

            if (formDoacao.checkValidity()) {
                event.preventDefault(); 
                modalDoacao.style.display = 'flex';
            }
        });

        if (fecharModalDoacao) {
            fecharModalDoacao.addEventListener('click', () => { modalDoacao.style.display = 'none'; });
        }
        window.addEventListener('click', (event) => {
            if (event.target === modalDoacao) { modalDoacao.style.display = 'none'; }
        });
    }
});