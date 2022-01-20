import { Given as Dado, When as Quando, Then as Então } from "cypress-cucumber-preprocessor/steps"

import signupPage from "../pageObjects/signup"
import successModal from "../pageObjects/successModal"
import signupFactory from '../../factories/SignupFactory'


Dado('acessar a página de cadastro do Buger Eats', () => {
  signupPage.go();
});

Quando('clicar no botão de voltar para a home do Buger Eats', () => {
  signupPage.returnHome();
});

Quando('preencher o formulário com dados de entregador do tipo {string}', (type) => {
  let deliverData = signupFactory.deliver();
  if (type === 'cpf_inv') {
    deliverData.cpf = '000000000aa'
  }
  signupPage.fillForm(deliverData)
});

Quando('selecionar o método de entrega {string}', (type) => {
  let deliveryMethods = signupFactory.deliveryMethod(type)
  signupPage.selectDeliveryMethod(deliveryMethods)
});

Quando('realizar o upload da imagem da CNH', () => {
  signupPage.uploadLicense('cnh-digital.jpg');
});

Quando('realizar o envio do formulário de cadastro', () => {
  signupPage.submit();
});

Então('validar o redirecionamento para o formulário de cadastro do Buger Eats', () => {
  signupPage.validate();
});

Então('validar que o cadastro foi realizado com sucesso', () => {
  successModal.validateModalContent();
});

Então('validar que é exibida uma mensagem inline para cpf inválido', () => {
  const expectedValues = ['Oops! CPF inválido'];
  signupPage.alertMessagesShouldContain(expectedValues);
})

Então('validar que são exibidas mensagens inline de erro para os campos obrigatórios', () => {
  const expectedValues = [
    'É necessário informar o nome',
    'É necessário informar o CPF',
    'É necessário informar o email',
    'É necessário informar o CEP',
    'É necessário informar o número do endereço',
    'Selecione o método de entrega',
    'Adicione uma foto da sua CNH'
  ];
  signupPage.alertMessagesShouldContain(expectedValues);
})

Então('validar que é exibida uma mensagem inline de erro para múltiplas modalidades', () => {
  const expectedValues = ['Oops! Selecione apenas um método de entrega'];
  signupPage.alertMessagesShouldContain(expectedValues);
})