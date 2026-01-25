import React from 'react';
import { useWindowDimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { css, html } from 'react-strict-dom';

import { Button } from '@box-model/rsd/button';
import { Tag } from '@box-model/rsd/tag';
import { Markdown } from '@box-model/rsd/markdown';
import {
  colorTextTokens,
  spaceTokens,
  typographyRolesTokens,
  typographyTokens,
} from '../tokens/tokens.stylex';

import type { RootStackParamList } from '../navigation';
import { getPostBySlug, parseBlogDate } from '../data/blog-posts';
import { AppShell } from '../components/app-shell';
import { MarkdownRenderer } from '../components/markdown-renderer';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BlogArticle'>;
type BlogArticleRouteProp = RouteProp<RootStackParamList, 'BlogArticle'>;

const intlDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const styles = css.create({
  page: {
    width: '100%',
    maxWidth: 820,
    fontFamily: typographyTokens.fontFamilyMono,
    color: colorTextTokens.primary,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.scale250,
  },
  pagePadding: (padding: number) => ({
    paddingTop: padding,
    paddingBottom: padding,
    paddingLeft: padding,
    paddingRight: padding,
  }),
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackSm,
  },
  date: {
    marginTop: 0,
    marginBottom: 0,
    color: colorTextTokens.secondary,
    fontSize: typographyTokens.fontSizeSm,
  },
  title: {
    marginTop: 0,
    marginBottom: 0,
    fontFamily: typographyRolesTokens.headingH1FontFamily,
    fontWeight: typographyRolesTokens.headingH1FontWeight,
    fontSize: {
      default: typographyRolesTokens.headingH1FontSize,
      '@media (min-width: 960px)': typographyTokens.fontSize4xl,
    },
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spaceTokens.scale100,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackLg,
  },
  subtitle: {
    marginTop: 0,
    marginBottom: spaceTokens.stackMd,
    color: colorTextTokens.secondary,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
});

export function BlogArticleScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<BlogArticleRouteProp>();
  const { slug } = route.params;
  const { width } = useWindowDimensions();
  const pagePadding =
    width >= 960 ? 40 : width >= 720 ? 32 : 24;

  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <AppShell>
        <html.main style={styles.page}>
          <html.section aria-labelledby="missing-post">
            <html.h1 id="missing-post" style={styles.title}>
              Blog post not found
            </html.h1>
          <html.p style={styles.subtitle}>
            Try heading back to the blog landing page.
          </html.p>
          <html.div style={styles.backButton}>
            <Button onClick={() => navigation.navigate('Blogs')}>
              Back to blog
            </Button>
          </html.div>
        </html.section>
      </html.main>
    </AppShell>
  );
  }

  return (
    <AppShell activeRoute="Blogs">
      <html.main style={[styles.page, styles.pagePadding(pagePadding)]}>
        <html.article style={styles.header}>
          <html.p style={styles.date}>
            {intlDate.format(parseBlogDate(post.date))}
          </html.p>
          <html.h1 style={styles.title}>{post.title}</html.h1>
          <html.div style={styles.tags}>
            {post.tags.map((tag) => (
              <Tag key={tag} variant="neutral">
                {tag}
              </Tag>
            ))}
          </html.div>
        </html.article>
        <html.section style={styles.body}>
          <Markdown>
            <MarkdownRenderer content={post.content} />
          </Markdown>
        </html.section>
        <html.div style={styles.backButton}>
          <Button
            variant="secondary"
            onClick={() => navigation.navigate('Blogs')}
          >
            ← Back to blog
          </Button>
        </html.div>
      </html.main>
    </AppShell>
  );
}

export default BlogArticleScreen;
