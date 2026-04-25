export default function sitemap() {
  return [
    {
      url: 'https://duemviawork.com',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ];
}
