import { graphql, useStaticQuery } from 'gatsby';

const UseContentfulImage = assetUrl => {
    // すべての画像とfluidデータを取得
    const { allContentfulAsset } = useStaticQuery(graphql`
        query {
            allContentfulAsset {
                nodes {
                    file {
                        url
                    }
                    fluid(maxWidth: 785) {
                        ...GatsbyContentfulFluid_withWebp
                    }
                }
            }
        }
    `);

    // URLが一致した画像のfluidデータを返す
    return allContentfulAsset.nodes.find(n => n.file.url === assetUrl).fluid;
};

export default UseContentfulImage;
