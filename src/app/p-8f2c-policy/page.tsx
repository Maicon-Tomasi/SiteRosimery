import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Política de Privacidade</h1>
        <p className="mb-4 text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Introdução</h2>
          <p className="mb-3">
            O aplicativo <strong>TrafegoPagoMae</strong> (&quot;nós&quot;, &quot;nosso&quot;) leva a sua privacidade a sério. 
            Este aplicativo foi desenvolvido para <strong>uso estritamente pessoal e interno</strong>. 
            Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos as 
            suas informações pessoais e dados do Meta ao utilizar nossos serviços.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Quais dados coletamos</h2>
          <p className="mb-3">
            Para que o aplicativo funcione corretamente com os serviços do Meta (Facebook, Instagram, WhatsApp, etc.), 
            podemos solicitar acesso a diversos escopos e permissões através das APIs do Meta. Isso inclui, mas não se limita a:
          </p>
          <ul className="list-disc pl-6 mb-3 space-y-1 text-gray-700">
            <li>Informações de perfil público</li>
            <li>Gerenciamento de páginas (Pages) e postagens</li>
            <li>Informações e métricas do Instagram Basic e Graph API</li>
            <li>Mensagens do WhatsApp Business</li>
            <li>Acesso a leads e campanhas de anúncios</li>
          </ul>
          <p className="mb-3">
            <strong>Nota importante:</strong> Como o aplicativo é de uso pessoal e não está disponível para o público geral, 
            os únicos dados coletados são aqueles pertencentes ao próprio desenvolvedor ou contas explicitamente vinculadas para testes internos.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. Como utilizamos os dados</h2>
          <p className="mb-3">
            Os dados coletados são utilizados exclusivamente para as seguintes finalidades internas:
          </p>
          <ul className="list-disc pl-6 mb-3 space-y-1 text-gray-700">
            <li>Automação de processos internos (postagens, relatórios, gestão de mensagens).</li>
            <li>Análise de métricas de tráfego pago e engajamento.</li>
            <li>Testes de integração com as APIs do Meta Developers.</li>
          </ul>
          <p className="mb-3">
            Nós <strong>não</strong> vendemos, alugamos ou compartilhamos esses dados com terceiros.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">4. Proteção e Armazenamento</h2>
          <p className="mb-3">
            Implementamos medidas de segurança padrão do setor para proteger os dados acessados contra uso não autorizado, 
            perda ou alteração. Tokens de acesso e dados sensíveis são armazenados em ambiente seguro.
          </p>
        </section>

        <hr className="my-8 border-gray-200" />

        <h1 className="text-3xl font-bold mb-6 text-gray-900" id="exclusao-dados">Instruções de Exclusão de Dados</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Como excluir seus dados do TrafegoPagoMae</h2>
          <p className="mb-3">
            Em conformidade com as regras do Meta Platforms, Inc., qualquer usuário pode solicitar a exclusão de seus dados 
            que foram acessados pelo aplicativo <strong>TrafegoPagoMae</strong>.
          </p>
          <p className="mb-3 font-semibold">
            Para remover o acesso do aplicativo e excluir seus dados:
          </p>
          <ol className="list-decimal pl-6 mb-3 space-y-2 text-gray-700">
            <li>Acesse a sua conta do Facebook ou Instagram.</li>
            <li>Vá em <strong>Configurações e Privacidade</strong> &gt; <strong>Configurações</strong>.</li>
            <li>Procure a seção de <strong>Aplicativos e Sites</strong> (Apps and Websites).</li>
            <li>Na lista de aplicativos ativos, localize <strong>TrafegoPagoMae</strong>.</li>
            <li>Clique em <strong>Remover</strong>.</li>
          </ol>
          <p className="mb-3">
            Ao realizar esse procedimento, o aplicativo perderá imediatamente o acesso a todos os seus dados.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Solicitação Manual de Exclusão</h2>
          <p className="mb-3">
            Se você deseja que todos os registros ou dados residuais armazenados em nossos bancos de dados (se houverem) 
            sejam apagados permanentemente, por favor, envie um e-mail com a sua solicitação.
          </p>
          <div className="bg-gray-100 p-4 rounded-md inline-block">
            <p className="font-medium text-gray-800">E-mail para solicitação:</p>
            <a href="mailto:desenvolvedormaicon@gmail.com" className="text-blue-600 hover:underline">
              desenvolvedormaicon@gmail.com
            </a>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Processaremos sua solicitação e excluiremos todos os seus dados em até 7 dias úteis.
          </p>
        </section>

      </div>
    </div>
  );
}
