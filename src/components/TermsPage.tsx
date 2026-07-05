import React from 'react';
import { Gavel, Copyright, CheckSquare, MessageSquare } from 'lucide-react';

export function TermsPage() {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 relative z-20">
      {/* Page Header */}
      <div className="mb-12">
        <span className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">// regras da plataforma & serviços</span>
        <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight mt-2">
          Termos de Uso
        </h2>
        <p className="text-slate-400 font-light mt-4 max-w-2xl text-sm md:text-base">
          Bem-vindo ao website oficial da MAGE. Ao acessar nossa plataforma ou interagir com nossos formulários, você concorda em cumprir e respeitar os seguintes Termos de Uso.
        </p>
      </div>

      <div className="bg-[#111923]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8 space-y-8 max-w-4xl text-slate-300">
        
        {/* Section 1 */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Gavel size={18} className="text-blue-400" />
            1. Aceite dos Termos
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            A navegação pelas páginas da MAGE e o envio voluntário de dados cadastrais implicam na aceitação irrevogável e integral de todas as condições descritas neste documento. Se você discordar de qualquer parte destes termos, solicitamos que interrompa imediatamente o uso do site.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Copyright size={18} className="text-purple-400" />
            2. Propriedade Intelectual
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            Todos os materiais, incluindo mas não se limitando a: marcas registradas, logotipos "MAGE", códigos de programação fonte/objeto, textos explicativos, designs de layout, conceitos visuais, animações e imagens contidas neste website são de propriedade exclusiva da MAGE ou foram licenciados de forma regular. É estritamente proibida a reprodução, cópia, distribuição ou comercialização de tais ativos sem prévia e expressa autorização por escrito.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-cyan-400" />
            3. Propostas, Orçamentos e Briefings
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            O preenchimento de simulações de orçamento na página de Contato ou em nossos formulários não constitui a formalização de um contrato de prestação de serviços ou a garantia de execução dos mesmos pela MAGE. Os valores, escopos e prazos finais dos projetos serão unicamente válidos quando estabelecidos formalmente em um Contrato de Prestação de Serviços assinado digitalmente por ambas as partes.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <CheckSquare size={18} className="text-emerald-400" />
            4. Limitação de Responsabilidade
          </h3>
          <p className="text-sm font-light leading-relaxed text-slate-400">
            A MAGE emprega todos os esforços possíveis para manter este site livre de códigos maliciosos e com funcionamento ininterrupto. No entanto, não garantimos o funcionamento estável do site em conexões oscilantes de internet dos usuários, tampouco nos responsabilizamos por perdas decorrentes de mau uso da máquina do visitante ou de incompatibilidade técnica de navegadores antigos.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-white">5. Jurisdição e Resolução de Conflitos</h3>
          <p className="text-xs font-light leading-relaxed text-slate-400">
            Para dirimir quaisquer eventuais controvérsias oriundas da navegação ou uso da plataforma da MAGE, fica eleito como foro competente o Foro da Comarca de Belo Horizonte, Minas Gerais, com exclusão de qualquer outro por mais privilegiado que seja.
          </p>
          <p className="text-[10px] font-mono text-slate-500 pt-4 border-t border-white/5">
            Última modificação: 05 de Julho de 2026.
          </p>
        </div>

      </div>
    </section>
  );
}
