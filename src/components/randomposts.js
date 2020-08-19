import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

const RandomPosts = props => {
    // 配列「array」からランダムに「num」個の要素を取り出す
    const randomSelect = (array, num) => {
        let newArray = [];
        while (newArray.length < num && array.length > 0) {
            // 配列からランダムな要素を選ぶ
            const rand = Math.floor(Math.random() * array.length);
            // 選んだ要素を別の配列に登録する
            newArray.push(array[rand]);
            // もとの配列からは削除する
            array.splice(rand, 1);
        }
        return newArray;
    };

    // 全記事一覧
    const data = useStaticQuery(graphql`
        query {
            allContentfulBlogPost {
                nodes {
                    title
                    slug
                    id
                }
            }
        }
    `);

    // 現ページ以外の記事に絞る
    const baseposts = data.allContentfulBlogPost.nodes.filter(node => node.id !== props.id);
    // ランダム記事
    const randomposts = randomSelect(baseposts, props.a_number);

    return (
        <div className="randomposts">
            <h3>おすすめ記事（Random Pickup）</h3>
            <ul>
                {randomposts.map(node => {
                    return (
                        <li key={node.slug}>
                            <Link to={`/blog/post/${node.slug}/`}>{node.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default RandomPosts;
