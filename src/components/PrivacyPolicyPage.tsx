import React from 'react';
import { Shield, Eye, Lock, FileText } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">// transparência & conformidade</span>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Política de Privacidade
        </h2>
        <p className="text-slate-400 font-light mt-4 max-w-2xl text-sm md:text-base">
          Esta Política de Privacidade descreve como a MAGE coleta, usa, armazena e protege as informações e dados pessoais dos usuários obtidos através deste website.
        </p>
      </div>

      <div className="bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 space-y-8 max-w-4xl text-slate-300">
        
        {/* Section 1 */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Shield size={18} className="text-blue-400" />
            1. Compromisso com a Privacidade
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            A MAGE tem o compromisso de proteger a privacidade de seus visitantes e clientes. Todas as informações coletadas são tratadas em conformidade com as diretrizes da Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Eye size={18} className="text-purple-400" />
            2. Coleta de Dados e Finalidade
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            Coletamos dados pessoais estritamente necessários em duas situações específicas:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-400">
            <li>
              <strong className="text-white">Formulário de Briefing/Contato:</strong> Quando você entra em contato, coletamos seu Nome, E-mail, tipo de projeto, orçamento estimado e descrição da sua ideia. Esses dados são utilizados exclusivamente para analisar sua demanda e retornar o contato comercial.
            </li>
            <li>
              <strong className="text-white">Cookies e Dados de Navegação:</strong> Coletamos informações de navegação genéricas (páginas mais acessadas, localização geográfica aproximada, tempo de sessão) de forma anônima para melhorar o desempenho do site e a experiência do usuário.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Lock size={18} className="text-cyan-400" />
            3. Segurança da Informação
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            Adotamos medidas técnicas, administrativas e organizacionais de segurança do mais alto nível para proteger as suas informações contra acessos não autorizados, perdas, destruições ou alterações indesejadas. Isso inclui o tráfego de dados criptografado via protocolo HTTPS/SSL e restrição rígida de privilégios aos dados armazenados.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <FileText size={18} className="text-emerald-400" />
            4. Seus Direitos (LGPD)
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            Como titular dos dados, você tem o direito garantido por lei de, a qualquer momento, solicitar:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-400">
            <li>Confirmação da existência de tratamento dos seus dados.</li>
            <li>Acesso total aos dados coletados sob sua identidade.</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
            <li>Eliminação dos dados pessoais tratados com o seu consentimento prévio.</li>
          </ul>
          <p className="text-xs text-slate-500 font-light mt-3">
            Para exercer qualquer um destes direitos, basta nos enviar um e-mail para <span className="text-blue-400">contato@magecomunicacao.com.br</span> com o assunto "LGPD - Direitos do Titular".
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">5. Atualizações desta Política</h3>
          <p className="text-xs font-light leading-relaxed text-slate-400">
            Esta política poderá ser revisada periodicamente para refletir melhorias em nossos processos internos ou ajustes em regulamentações jurídicas. A data da última atualização é sempre mantida visível ao final do documento.
          </p>
          <p className="text-[10px] font-mono text-slate-500 pt-4 border-t border-white/5">
            Última modificação: 05 de Julho de 2026.
          </p>
        </div>

      </div>
    </section>
  );
}
