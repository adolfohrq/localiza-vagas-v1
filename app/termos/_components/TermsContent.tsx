import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface TermSection {
  id: string;
  title: string;
  icon: LucideIcon;
}

interface TermsContentProps {
  sections: TermSection[];
}

export function TermsContent({ sections }: TermsContentProps) {
  return (
    <div className="lg:col-span-9">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        {/* Introdução */}
        <section id="introducao" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Introdução</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Bem-vindo à plataforma TechConnect! Estes Termos de Uso constituem um acordo
              legal entre você e a TechConnect Ltda., regulando o uso dos nossos serviços
              e plataformas.
            </p>
            <p>
              Ao acessar ou utilizar nossos serviços, você concorda com estes termos em sua
              totalidade. Se você não concordar com alguma parte destes termos, solicitamos
              que não utilize nossos serviços.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
              <p className="text-blue-800 font-medium">
                Recomendamos a leitura periódica destes termos, pois eles podem ser
                atualizados a qualquer momento, conforme detalhado na seção
                "Modificações nos Termos".
              </p>
            </div>
          </div>
        </section>

        {/* Definições */}
        <section id="definicoes" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Definições</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Para melhor compreensão destes termos, os seguintes termos terão os
              significados descritos abaixo:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">Usuário:</span> qualquer pessoa física ou
                jurídica que acesse ou utilize os serviços da plataforma.
              </li>
              <li>
                <span className="font-medium">Conteúdo:</span> textos, imagens, vídeos e
                quaisquer outros materiais que possam ser enviados, compartilhados ou
                criados pelos usuários na plataforma.
              </li>
              <li>
                <span className="font-medium">Profissional:</span> pessoa física que utiliza
                a plataforma para oferecer seus serviços ou buscar oportunidades de
                trabalho.
              </li>
              <li>
                <span className="font-medium">Empresa:</span> pessoa jurídica que utiliza a
                plataforma para buscar profissionais ou divulgar vagas.
              </li>
              <li>
                <span className="font-medium">Plataforma:</span> conjunto de serviços,
                aplicativos e websites oferecidos pela TechConnect.
              </li>
            </ul>
          </div>
        </section>

        {/* Cadastro e Conta */}
        <section id="cadastro" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Cadastro e Conta</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Para utilizar completamente nossos serviços, é necessário criar uma conta
              fornecendo informações precisas e completas:
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Requisitos para cadastro</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ter no mínimo 18 anos de idade ou a maioridade legal em seu país.</li>
              <li>Fornecer informações verdadeiras, precisas e atualizadas.</li>
              <li>Aceitar estes Termos de Uso e nossa Política de Privacidade.</li>
              <li>
                Responsabilizar-se pela segurança de suas credenciais de acesso (nome de
                usuário e senha).
              </li>
            </ul>
            
            <div className="mt-6 flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <Badge variant="outline" className="mr-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Importante</Badge>
              <p className="text-yellow-800">
                Você é responsável por todas as atividades realizadas com sua conta.
                Informe-nos imediatamente caso suspeite de acesso não autorizado.
              </p>
            </div>
          </div>
        </section>

        {/* Serviços Oferecidos */}
        <section id="servicos" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Serviços Oferecidos</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Nossa plataforma oferece os seguintes serviços:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Divulgação de vagas de emprego no setor de tecnologia e áreas relacionadas.
              </li>
              <li>
                Ferramentas para que profissionais criem perfis e se candidatem a
                oportunidades.
              </li>
              <li>
                Recursos para que empresas pesquisem e entrem em contato com profissionais.
              </li>
              <li>
                Conteúdo informativo sobre o mercado de tecnologia.
              </li>
              <li>
                Ferramentas de comunicação entre empresas e candidatos.
              </li>
            </ul>
            <p className="mt-4">
              Alguns serviços podem estar disponíveis apenas para assinantes de planos
              premium, conforme detalhado na seção de preços da plataforma.
            </p>
          </div>
        </section>

        {/* Responsabilidades do Usuário */}
        <section id="responsabilidades" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Responsabilidades do Usuário</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Ao utilizar nossa plataforma, você concorda em:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Não violar leis ou regulamentos aplicáveis em sua jurisdição.
              </li>
              <li>
                Não publicar conteúdo falso, enganoso, ofensivo, difamatório ou que viole
                direitos de terceiros.
              </li>
              <li>
                Não tentar acessar áreas restritas da plataforma ou comprometer sua
                segurança.
              </li>
              <li>
                Não utilizar a plataforma para enviar spam, vírus ou qualquer tipo de
                conteúdo malicioso.
              </li>
              <li>
                Não coletar informações de outros usuários sem seu consentimento.
              </li>
            </ul>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-6">
              <p className="text-red-800 font-medium">
                A violação de qualquer uma dessas responsabilidades pode resultar na
                suspensão ou encerramento da sua conta, sem aviso prévio.
              </p>
            </div>
          </div>
        </section>

        {/* Privacidade */}
        <section id="privacidade" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Privacidade</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Respeitamos sua privacidade e estamos comprometidos em proteger seus dados
              pessoais. O uso que fazemos de suas informações é regido por nossa
              <Link href="/privacidade" className="text-primary mx-1 hover:underline">
                Política de Privacidade
              </Link>
              , que é parte integrante destes Termos de Uso.
            </p>
            <p>
              Ao utilizar nossa plataforma, você consente com a coleta, armazenamento e
              processamento de seus dados conforme descrito em nossa Política de
              Privacidade.
            </p>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
              <p className="text-green-800">
                Você pode solicitar a exclusão dos seus dados pessoais a qualquer momento,
                seguindo o procedimento descrito em nossa Política de Privacidade.
              </p>
            </div>
          </div>
        </section>

        {/* Propriedade Intelectual */}
        <section id="propriedade" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Propriedade Intelectual</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Todo o conteúdo disponibilizado pela TechConnect em nossa plataforma,
              incluindo mas não limitado a textos, gráficos, logotipos, ícones, imagens e
              software, é propriedade da TechConnect ou de seus licenciadores e está
              protegido por leis de propriedade intelectual.
            </p>
            <h3 className="text-lg font-semibold mt-6 mb-3">Uso de conteúdo da plataforma</h3>
            <p>
              Você não pode modificar, reproduzir, distribuir ou criar obras derivadas
              baseadas em nosso conteúdo sem nossa autorização expressa por escrito.
            </p>
            <p>
              A utilização de nossa marca ou logotipo para qualquer finalidade sem nossa
              autorização prévia por escrito é estritamente proibida.
            </p>
          </div>
        </section>

        {/* Conteúdo do Usuário */}
        <section id="conteudo-usuario" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Conteúdo do Usuário</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Ao publicar conteúdo em nossa plataforma, você mantém todos os direitos de
              propriedade intelectual sobre esse conteúdo, mas concede à TechConnect uma
              licença mundial, não exclusiva, transferível, isenta de royalties para usar,
              reproduzir, modificar, adaptar, publicar e distribuir tal conteúdo.
            </p>
            <p>
              Você garante que possui todos os direitos necessários sobre o conteúdo que
              publica e que tal conteúdo não viola direitos de terceiros.
            </p>
            <p>
              Reservamo-nos o direito de remover qualquer conteúdo que, a nosso critério,
              viole estes termos ou possa expor a TechConnect ou outros usuários a
              qualquer tipo de prejuízo ou responsabilidade.
            </p>
          </div>
        </section>

        {/* Modificações nos Termos */}
        <section id="modificacoes" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Modificações nos Termos</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento,
              publicando os termos modificados em nossa plataforma. As modificações entrarão
              em vigor imediatamente após sua publicação.
            </p>
            <p>
              Notificaremos você sobre alterações significativas enviando um e-mail para o
              endereço associado à sua conta ou exibindo um aviso em nossa plataforma.
            </p>
            <p>
              O uso continuado de nossos serviços após a publicação de termos modificados
              constitui sua aceitação desses termos.
            </p>
          </div>
        </section>

        {/* Encerramento de Conta */}
        <section id="encerramento" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Encerramento de Conta</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Você pode encerrar sua conta a qualquer momento, acessando as configurações
              da sua conta ou entrando em contato com nosso suporte.
            </p>
            <p>
              Reservamo-nos o direito de suspender ou encerrar sua conta e seu acesso aos
              nossos serviços, a nosso critério, sem aviso prévio, por violação destes
              Termos de Uso ou por qualquer outro motivo que considerarmos apropriado.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
              <p className="text-gray-700">
                Após o encerramento da sua conta, podemos reter certas informações conforme
                exigido por lei ou para fins legítimos de negócios, como descrito em nossa
                Política de Privacidade.
              </p>
            </div>
          </div>
        </section>

        {/* Disposições Gerais */}
        <section id="disposicoes" className="mb-6">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b border-gray-100">Disposições Gerais</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Estes Termos de Uso constituem o acordo completo entre você e a TechConnect
              em relação ao uso de nossos serviços.
            </p>
            <p>
              Se qualquer disposição destes termos for considerada inválida ou inexequível,
              as demais disposições permanecerão em pleno vigor e efeito.
            </p>
            <p>
              Nossa falha em exercer ou fazer cumprir qualquer direito ou disposição destes
              termos não constituirá uma renúncia a tal direito ou disposição.
            </p>
            <p>
              Estes termos serão regidos e interpretados de acordo com as leis do Brasil.
              Qualquer disputa decorrente destes termos será submetida à jurisdição
              exclusiva dos tribunais da cidade de São Paulo, SP.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold mb-3 text-primary">Precisa de ajuda?</h3>
        <p className="text-gray-700 mb-4">
          Se você tiver dúvidas sobre estes Termos de Uso ou sobre o uso de nossos serviços,
          entre em contato conosco:
        </p>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">E-mail:</span> suporte@techconnect.com.br
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Telefone:</span> (11) 4002-8922
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Endereço:</span> Av. Paulista, 1000 - Bela Vista,
            São Paulo - SP, 01310-100
          </p>
        </div>
      </div>
    </div>
  );
} 