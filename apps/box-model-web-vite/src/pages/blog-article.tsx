import { ButtonBox } from '@box-model/web/button';
import { TagBox } from '@box-model/web/tag';
import { MarkdownBox } from '@box-model/web/markdown';

import { Link, useParams } from 'react-router-dom';
import { getPostBySlug, parseBlogDate } from '../app/blog-posts';
import styles from './blog-article.module.scss';

const intlDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export default function BlogArticleRoute() {
  const params = useParams();
  const slug = params.slug ?? '';
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <main id="main-content" tabIndex={-1} className={styles.page}>
        <section
          className={`${styles.missing} box-model-surface box-model-surface--prominent`}
          aria-labelledby="missing-post"
        >
          <h1 id="missing-post">Blog post not found</h1>
          <p>Try heading back to the blog landing page.</p>
          <ButtonBox>
            <Link to="/blogs">Back to blog</Link>
          </ButtonBox>
        </section>
      </main>
    );
  }

  return (
    <main id="main-content" tabIndex={-1} className={styles.page}>
      <article
        className={`${styles.header} box-model-surface box-model-surface--prominent`}
      >
        <p className={styles.date}>
          {intlDate.format(parseBlogDate(post.date))}
        </p>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <TagBox key={tag} variant="neutral">
              <span>{tag}</span>
            </TagBox>
          ))}
        </div>
      </article>
      <section
        className={`${styles.body}`}
      >
        <MarkdownBox>{post.content}</MarkdownBox>
      </section>
      <ButtonBox variant="secondary">
        <Link to="/blogs">← Back to blog</Link>
      </ButtonBox>
    </main>
  );
}
