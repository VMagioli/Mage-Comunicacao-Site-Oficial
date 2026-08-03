import { NextResponse } from 'next/server';

const PROJECT_TYPE_LABELS: Record<string, string> = {
  web: 'Sites e Tecnologia',
  branding: 'Comunicação e Conteúdo',
  commercial: 'Comercial',
  management: 'Gestão',
  other: 'Outro',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, budget, message } = body;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.' },
        { status: 400 }
      );
    }

    const projectTypeLabel = PROJECT_TYPE_LABELS[projectType] || projectType || 'Outro';

    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;

    console.log('📨 Lead Recebido:', {
      nome: name,
      email,
      whatsapp: phone,
      tipoDeProjeto: projectTypeLabel,
      estimativaDeInvestimento: budget,
      mensagem: message,
    });

    if (!webhookUrl) {
      console.warn(
        '⚠️ CONTACT_FORM_WEBHOOK_URL não está configurada no arquivo .env.local.'
      );
      // Retorna sucesso para o frontend para fins de teste local
      return NextResponse.json({
        success: true,
        message: 'Lead recebido com sucesso (modo de simulação local, webhook ausente).',
      });
    }

    // Encaminha os dados para o Google Apps Script Web App
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: name,
        email: email,
        whatsapp: phone,
        tipoDeProjeto: projectTypeLabel,
        estimativaDeInvestimento: budget,
        mensagem: message,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Erro de resposta do Google Web App:', errorText);
      throw new Error(`Erro na resposta do Google: ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log('✅ Lead enviado com sucesso para a planilha!', responseData);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('🚨 Erro ao salvar contato na planilha:', error);
    return NextResponse.json(
      { error: error?.message || 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
