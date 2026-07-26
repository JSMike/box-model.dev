import { ButtonBox } from '@box-model/web/button';
import { CardBox } from '@box-model/web/card';
import { TagBox } from '@box-model/web/tag';

import { Link } from 'react-router-dom';
import { blogPosts, parseBlogDate } from '../app/blog-posts';
import styles from './blogs.module.scss';

const intlDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export default function BlogsRoute() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => parseBlogDate(b.date).getTime() - parseBlogDate(a.date).getTime()
  );

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <section aria-labelledby="blog-page-title">
        <header
          className={`${styles.header} box-model-surface box-model-surface--prominent`}
        >
          <h1 id="blog-page-title">Developer blog</h1>
          <p>
            Release stories, migration guides, and riffs on why everything is
            still a box. This is my soap-box for all things square.
          </p>
        </header>
        <div className={styles.posts}>
          {sortedPosts.map((post, index) => (
            <CardBox key={post.id} id={post.id} hoverable>
              <div slot="header">
                <h3>{post.title}</h3>
                <div className={styles.meta}>
                  <span>{intlDate.format(parseBlogDate(post.date))}</span>
                  {index === 0 && (
                    <TagBox variant="success">
                      <span>Latest</span>
                    </TagBox>
                  )}
                </div>
              </div>
              <p>{post.excerpt}</p>
              <div slot="actions" className={styles.actions}>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <TagBox key={tag} variant="neutral">
                      <span>{tag}</span>
                    </TagBox>
                  ))}
                </div>
                <ButtonBox>
                  <Link to={`/blog/${post.slug}`}>Keep reading</Link>
                </ButtonBox>
              </div>
            </CardBox>
          ))}
        </div>
      </section>
    </main>
  );
}
