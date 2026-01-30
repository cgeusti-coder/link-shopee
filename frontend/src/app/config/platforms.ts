import {
    ShopeeLogo,
    AmazonLogo,
    MercadoLivreLogo,
    MagaluLogo,
    AliExpressLogo,
    SheinLogo,
    CasasBahiaLogo,
    DefaultStoreLogo
} from "@/app/components/PlatformIcons";

export interface PlatformConfig {
    id: string;
    name: string;
    description: string;
    color: string;
    icon: any;
    logo?: string;
    bgColor: string;
    textColor: string;
}

export const PLATFORMS: PlatformConfig[] = [
    {
        id: 'SHOPEE',
        name: 'Shopee',
        description: 'Automação completa via API.',
        color: '#EE4D2D',
        bgColor: 'bg-[#EE4D2D]/10',
        textColor: 'text-[#EE4D2D]',
        icon: ShopeeLogo,
        logo: '/logos/shopee.png'
    },
    {
        id: 'AMAZON',
        name: 'Amazon',
        description: 'Amazon Associates Integração.',
        color: '#FF9900',
        bgColor: 'bg-[#FF9900]/10',
        textColor: 'text-[#FF9900]',
        icon: AmazonLogo,
        logo: '/logos/amazon.jpg'
    },
    {
        id: 'MERCADO_LIVRE',
        name: 'Mercado Livre',
        description: 'Programa de Afiliados ML.',
        color: '#FFE600',
        bgColor: 'bg-[#FFE600]/20',
        textColor: 'text-yellow-700',
        icon: MercadoLivreLogo,
        logo: '/logos/mercadolivre.png'
    },
    {
        id: 'MAGALU',
        name: 'Parceiro Magalu',
        description: 'Divulgador Magalu.',
        color: '#0086FF',
        bgColor: 'bg-[#0086FF]/10',
        textColor: 'text-[#0086FF]',
        icon: MagaluLogo,
        logo: '/logos/magalu.jpg'
    },
    {
        id: 'ALIEXPRESS',
        name: 'AliExpress',
        description: 'Portal de Afiliados Ali.',
        color: '#FF4747',
        bgColor: 'bg-[#FF4747]/10',
        textColor: 'text-[#FF4747]',
        icon: AliExpressLogo,
        logo: '/logos/aliexpress.png'
    },
    {
        id: 'SHEIN',
        name: 'Shein',
        description: 'Programa de Afiliados Shein.',
        color: '#000000',
        bgColor: 'bg-black/5',
        textColor: 'text-black',
        icon: SheinLogo,
        logo: '/logos/shein.jpg'
    },
    {
        id: 'CASAS_BAHIA',
        name: 'Casas Bahia',
        description: 'Via Varejo Afiliados.',
        color: '#003399',
        bgColor: 'bg-[#003399]/10',
        textColor: 'text-[#003399]',
        icon: CasasBahiaLogo,
        logo: '/logos/casasbahia.png'
    },
    {
        id: 'EXTRA',
        name: 'Extra.com',
        description: 'Clube Extra Afiliados.',
        color: '#E3004F',
        bgColor: 'bg-[#E3004F]/10',
        textColor: 'text-[#E3004F]',
        icon: DefaultStoreLogo,
        logo: '/logos/extra.png'
    },
    {
        id: 'PONTO',
        name: 'Ponto Frio',
        description: 'Afiliados Ponto.',
        color: '#FFCB05',
        bgColor: 'bg-[#FFCB05]/20',
        textColor: 'text-yellow-800',
        icon: DefaultStoreLogo,
        logo: '/logos/pontofrio.png'
    },
    {
        id: 'NATURA',
        name: 'Natura',
        description: 'Consultoria Digital.',
        color: '#F47920',
        bgColor: 'bg-[#F47920]/10',
        textColor: 'text-[#F47920]',
        icon: DefaultStoreLogo,
        logo: '/logos/natura.png'
    }
];

// Helper for dynamic Icon rendering if needed, but passing Component usually works in Next.js Client Components
