require('dotenv').config();

module.exports = {
    siteMetadata: {
        title: `ESSENTIALS`,
        description: `おいしい食材と食事を探求するサイト`,
        lang: `ja`,
        siteUrl: `https://******.netlify.app`,
        locale: `ja_JP`,
        fbappid: `xxxxxxx`,
    },
    plugins: [
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images/`,
            },
        },
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `ESSENTIALS エッセンシャルズ`,
                short_name: `ESSENTIALS`,
                short_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#477294`,
                display: `standalone`,
                icon: `src/images/icon-maskable.png`,
                icon_options: {
                    purpose: `maskable`,
                },
            },
        },
        `gatsby-plugin-offline`, // gatsby-plugin-manifestの後に記述
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
                accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
                host: process.env.GATSBY_CONTENTFUL_HOST,
            },
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Montserrat Alternates`,
                        variants: [`400`, `700`],
                    },
                    {
                        family: `Noto Sans JP`,
                        variants: [`400`, `700`],
                        subsets: [`japanese`],
                    },
                ],
            },
        },
    ],
};
