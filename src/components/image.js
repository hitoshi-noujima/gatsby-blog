import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

const Image = props => {
    // すべてのローカル画像のファイル名とfluidのデータを取得
    const { allImageSharp } = useStaticQuery(graphql`
        query {
            allImageSharp {
                nodes {
                    fluid(maxWidth: 1600) {
                        originalName
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
    `);

    // propsで渡ってきたfilenameと一致したものをエレメントにして返す
    return (
        <figure>
            <Img
                fluid={allImageSharp.nodes.find(n => n.fluid.originalName === props.filename)?.fluid}
                alt={props.alt}
                style={props.style}
                {...props.other}
            />
        </figure>
    );
};

export default Image;
