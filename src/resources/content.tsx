import { About, Blog, Home, Newsletter, Person, Social, Videos, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Göker",
  lastName: "Mirza",
  name: `Göker Mirza`,
  // TODO: dilersen ünvanını güncelle (ör. "Performans & Strateji Danışmanı")
  role: "Strateji ve Performans Yazarı",
  avatar: "",
  // TODO: gerçek e-posta adresini yaz
  email: "gokermirza@gmail.com",
  location: "Europe/Istanbul", // IANA time zone
  languages: ["Türkçe", "İngilizce"],
  locale: "tr",
};

const newsletter: Newsletter = {
  display: true,
  title: <>{person.firstName}'nın bültenine abone ol</>,
  description: (
    <>Strateji, performans yönetimi ve insan davranışı üzerine ara sıra yazıyorum.</>
  ),
};

const social: Social = [
  // TODO: linkleri kendi hesaplarınla güncelle
  {
    name: "YouTube",
    icon: "youtube",
    link: "https://www.youtube.com/@kurumsalpusula", // TODO: Kurumsal Pusula kanal linkini doğrula
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/gokermirza/", // TODO: doğrula
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Anasayfa",
  title: `${person.name} — Strateji, Performans ve İnsan`,
  description: `Strateji, performans yönetimi ve insan davranışı üzerine yazılar; Kurumsal Pusula videoları ve projeler.`,
  headline: <>Strateji, performans ve insanı bir araya getiriyorum</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Skorfy</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Öne çıkan proje
        </Text>
      </Row>
    ),
    href: "/work/skorfy",
  },
  subline: (
    <>
      Ben {person.firstName}. OKR, performans yönetimi ve davranış bilimleri üzerine yazıyor,{" "}
      <Text as="span" size="xl" weight="strong">Kurumsal Pusula</Text> kanalında video üretiyor
      ve <br /> kendi projem <Text as="span" size="xl" weight="strong">Skorfy</Text>'yi geliştiriyorum.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Hakkımda",
  title: `Hakkımda – ${person.name}`,
  description: `${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: false, // TODO: bir randevu linkin varsa true yap ve link gir
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Merhaba",
    description: (
      <>
        Strateji, performans yönetimi ve insan davranışının kesiştiği noktada üretmeyi seviyorum.
        OKR ve hedef yönetiminden davranış bilimlerine, sanat ve yapay zekâdan kurumsal kültüre
        kadar geniş bir alanda yazıyor; öğrendiklerimi <strong>Kurumsal Pusula</strong> kanalında
        videolara dönüştürüyorum. Boş zamanlarımda da kendi projelerimi hayata geçiriyorum.
        {/* TODO: kendi cümlelerinle güncelle */}
      </>
    ),
  },
  work: {
    display: true,
    title: "Deneyim",
    // TODO: gerçek iş deneyimlerini ekle/güncelle
    experiences: [
      {
        company: "Kurumsal Pusula",
        timeframe: "Günümüz",
        role: "İçerik Üreticisi · YouTube",
        achievements: [
          <>
            Strateji, performans yönetimi ve kurumsal kültür üzerine videolar üretiyorum.
          </>,
        ],
        images: [],
      },
      {
        company: "Skorfy",
        timeframe: "Günümüz",
        role: "Kurucu & Geliştirici",
        achievements: [
          <>
            Fikirden ürüne kendi web uygulamamı tasarlayıp geliştirdim ve yayına aldım.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: false, // TODO: eğitim bilgilerini ekleyince true yap
    title: "Eğitim",
    institutions: [
      {
        name: "Üniversite", // TODO
        description: <>Bölüm / açıklama.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "İlgi Alanları",
    skills: [
      {
        title: "Performans & OKR",
        description: (
          <>Hedef yönetimi, OKR tasarımı ve performans sistemlerinin kurgusu.</>
        ),
        tags: [],
        images: [],
      },
      {
        title: "Davranış Bilimleri",
        description: <>Karar verme, höristikler ve insan davranışının kurumsal yansımaları.</>,
        tags: [],
        images: [],
      },
      {
        title: "Ürün & Geliştirme",
        description: <>Skorfy ile fikirden yayına ürün geliştirme.</>,
        tags: [
          { name: "Next.js", icon: "nextjs" },
          { name: "React", icon: "react" },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Strateji, performans ve insan üzerine yazılar",
  description: `${person.name}'nın yazıları`,
};

const work: Work = {
  path: "/work",
  label: "Projeler",
  title: `Projeler – ${person.name}`,
  description: `${person.name} tarafından geliştirilen projeler`,
};

const videos: Videos = {
  path: "/videos",
  label: "Videolar",
  title: `Videolar – Kurumsal Pusula`,
  description: `${person.name}'nın Kurumsal Pusula kanalındaki videoları`,
  channelUrl: "https://www.youtube.com/@kurumsalpusula", // TODO: doğrula
  // TODO: kendi videolarının ID'lerini ekle (youtube.com/watch?v=XXXX -> "XXXX")
  videos: [
    { id: "dQw4w9WgXcQ", title: "Örnek video 1 (placeholder)" },
    { id: "dQw4w9WgXcQ", title: "Örnek video 2 (placeholder)" },
    { id: "dQw4w9WgXcQ", title: "Örnek video 3 (placeholder)" },
  ],
};

export { person, social, newsletter, home, about, blog, work, videos };
