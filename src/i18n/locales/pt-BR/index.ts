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
    'theme-toggle': {
      light: 'Claro',
      dark: 'Escuro',
      system: 'Sistema',
      sr: 'Alterar tema',
    },
    pagination: {
      totalLabel: 'Total de {{totalCount}} item(s)',
      pageLabel: 'Página {{page}} de {{totalPages}}',
      buttons: {
        first: 'Primeira página',
        previous: 'Página anterior',
        next: 'Próxima página',
        last: 'Última página',
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
      dashboard: {
        heading: 'Painel',
        components: {
          cards: {
            'day-orders-amount': {
              title: 'Pedidos (dia)',
              label: 'em relação ao dia anterior',
            },
            'month-canceled-orders-amount': {
              title: 'Cancelamentos (mês)',
              label: 'em relação ao mês anterior',
            },
            'month-orders-amount': {
              title: 'Pedidos (mês)',
              label: 'em relação ao mês anterior',
            },
            'month-revenue': {
              title: 'Receita total (mês)',
              label: 'em relação ao mês anterior',
            },
          },
          charts: {
            'pupular-products': {
              title: 'Produtos populares',
            },
            revenue: {
              title: 'Receita no período',
              description: 'Receita diária no período',
              label: 'Período',
              dateFormat: 'dd/MM',
            },
          },
        },
      },
      orders: {
        heading: 'Pedidos',
        components: {
          table: {
            header: {
              rows: {
                '2': 'Identificador',
                '3': 'Realizado há',
                '4': 'Status',
                '5': 'Cliente',
                '6': 'Total do pedido',
              },
            },
            body: {
              rows: {
                '1': 'Detalhes do pedido',
                '7': {
                  pending: 'Aprovar',
                  processing: 'Em entrega',
                  delivering: 'Entregue',
                },
                '8': 'Cancelar',
              },
            },
          },
          filter: {
            label: 'Filtros',
            buttons: {
              confirm: 'Filtrar resultados',
              cancel: 'Remover filtros',
            },
            inputs: {
              id: 'ID do pedido',
              name: 'Nome do cliente',
              status: {
                options: {
                  all: 'Todos status',
                  pending: 'Pendente',
                  canceled: 'Cancelado',
                  processing: 'Em preparo',
                  delivering: 'Em entrega',
                  delivered: 'Entregue',
                },
              },
            },
          },
          details: {
            title: 'Pedido: {{orderId}}',
            description: 'Detalhes do pedido',
            order: {
              table: {
                rows: {
                  '0': 'Status',
                  '1': 'Cliente',
                  '2': 'Telefone',
                  '3': 'E-mail',
                  '4': 'Realizado há',
                },
              },
            },
            product: {
              table: {
                header: {
                  rows: {
                    '0': 'Produto',
                    '1': 'Qtd.',
                    '2': 'Preço',
                    '3': 'Subtotal',
                  },
                },
                footer: {
                  '0': 'Total do pedido',
                },
              },
            },
          },
        },
      },
    },
  },
}
