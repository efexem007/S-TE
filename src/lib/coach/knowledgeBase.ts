// dueMWeWork RAG Knowledge Base — Statik içerik, vektör DB yerine keyword matching ile çalışır
// İleride gerçek vektör DB (Pinecone, Weaviate vb.) ile değiştirilebilir

export interface KnowledgeChunk {
  id: string;
  category: 'program' | 'service' | 'methodology' | 'pricing' | 'faq' | 'general';
  title: string;
  content: string;
  keywords: string[];
}

export const knowledgeBase: KnowledgeChunk[] = [
  // PROGRAMS
  {
    id: 'prog-leadership',
    category: 'program',
    title: 'Liderlik ve Yöneticilik Programı',
    content: `8 haftalık program. Seviye: Orta-İleri. Format: Online/Yüz Yüze.
Müfredat: Hafta 1-2 Liderlik Temelleri ve Kişisel Farkındalık. Hafta 3-4 Ekip Dinamikleri ve Motivasyon Teknikleri. Hafta 5-6 Stratejik Düşünme ve Karar Verme. Hafta 7-8 Değişim Yönetimi ve Proje Liderliği.
Kazanımlar: Liderlik tarzını keşfetme, etkili iletişim ve geri bildirim, analitik karar verme, değişim yönetimi.`,
    keywords: ['liderlik', 'yöneticilik', 'ekip', 'motivasyon', 'strateji', 'karar verme', 'değişim yönetimi'],
  },
  {
    id: 'prog-career',
    category: 'program',
    title: 'Kariyer Gelişimi Programı',
    content: `6 haftalık program. Seviye: Başlangıç-Orta. Format: Online.
Müfredat: Hafta 1 Kariyer Değerlendirmesi ve Hedef Belirleme. Hafta 2-3 Kişisel Marka ve LinkedIn Optimizasyonu. Hafta 4-5 CV, Mülakat ve Müzakere Teknikleri. Hafta 6 Ağ Kurma ve Kariyer Stratejisi.
Kazanımlar: Net kariyer hedefleri ve yol haritası, profesyonel kişisel marka, mülakat teknikleri, maaş müzakere stratejileri.`,
    keywords: ['kariyer', 'iş', 'cv', 'mülakat', 'linkedin', 'kişisel marka', 'müzakere', 'networking'],
  },
  {
    id: 'prog-communication',
    category: 'program',
    title: 'İletişim ve Sunum Becerileri Programı',
    content: `4 haftalık program. Seviye: Tüm Seviyeler. Format: Online/Yüz Yüze.
Müfredat: Hafta 1 Etkili İletişim ve Aktif Dinleme. Hafta 2 Halka Açık Konuşma ve Beden Dili. Hafta 3 Profesyonel Sunum Tasarımı. Hafta 4 Zor Durumlar ve Çatışma Çözümü.
Kazanımlar: Her ortamda etkili iletişim, stres altında güvenli konuşma, görsel ve sözel sunum hazırlama, zor anlarda soğukkanlılık.`,
    keywords: ['iletişim', 'sunum', 'konuşma', 'beden dili', 'çatışma', 'aktif dinleme', 'halka açık konuşma'],
  },
  {
    id: 'prog-digital',
    category: 'program',
    title: 'Dijital Dönüşüm ve AI Programı',
    content: `10 haftalık program. Seviye: Orta-İleri. Format: Online.
Müfredat: Hafta 1-2 Dijital Dönüşüm ve AI Temelleri. Hafta 3-4 Prompt Mühendisliği ve AI Araçları. Hafta 5-7 Veri Analitiği ve Otomasyon. Hafta 8-10 AI Stratejisi ve Etik.
Kazanımlar: AI araçlarını verimli kullanma, veriye dayalı karar verme, iş süreçlerini otomatize etme, dijital strateji geliştirme.`,
    keywords: ['ai', 'yapay zeka', 'dijital dönüşüm', 'prompt', 'veri analitiği', 'otomasyon', 'dijital strateji'],
  },
  {
    id: 'prog-entrepreneurship',
    category: 'program',
    title: 'Girişimcilik ve İnovasyon Programı',
    content: `12 haftalık program. Seviye: Tüm Seviyeler. Format: Hibrit.
Müfredat: Hafta 1-3 Fikir Doğrulama ve Problem Çözümü. Hafta 4-6 İş Modeli ve MVP Geliştirme. Hafta 7-9 Pazara Giriş ve Büyüme Stratejileri. Hafta 10-12 Yatırım ve Ölçeklendirme.
Kazanımlar: Doğrulanmış iş fikri ve MVP, sağlam iş modeli canvası, yatırımcı sunum hazırlama, ölçeklenebilir büyüme planı.`,
    keywords: ['girişimcilik', 'startup', 'inovasyon', 'iş modeli', 'mvp', 'yatırım', 'büyüme', 'fikir doğrulama'],
  },
  {
    id: 'prog-emotional',
    category: 'program',
    title: 'Duygusal Zeka ve Farkındalık Programı',
    content: `4 haftalık program. Seviye: Başlangıç. Format: Online.
Müfredat: Hafta 1 Duygusal Zeka ve Kendini Tanıma. Hafta 2 Stres Yönetimi ve Duygu Düzenleme. Hafta 3 Mindfulness ve Günlük Uygulamalar. Hafta 4 Empati ve Sosyal İlişkiler.
Kazanımlar: Duygusal farkındalık artışı, stres altında denge, günlük mindfulness pratiği, daha güçlü ilişkiler.`,
    keywords: ['duygusal zeka', 'eq', 'mindfulness', 'stres yönetimi', 'empati', 'farkındalık', 'duygu düzenleme'],
  },

  // SERVICES / METHODOLOGY
  {
    id: 'meth-coaching',
    category: 'methodology',
    title: 'dueMWeWork Koçluk Yaklaşımı',
    content: `dueMWeWork, birebir koçluk, grup çalışmaları ve AI destekli kişiselleştirilmiş öğrenme yolları sunar. Koçlarımız alanında uzman profesyonellerdir.
Yaklaşımımız: 1) Keşif ve Hedef Belirleme, 2) Kişiselleştirilmiş Program, 3) Düzenli İlerleme Takibi, 4) Geri Bildirim ve Ayarlama, 5) Sürdürülebilir Alışkanlıklar.
Öğrencilerimize haftalık birebir görüşmeler, sınırsız yazışma desteği, günlük ilerleme takibi ve aylık performans raporları sunuyoruz.`,
    keywords: ['koçluk', 'birebir', 'grup çalışması', 'yaklaşım', 'metodoloji', 'ilerleme takibi', 'performans raporu'],
  },
  {
    id: 'meth-ai',
    category: 'methodology',
    title: 'AI Destekli Kişiselleştirilmiş Öğrenme',
    content: `dueMWeWork AI Koç Motoru, her öğrencinin öğrenme stiline, güçlü ve zayıf yönlerine göre kişiselleştirilmiş destek sunar.
AI Koç özellikleri: Mentor (motivasyon ve stres yönetimi), Tutor (konu anlatımı ve soru çözümü), Assessor (mini quizler ve bilgi boşluğu tespiti), Planner (kişiye özel çalışma programları).
Sistem, öğrencinin etkileşimlerini analiz ederek zorluk seviyesini dinamik olarak ayarlar ve spaced repetition ile zayıf konuları tekrar ettirir.`,
    keywords: ['ai koç', 'yapay zeka', 'kişiselleştirilmiş öğrenme', 'mentor', 'tutor', 'assessor', 'planner', 'spaced repetition'],
  },

  // PRICING (genel bilgi)
  {
    id: 'price-general',
    category: 'pricing',
    title: 'dueMWeWork Fiyatlandırma Bilgisi',
    content: `dueMWeWork çeşitli paketler sunar: Başlangıç (temel erişim), Profesyonel (tam koçluk + AI desteği), Kurumsal (ekipler ve organizasyonlar için).
Tüm paketlerde 2 ücretsiz tanışma görüşmesi ve 7 gün koşulsuz iade garantisi vardır. Sınırsız koç değişimi hakkı tanınır.
Kesin fiyatlar için iletişim formunu doldurun veya chat üzerinden "fiyat bilgisi" talep edin.`,
    keywords: ['fiyat', 'ücret', 'paket', 'başlangıç', 'profesyonel', 'kurumsal', 'iade', 'ücretsiz görüşme'],
  },

  // GENERAL
  {
    id: 'gen-about',
    category: 'general',
    title: 'dueMWeWork Hakkında',
    content: `dueMWeWork, bireylerin ve ekiplerin potansiyellerini en üst düzeye çıkarmaları için tasarlanmış kapsamlı bir eğitim ve koçluk platformudur.
Misyonumuz: Her öğrenciye kişiselleştirilmiş, veriye dayalı ve sürdürülebilir bir öğrenme deneyimi sunmak.
Vizyonumuz: Türkiye'nin en gelişmiş AI destekli eğitim koçluğu platformu olmak.
Hizmetler: Liderlik, Kariyer Gelişimi, İletişim, Dijital Dönüşüm & AI, Girişimcilik, Duygusal Zeka programları.`,
    keywords: ['hakkında', 'misyon', 'vizyon', 'dueMWeWork nedir', 'platform', 'eğitim', 'koçluk'],
  },
];

export function retrieveRelevantChunks(query: string, topK: number = 3): KnowledgeChunk[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter((w) => w.length > 2);

  const scored = knowledgeBase.map((chunk) => {
    let score = 0;
    // Keyword match
    for (const kw of chunk.keywords) {
      if (lowerQuery.includes(kw.toLowerCase())) score += 3;
    }
    // Word overlap
    for (const word of queryWords) {
      if (chunk.content.toLowerCase().includes(word)) score += 1;
      if (chunk.title.toLowerCase().includes(word)) score += 2;
    }
    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.filter((s) => s.score > 0).slice(0, topK).map((s) => s.chunk);
}

export function buildRagContext(query: string): string {
  const chunks = retrieveRelevantChunks(query, 3);
  if (chunks.length === 0) return '';

  const parts = chunks.map((c) => `[${c.title}]\n${c.content}`);
  return `--- dueMWeWork Bilgi Tabanı ---\n${parts.join('\n\n')}\n---\nYukarıdaki bilgilere sadık kal, ancak öğrencinin profiline ve ihtiyaçlarına göre kişiselleştir.`;
}
