export const ptBr = {
  translations: {
    header: {
      navigation: {
        '/': 'Início',
        '/orders': 'Pedidos',
      },
    },
    accountMenu: {
      buttons: {
        profile: 'Perfil da loja',
        logout: 'Sair',
      },
    },
    storeProfileDialog: {
      dialog: {
        title: 'Perfil da loja',
        description:
          'Atualize as informações do seu estabelecimento visíveis ao seu cliente',
      },
      form: {
        inputs: {
          name: 'Nome',
          description: 'Descrição',
        },
        buttons: {
          confirm: 'Salvar',
          cancel: 'Cancelar',
        },
      },
      feedback: {
        toast: {
          success: 'Perfil atualizado com sucesso!',
          error: 'Falha ao atalizar perfil, tente novamente!',
        },
      },
    },
    layouts: {
      auth: {
        footer: 'Painel do parceiro © pizza.shop {{year}}',
      },
    },
    pages: {
      'sign-in': {
        heading: 'Acessar painel',
        description: 'Acompanhe suas vendas pelo painel do parceiro!',
        form: {
          input: 'Seu e-mail',
          button: 'Acessar painel',
        },
        'sign-up-link': 'Novo estabelecimento',
        feedback: {
          toast: {
            error: 'Não foi possível enviar o e-mail de autenticação.',
            success: 'Enviamos um link de autenticação para seu e-mail.',
          },
        },
      },
    },
  },
}
