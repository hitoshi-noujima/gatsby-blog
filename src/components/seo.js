import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

const SEO = props => {
    // 「data.site.siteMetadata」を「siteMetadata」に分割代入
    const {
        site: { siteMetadata },
    } = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    description
                    lang
                    title
                    siteUrl
                    locale
                    fbappid
                }
            }
        }
    `);

    const title = props.pagetitle ? `${props.pagetitle} | ${siteMetadata.title}` : siteMetadata.title;
    const description = props.pagedesc || siteMetadata.description;
    const url = props.pagepath ? `${siteMetadata.siteUrl}${props.pagepath}` : siteMetadata.siteUrl;

    const imgurl = props.pageimg
        ? `${siteMetadata.siteUrl}${props.pageimg}`
        : props.blogimg || `${siteMetadata.siteUrl}/thumb.jpg`;
    const imgw = props.pageimgw || 1200;
    const imgh = props.pageimgh || 640;

    return (
        <Helmet>
            <html lang={siteMetadata.lang} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            <meta property="og:site_name" content={siteMetadata.title} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content={siteMetadata.locale} />
            <meta property="fb:app_id" content={siteMetadata.fbappid} />
            <meta property="og:image" content={imgurl} />
            <meta property="og:image:width" content={imgw} />
            <meta property="og:image:height" content={imgh} />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
};

export default SEO;
