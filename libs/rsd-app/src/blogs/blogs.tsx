import React from 'react';
import { useWindowDimensions } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { css, html } from 'react-strict-dom';

import { Button } from '@box-model/rsd/button';
import { Card, CardBody, CardFooter, CardHeader } from '@box-model/rsd/card';
import { Tag } from '@box-model/rsd/tag';
import { colorTextTokens, spaceTokens, typographyTokens } from '../tokens/tokens.stylex';

import { blogPosts, parseBlogDate } from '../data/blog-posts';
import { AppShell } from '../components/app-shell';
import type { RootStackParamList } from '../navigation';

const intlDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const styles = css.create({
  page: {
    width: '100%',
    maxWidth: 1100,
    fontFamily: typographyTokens.fontFamilyMono,
    color: colorTextTokens.primary,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackXl,
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
  title: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyTokens.fontSize4xl,
    fontWeight: typographyTokens.fontWeightBold,
  },
  subtitle: {
    marginTop: 0,
    marginBottom: 0,
    color: colorTextTokens.secondary,
    lineHeight: typographyTokens.lineHeightNormal,
  },
  posts: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.scale200,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: spaceTokens.stackSm,
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: typographyTokens.fontSizeXl,
    fontWeight: typographyTokens.fontWeightBold,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: spaceTokens.scale100,
    color: colorTextTokens.secondary,
  },
  date: {
    fontSize: typographyTokens.fontSizeSm,
  },
  excerpt: {
    marginTop: 0,
    marginBottom: 0,
    color: colorTextTokens.secondary,
    lineHeight: typographyTokens.lineHeightNormal,
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: spaceTokens.scale100,
  },
});

export function BlogsScreen() {
  const navigation = useNavigation<
    NativeStackNavigationProp<RootStackParamList, 'Blogs'>
  >();
  const { width } = useWindowDimensions();
  const pagePadding =
    width >= 960 ? 40 : width >= 720 ? 32 : 24;
  const sortedPosts = [...blogPosts].sort(
    (a, b) => parseBlogDate(b.date).getTime() - parseBlogDate(a.date).getTime()
  );

  return (
    <AppShell activeRoute="Blogs">
      <html.main style={[styles.page, styles.pagePadding(pagePadding)]}>
        <html.section aria-labelledby="blog-page-title">
          <html.header style={styles.header}>
            <html.h1 id="blog-page-title" style={styles.title}>
              Developer blog
            </html.h1>
            <html.p style={styles.subtitle}>
              Release stories, migration guides, and riffs on why everything is still a box. This is
              my soap-box for all things square.
            </html.p>
          </html.header>

          <html.div style={styles.posts}>
            {sortedPosts.map((post, index) => (
              <Card key={post.id} interactive>
                <CardHeader>
                  <html.div style={styles.cardHeader}>
                    <html.h3 style={styles.cardTitle}>{post.title}</html.h3>
                    <html.div style={styles.meta}>
                      <html.span style={styles.date}>
                        {intlDate.format(parseBlogDate(post.date))}
                      </html.span>
                      {index === 0 && <Tag variant="success">Latest</Tag>}
                    </html.div>
                  </html.div>
                </CardHeader>
                <CardBody>
                  <html.p style={styles.excerpt}>{post.excerpt}</html.p>
                </CardBody>
                <CardFooter>
                  <html.div style={styles.tags}>
                    {post.tags.map((tag) => (
                      <Tag key={tag} variant="neutral">
                        {tag}
                      </Tag>
                    ))}
                  </html.div>
                  <Button
                    onClick={() =>
                      navigation.navigate('BlogArticle', { slug: post.slug })
                    }
                  >
                    Keep reading
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </html.div>
        </html.section>
      </html.main>
    </AppShell>
  );
}

export default BlogsScreen;
