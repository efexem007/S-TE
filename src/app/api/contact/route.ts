import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, website } = await req.json();

    // Honeypot kontrolü — bot gönderirse "website" alanı dolu gelir
    if (website) {
      // Bot tespit edildi — sahte başarı döndür (botu yanıltmak için)
      return NextResponse.json({ success: true });
    }

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Tüm alanlar zorunlu.' }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Geçersiz e-posta adresi.' }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: 'Alan sınırı aşıldı.' }, { status: 400 });
    }

    // Resend instance'ı sadece runtime'da oluştur
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: 'DueM via Work <contact@duemviawork.com>',
      to: 'info@duemviawork.com',
      subject: `Yeni İletişim Formu: ${name}`,
      html: `
        <h2>Yeni Mesaj</h2>
        <p><strong>İsim:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        <p><strong>Mesaj:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'E-posta gönderilemedi.' }, { status: 500 });
  }
}
